import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, getProjects } from "@/lib/api";
import { ProjectLinks, ProjectVisual } from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProject(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const i = all.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? all[i - 1] : null;
  const next = i >= 0 && i < all.length - 1 ? all[i + 1] : null;

  return (
    <article className="container-x pb-8 pt-12 md:pt-16">
      <Link href="/work" className="link-mono"><ArrowLeft size={13} /> All work</Link>
      <header className="mt-8 max-w-3xl">
        <p className="label mb-4 flex gap-4"><span>{project.category}</span><span>{project.year}</span></p>
        <h1 className="text-4xl leading-[1.05] md:text-5xl">{project.title}</h1>
        <ul className="mt-6 flex flex-wrap gap-2">{project.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
        <div className="mt-6"><ProjectLinks links={project.links} /></div>
      </header>

      <Reveal className="panel mt-12 p-6 md:p-10"><ProjectVisual project={project} /></Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <section id="case-study">
          <p className="label mb-4">Overview</p>
          <div className="space-y-5 text-[15px] leading-relaxed text-charcoal/80">
            {project.description.map((para, k) => <p key={k}>{para}</p>)}
          </div>
        </section>
        <section>
          <p className="label mb-4">Highlights</p>
          <ul className="space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 border-t border-charcoal/10 pt-3 text-[14px] leading-snug">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />{h}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <nav aria-label="More projects" className="mt-16 grid gap-4 border-t border-charcoal/10 pt-8 sm:grid-cols-2">
        {prev ? <Link href={`/work/${prev.slug}`} className="panel group p-5 transition hover:border-olive/40"><span className="label flex items-center gap-1.5"><ArrowLeft size={12} /> Previous</span><span className="mt-2 block font-serif text-lg">{prev.title}</span></Link> : <span />}
        {next && <Link href={`/work/${next.slug}`} className="panel group p-5 text-right transition hover:border-olive/40"><span className="label flex items-center justify-end gap-1.5">Next <ArrowRight size={12} /></span><span className="mt-2 block font-serif text-lg">{next.title}</span></Link>}
      </nav>
    </article>
  );
}
