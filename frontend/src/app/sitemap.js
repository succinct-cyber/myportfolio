import { getProjects } from "@/lib/api";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const projects = await getProjects();
  const pages = ["", "/work", "/about", "/skills", "/contact", "/resume"].map((p) => ({ url: `${site}${p}` }));
  return [...pages, ...projects.map((p) => ({ url: `${site}/work/${p.slug}` }))];
}
