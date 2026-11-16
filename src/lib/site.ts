/**
 * Single source of truth for site metadata, links and the API location.
 * Everything that has to survive the GitHub Pages base path goes through `href`.
 */

export const API_BASE = (
  import.meta.env.PUBLIC_API_BASE ?? "https://devops-portfolio-microservice.vercel.app"
).replace(/\/+$/, "");

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

/** Prefix an internal path with the configured base path. */
export function href(path = "/"): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `${BASE}/${clean}` : `${BASE}/`;
}

export const site = {
  name: "Rintu Chowdory",
  role: "DevOps and Cloud",
  tagline: "I build the delivery path, not just the app: tests, containers, pipelines and live telemetry.",
  description:
    "DevOps portfolio of Rintu Chowdory: a FastAPI service with Prometheus metrics, a container image on GHCR, GitHub Actions CI, and the live dashboard built on top of it.",
  github: "https://github.com/rintuchowdory",
  githubLabel: "github.com/rintuchowdory",
  repoMicroservice: "https://github.com/rintuchowdory/devops-portfolio-microservice",
  repoWebsite: "https://github.com/rintuchowdory/devops-portfolio-website",
};

export const nav = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/dashboard", label: "Live Dashboard" },
  { path: "/architecture", label: "Architecture" },
  { path: "/case-study", label: "Case study" },
  { path: "/api-docs", label: "API" },
  { path: "/roadmap", label: "Roadmap" },
  { path: "/blog", label: "Notes" },
  { path: "/contact", label: "Contact" },
];

export const skills = [
  { name: "Linux and shell", value: 75, note: "Termux, systemd, bash, ssh, logs" },
  { name: "Docker", value: 70, note: "multi-stage builds, non-root, healthchecks" },
  { name: "CI/CD", value: 68, note: "GitHub Actions, GHCR, release tags" },
  { name: "Python and FastAPI", value: 66, note: "typed APIs, pytest, pydantic" },
  { name: "Kubernetes", value: 45, note: "pods, deployments, services, probes" },
  { name: "Terraform and Helm", value: 25, note: "next on the roadmap" },
];

export const stats = [
  { label: "Tests in CI", value: "45" },
  { label: "Python versions", value: "3" },
  { label: "Image registry", value: "GHCR" },
  { label: "Metrics", value: "Prom" },
];

export const projects = [
  {
    name: "devops-portfolio-microservice",
    role: "FastAPI service, container image, CI pipeline",
    description:
      "The API behind the live dashboard: services, pipelines, Kubernetes, metrics and logs. Prometheus endpoint, probes, JSON errors and a pytest suite that runs on three Python versions.",
    stack: ["FastAPI", "pytest", "Docker", "GitHub Actions", "GHCR", "Prometheus"],
    repo: "https://github.com/rintuchowdory/devops-portfolio-microservice",
    live: "https://devops-portfolio-microservice.vercel.app",
    liveLabel: "Live API",
    extra: { label: "Swagger UI", href: "https://devops-portfolio-microservice.vercel.app/docs" },
    badge: {
      src: "https://github.com/rintuchowdory/devops-portfolio-microservice/actions/workflows/ci.yml/badge.svg",
      href: "https://github.com/rintuchowdory/devops-portfolio-microservice/actions/workflows/ci.yml",
      label: "CI status",
    },
  },
  {
    name: "devops-portfolio-website",
    role: "Astro site, this page",
    description:
      "Static site that reads the API at build time and keeps polling in the browser, deployed to GitHub Pages by a workflow that fails if the build output is wrong.",
    stack: ["Astro", "TypeScript", "Tailwind CSS", "daisyUI", "GitHub Pages"],
    repo: "https://github.com/rintuchowdory/devops-portfolio-website",
    live: "https://rintuchowdory.github.io/devops-portfolio-website/",
    liveLabel: "Live site",
    extra: { label: "Live dashboard", href: "/dashboard" },
    badge: {
      src: "https://github.com/rintuchowdory/devops-portfolio-website/actions/workflows/deploy.yml/badge.svg",
      href: "https://github.com/rintuchowdory/devops-portfolio-website/actions/workflows/deploy.yml",
      label: "Deploy status",
    },
  },
];

