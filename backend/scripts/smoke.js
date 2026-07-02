const http = require('node:http');
const path = require('node:path');
const { spawn } = require('node:child_process');

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

async function main() {
  const server = spawn(process.execPath, ['--no-warnings', 'backend/server.js'], {
    cwd: rootDir,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let stderr = '';
  server.stderr.on('data', (chunk) => { stderr += chunk; });

  try {
    await waitForServer();

    const loginBody = 'login=igor&password=ocenka123';
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

    const dataJs = await request({ path: '/ui_kits/ocenka-app-v2/data.js', headers: { cookie } });
    assert(dataJs.res.statusCode === 200, 'Data script is not available');
    const data = JSON.parse(dataJs.data.replace(/^window\.OcenkaData = /, '').replace(/;\s*$/, ''));
    assert(Array.isArray(data.requests) && data.requests.length > 0, 'Requests data is empty');
    assert(data.calculation?.cost?.ncsTables?.length >= 6, 'NCS tables are not loaded');

    const requestsScreen = await request({ path: '/ui_kits/ocenka-app-v2/RequestsScreenV2.jsx', headers: { cookie } });
    assert(requestsScreen.res.statusCode === 200, 'Requests screen is not available');
    assert(!/beenb|iframe|crmSrc/i.test(requestsScreen.data), 'Removed CRM embed is still referenced');

    console.log('Smoke checks passed');
  } finally {
    server.kill();
  }

  if (stderr.trim()) {
    process.stderr.write(stderr);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
