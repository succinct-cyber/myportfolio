import content from "./content.json";

// Server-side only: Next.js server components call Django directly.
const BACKEND = process.env.BACKEND_URL || "http://localhost:8000";

// Browser-side base URL (contact form, resume download).
export const PUBLIC_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Fetch from Django, cached/revalidated every 5 minutes. If the API is
// unreachable the bundled content.json keeps the site fully rendered.
async function get(path, fallback) {
  try {
    const res = await fetch(`${BACKEND}/api${path}`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch {
    return fallback;
  }
}

export const getProfile = () => get("/profile/", content.profile);
export const getProjects = () => get("/projects/", content.projects);
export const getSkills = () => get("/skills/", content.skills);
export const getResume = () =>
  get("/resume/", { experience: content.experience, education: content.education });
export const getProject = (slug) =>
  get(`/projects/${slug}/`, content.projects.find((p) => p.slug === slug) ?? null);

export async function postContact(payload) {
  const res = await fetch(`${PUBLIC_API}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(res.status === 429 ? "Too many messages — please try again later." : "Could not send your message.");
  }
}
