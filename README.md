# Harbor Stockroom

Two Node HTTP applications: browser admin and a separate inventory API. The admin
uses a deliberately public demo login cookie (not authentication for real data).
The API has synthetic in-memory stock, GET /items, validated POST /items and health.
Only the admin is to be exposed on Dev-Void. The browser never calls the API directly;
all stock operations go through admin server fetch with API_URL.

Local: start services/api/server.js, then apps/admin/server.js with
API_URL=http://127.0.0.1:8221. Open http://127.0.0.1:3220.

Deploy with lly init --config lily.toml. The TOML deliberately uses proto="http"
instead of the CLI network add-port path (which coerces it to TCP). Wait for the
first rollout, then assign API_URL to the API slug, redeploy with the completed
configuration and expose only admin. The init command allocates app slugs during
configuration and has no supported create-only option; do not change policy during
the first rollout. Before API_URL is set, upstream requests return an explicit 502.
Restart acceptance is deferred until the known Carrier restart defect is fixed.
