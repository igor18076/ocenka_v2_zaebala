#!/bin/sh
# Generates Caddyfile from env and starts Caddy.
# - Always serves on http:// (IP or any host, port 80)
# - If OCENKA_DOMAIN is set, also serves that host with automatic HTTPS
set -e

DOMAIN="${OCENKA_DOMAIN:-}"
EMAIL="${OCENKA_ACME_EMAIL:-}"

{
  if [ -n "$EMAIL" ]; then
    echo "{"
    echo "	email ${EMAIL}"
    echo "}"
    echo
  fi

  echo "http:// {"
  echo "	encode gzip"
  echo "	reverse_proxy ocenka:4173"
  echo "}"

  if [ -n "$DOMAIN" ]; then
    echo
    echo "${DOMAIN} {"
    echo "	encode gzip"
    echo "	reverse_proxy ocenka:4173"
    echo "}"
  fi
} > /etc/caddy/Caddyfile

exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
