const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');

const rootDir = path.resolve(__dirname, '..', '..');
const port = Number(process.env.SMOKE_PORT || 4183);
const baseOptions = { host: '127.0.0.1', port };

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request({ ...baseOptions, ...options }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ res, data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function waitForServer(deadlineMs = 8000) {
  const started = Date.now();
  while (Date.now() - started < deadlineMs) {
    try {
      const response = await request({ path: '/login', method: 'GET' });
      if (response.res.statusCode === 200) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Server did not start on port ${port}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateOnboardingFiles() {
  const appDir = path.join(rootDir, 'ui_kits', 'ocenka-app-v2');
  const onboardingPath = path.join(appDir, 'OnboardingV2.jsx');
  const onboarding = fs.readFileSync(onboardingPath, 'utf8');
  const screenFiles = fs.readdirSync(appDir)
    .filter((name) => /\.(jsx|html)$/.test(name))
    .map((name) => fs.readFileSync(path.join(appDir, name), 'utf8'))
    .join('\n');
  const tourBlock = onboarding.slice(
    onboarding.indexOf('const TOUR_STEPS = ['),
    onboarding.indexOf('window.OcenkaTourSteps')
  );
  const pageHelpBlock = onboarding.slice(
    onboarding.indexOf('const PAGE_HELP = {'),
    onboarding.indexOf('const TOUR_STEPS = [')
  );
  const markerIds = new Set();
  for (const match of screenFiles.matchAll(/data-tour-id="([^"]+)"/g)) {
    markerIds.add(match[1]);
  }

  const routes = new Set(['dashboard', 'requests', 'objects', 'analogs', 'calc', 'reports', 'fso', 'analytics', 'clients', 'settings']);
  const steps = [];
  const stepPattern = /\{\s*id:\s*'([^']+)'[\s\S]*?route:\s*'([^']+)'[\s\S]*?target:\s*'([^']+)'/g;
  for (const match of tourBlock.matchAll(stepPattern)) {
    steps.push({ id: match[1], route: match[2], target: match[3] });
  }
  assert(steps.length >= 15, 'Onboarding tour must cover main app sections');
  assert(new Set(steps.map((step) => step.id)).size === steps.length, 'Onboarding step ids must be unique');
  for (const step of steps) {
    assert(routes.has(step.route), `Onboarding step ${step.id} uses unknown route ${step.route}`);
    assert(markerIds.has(step.target), `Onboarding step ${step.id} targets missing data-tour-id ${step.target}`);
  }

  const helpKeys = Array.from(pageHelpBlock.matchAll(/^\s{4}([a-z]+):\s*\{/gm)).map((match) => match[1]);
  assert(helpKeys.length === routes.size, 'Page help must describe every main route');
  for (const route of routes) {
    assert(helpKeys.includes(route), `Page help is missing route ${route}`);
  }
}

async function main() {
  validateOnboardingFiles();

  // Ensure the production frontend build exists so the checks below can validate it.
  const build = spawnSync(process.execPath, ['backend/scripts/build.js'], { cwd: rootDir, encoding: 'utf8' });
  assert(build.status === 0, `Frontend build failed: ${build.stderr || build.stdout}`);

  const server = spawn(process.execPath, ['--no-warnings', 'backend/server.js'], {
    cwd: rootDir,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let stderr = '';
  server.stderr.on('data', (chunk) => { stderr += chunk; });

  try {
    await waitForServer();

    const protectedApp = await request({ path: '/ui_kits/ocenka-app-v2/index.html', method: 'GET' });
    assert(protectedApp.res.statusCode === 302 && protectedApp.res.headers.location === '/login', 'Protected app must redirect anonymous users to login');

    const health = await request({ path: '/healthz', method: 'GET' });
    assert(health.res.statusCode === 200, 'Health endpoint must be available');
    const healthBody = JSON.parse(health.data);
    assert(healthBody.status === 'ok', 'Health endpoint must report database ok');

    const hiddenPackage = await request({ path: '/package.json', method: 'GET' });
    assert(hiddenPackage.res.statusCode === 404, 'Sensitive package.json must not be served');

    const malformedPath = await request({ path: '/%E0%A4%A', method: 'GET' });
    assert(malformedPath.res.statusCode === 400, 'Malformed URL path must return 400');

    const badLoginBody = 'login=ocenka&password=wrong-password';
    const badLogin = await request({
      path: '/login',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': Buffer.byteLength(badLoginBody)
      }
    }, badLoginBody);
    assert(badLogin.res.statusCode === 401, 'Bad login must be rejected');
    assert(!badLogin.res.headers['set-cookie'], 'Bad login must not create a session cookie');

    const loginBody = 'login=ocenka&password=ocenka123';
    const login = await request({
      path: '/login',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': Buffer.byteLength(loginBody)
      }
    }, loginBody);
    const cookie = login.res.headers['set-cookie']?.[0]?.split(';')[0];
    assert(login.res.statusCode === 302 && cookie, 'Login smoke check failed');

    const app = await request({ path: '/ui_kits/ocenka-app-v2/index.html', headers: { cookie } });
    assert(app.res.statusCode === 200, 'App HTML is not available');
    assert(app.data.includes('RequestsScreenV2.jsx'), 'App HTML does not load requests screen');
    assert(app.data.includes('OnboardingV2.jsx'), 'App HTML does not load onboarding screen');
    assert(app.data.includes('main.jsx'), 'App HTML does not load the bootstrap module');

    const mainModule = await request({ path: '/ui_kits/ocenka-app-v2/main.jsx', headers: { cookie } });
    assert(mainModule.res.statusCode === 200, 'Bootstrap module is not available');
    assert(mainModule.data.includes('<ContextHelpV2 active={active} />'), 'Bootstrap does not render contextual page help');
    assert(mainModule.data.includes('ReactDOM.createRoot'), 'Bootstrap does not mount the React app');

    const built = await request({ path: '/ui_kits/ocenka-app-v2/build/main.js', headers: { cookie } });
    assert(built.res.statusCode === 200, 'Production build is missing — run "npm run build"');
    assert(!built.data.includes('type="text/babel"'), 'Production build must not rely on in-browser Babel');

    const dataJs = await request({ path: '/ui_kits/ocenka-app-v2/data.js', headers: { cookie } });
    assert(dataJs.res.statusCode === 200, 'Data script is not available');
    assert(!dataJs.data.includes('</script'), 'Data script must be safe to embed');
    const data = JSON.parse(dataJs.data.replace(/^window\.OcenkaData = /, '').replace(/;\s*$/, ''));
    assert(Array.isArray(data.requests), 'Requests data must be an array');
    assert(Array.isArray(data.team) && data.team.length > 0, 'Team list must be present for owner picker');
    assert(Array.isArray(data.marketListings), 'marketListings must be present in app data');
    assert(data.calculation?.cost?.ncsTables?.length >= 6, 'NCS tables are not loaded');
    assert(data.user?.name === 'Игорь Дорощенко', 'Unexpected evaluator name in app data');
    assert(/^03-\d{4}$/.test(String(data.object?.id || '')), 'Default object id must use 03-* format');
    assert(data.requests.every((request) => /^03-\d{4}$/.test(request.id)), 'Requests must use 03-#### ids');
    assert(data.requests.every((request) => request.type !== 'Кадастровая'), 'Cadastral appraisal type leaked into requests');
    assert(!JSON.stringify(data).includes('ОЗ-'), 'Legacy ОЗ-* id leaked into app data');
    assert(!JSON.stringify(data).includes('Петров Андрей Сергеевич'), 'Old report person leaked into app data');

    const requestsScreen = await request({ path: '/ui_kits/ocenka-app-v2/RequestsScreenV2.jsx', headers: { cookie } });
    assert(requestsScreen.res.statusCode === 200, 'Requests screen is not available');
    assert(!/beenb|iframe|crmSrc/i.test(requestsScreen.data), 'Removed CRM embed is still referenced');
    assert(requestsScreen.data.includes('data-tour-id="requests-create"'), 'Requests screen has no onboarding marker for create action');
    assert(requestsScreen.data.includes('data-tour-id="requests-board"'), 'Requests screen has no onboarding marker for kanban board');

    const analogsScreen = await request({ path: '/ui_kits/ocenka-app-v2/AnalogsScreenV2.jsx', headers: { cookie } });
    assert(analogsScreen.res.statusCode === 200, 'Analogs screen is not available');
    assert(analogsScreen.data.includes('<TH>Учитывать</TH>'), 'Analogs screen has no explicit include/exclude column');
    assert(analogsScreen.data.includes("active ? 'true' : 'false'"), 'Analogs include/exclude column must show true/false values');
    assert(analogsScreen.data.includes('data-tour-id="analogs-market"'), 'Analogs screen has no market picker marker');
    assert(analogsScreen.data.includes('importFromMarket'), 'Analogs screen must import listings into the selection');

    const onboarding = await request({ path: '/ui_kits/ocenka-app-v2/OnboardingV2.jsx', headers: { cookie } });
    assert(onboarding.res.statusCode === 200, 'Onboarding module is not available');
    assert(onboarding.data.includes('ocenka.onboarding.v1'), 'Onboarding progress storage key is missing');
    assert(onboarding.data.includes('ocenka:start-onboarding'), 'Onboarding relaunch event is missing');
    assert(onboarding.data.includes('TOUR_STEPS'), 'Onboarding step configuration is missing');

    const topbar = await request({ path: '/ui_kits/ocenka-app-v2/TopbarV2.jsx', headers: { cookie } });
    assert(topbar.res.statusCode === 200, 'Topbar is not available');
    assert(topbar.data.includes('ocenka:start-onboarding'), 'Topbar does not expose onboarding relaunch');

    const logout = await request({ path: '/logout', method: 'POST', headers: { cookie } });
    assert(logout.res.statusCode === 302 && logout.res.headers.location === '/login', 'Logout must redirect to login');
    assert(logout.res.headers['set-cookie']?.[0]?.includes('Max-Age=0'), 'Logout must clear session cookie');

    console.log('Smoke checks passed');
  } finally {
    server.kill();
  }

  if (stderr.trim()) {
    process.stderr.write(stderr);
  }
}

main().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