export const endpoints = [
  {
    method: "GET",
    path: "/health",
    summary: "Liveness probe",
    detail: "Version, environment and uptime. What Render and Kubernetes poll.",
    sample: '{"status":"ok","service":"devops-mesh-api","version":"1.1.0"}',
  },
  {
    method: "GET",
    path: "/health/ready",
    summary: "Readiness probe",
    detail: "Checks that the data layer actually answers before traffic is routed.",
  },
  {
    method: "GET",
    path: "/metrics",
    summary: "Prometheus metrics",
    detail: "Request counters, latency histogram, in-flight gauge, build info.",
  },
  {
    method: "GET",
    path: "/api/v1/services",
    summary: "Service catalogue",
    detail: "Filter with status, namespace and tag. Returns up, degraded and down counts.",
  },
  {
    method: "GET",
    path: "/api/v1/pipelines",
    summary: "Real CI runs",
    detail:
      "Reads the actual GitHub Actions runs of both portfolio repos. The response says source: github, or simulated when no token is configured.",
  },
  {
    method: "GET",
    path: "/api/v1/pipelines/{id}",
    summary: "One run with its stages",
    detail: "Each pipeline carries the job list as stages, plus a link to the run on github.com.",
  },
  {
    method: "POST",
    path: "/api/v1/pipelines/{id}/trigger",
    summary: "Queue a run",
    detail: "Answers 202 in demo mode. Real GitHub runs return 409 with the command that actually starts one.",
  },
  {
    method: "GET",
    path: "/api/v1/kubernetes",
    summary: "Cluster overview",
    detail: "Namespaces, pod health, CPU and memory pressure.",
  },
  {
    method: "GET",
    path: "/api/v1/metrics/summary",
    summary: "Dashboard summary",
    detail: "Headline numbers used by the live dashboard.",
  },
  {
    method: "GET",
    path: "/api/v1/logs",
    summary: "Log search",
    detail: "Filter by service, level and limit, up to 500 entries.",
  },
];

export const posts = [
  {
    title: "A CI pipeline that fails on purpose",
    date: "2026-11-16",
    tags: ["CI/CD", "GitHub Actions"],
    summary:
      "Why the image job in this repo boots the container, polls /health and only then reads /metrics: a build that cannot start is not a build.",
    state: "draft" as const,
  },
  {
    title: "Two bugs my own tests found in production code",
    date: "2026-11-16",
    tags: ["Python", "Testing"],
    summary:
      "A datetime replace() that threw whenever the UTC minute was below ten, and a settings field that json.loads() before any validator ran.",
    state: "draft" as const,
  },
  {
    title: "Dockerising FastAPI the boring way",
    date: "2026-11-10",
    tags: ["Docker", "FastAPI"],
    summary:
      "Dependency layer first, unprivileged user second, healthcheck third. The Dockerfile in this portfolio, line by line.",
    state: "draft" as const,
  },
  {
    title: "Kubernetes primitives I actually use",
    date: "2026-11-02",
    tags: ["Kubernetes"],
    summary:
      "Pods, deployments, services, probes and resource limits, and the order I learned them in.",
    state: "draft" as const,
  },
];

export const roadmap = [
  { label: "FastAPI microservice with tests", state: "done" },
  { label: "Container image on GHCR", state: "done" },
  { label: "CI that lints, tests and smoke tests the image", state: "done" },
  { label: "Public API and live dashboard", state: "done" },
  { label: "Kubernetes manifests and Helm chart", state: "next" },
  { label: "GitOps with Argo CD", state: "next" },
  { label: "Terraform for the cluster", state: "later" },
  { label: "OpenTelemetry traces", state: "later" },
] as const;
