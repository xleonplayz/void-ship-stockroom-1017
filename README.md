# Harbor Stockroom

Two Node HTTP applications: browser admin and a separate inventory API. The admin
uses a deliberately public demo login cookie (not authentication for real data).
The API has synthetic in-memory stock, GET /items, validated POST /items and health.
Only the admin is to be exposed on Dev-Void. The browser never calls the API directly;
all stock operations go through admin server fetch with API_URL.

Local: start services/api/server.js, then apps/admin/server.js with
API_URL=http://127.0.0.1:8221. Open http://127.0.0.1:3220.

Deploy using staged lly source add/select/configure so assigned slugs can be put
into API_URL before the first build. The TOML deliberately uses proto="http"
instead of the CLI network add-port path (which coerces it to TCP). Capture the
actual configured policy, then expose only admin after successful rollout.
Restart acceptance is deferred until the known Carrier restart defect is fixed.
