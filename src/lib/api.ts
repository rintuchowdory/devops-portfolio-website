const BASE = "http://127.0.0.1:8000";
async function get(path, params) {
  const url = new URL(`${BASE}${path}`);
  if (params) Object.entries(params).forEach(([k,v]) => url.searchParams.set(k,v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json();
}
export const api = {
  summary:    () => get("/api/v1/metrics/summary"),
  services:   () => get("/api/v1/services"),
  pipelines:  () => get("/api/v1/pipelines"),
  kubernetes: () => get("/api/v1/kubernetes"),
  logs:       () => get("/api/v1/logs", { limit: "12" }),
};
