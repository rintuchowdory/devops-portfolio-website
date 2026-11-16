/** Thin fetch wrapper around the FastAPI service, used at build time. */
import { API_BASE } from "./site";

async function get(path: string, params?: Record<string, string>) {
  const url = new URL(`${API_BASE}${path}`);
  if (params) Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`API ${path} -> ${response.status}`);
  return response.json();
}

export const api = {
  health: () => get("/health"),
  summary: () => get("/api/v1/metrics/summary"),
  services: () => get("/api/v1/services"),
  pipelines: () => get("/api/v1/pipelines"),
  kubernetes: () => get("/api/v1/kubernetes"),
  logs: (params?: Record<string, string>) => get("/api/v1/logs", params ?? { limit: "12" }),
};
