import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, FileText, Layers } from "lucide-react";
import CountUp from "./CountUp";

const icons = { arrow: ArrowRight, external: ArrowUpRight, code: Code2, doc: FileText, layers: Layers };

export function ProjectLinks({ links = [] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {links.map((l) => {
        const Icon = icons[l.icon] || ArrowRight;
        const inner = (<>{l.label} <Icon size={13} className="transition group-hover:translate-x-0.5" /></>);
        return l.to ? (
          <Link key={l.label} href={l.to} className="link-mono group">{inner}</Link>
        ) : (
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="link-mono group">{inner}</a>
        );
      })}
    </div>
  );
}

export function Shot({ project }) {
  const src = project.cover || project.cover_path;
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={`${project.title} screenshot`} loading="lazy" className="w-full rounded-sm border border-charcoal/10 object-cover shadow-[0_20px_50px_-30px_rgba(32,35,31,.5)]" />;
  }
  // No screenshot uploaded yet: a neutral browser-window placeholder.
  return (
    <div className="rounded-sm border border-charcoal/10 bg-white p-3 shadow-[0_20px_50px_-30px_rgba(32,35,31,.5)]" role="img" aria-label={`${project.title} preview`}>
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-charcoal/20" /><span className="h-1.5 w-1.5 rounded-full bg-charcoal/20" /><span className="h-1.5 w-1.5 rounded-full bg-olive" />
        <span className="ml-3 h-2 w-1/3 rounded-full bg-mist" />
      </div>
      <div className="grid aspect-[16/10] grid-cols-[26%_1fr] gap-3">
        <div className="space-y-2 rounded-sm bg-mist/70 p-3">
          {[70, 55, 62, 40].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-charcoal/15" style={{ width: `${w}%` }} />)}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-10 rounded-sm bg-mist" />)}</div>
          <div className="h-[46%] rounded-sm bg-olive/15" />
          <div className="space-y-1.5">{[90, 76, 84].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-charcoal/10" style={{ width: `${w}%` }} />)}</div>
        </div>
      </div>
    </div>
  );
}

export function MetricsRow({ metrics = [] }) {
  if (!metrics.length) return null;
  return (
    <div className="grid grid-cols-3 gap-3">
      {metrics.map((m) => (
        <div key={m.label} className="rounded-sm border border-charcoal/10 bg-white/60 py-4 text-center">
          <div className="font-serif text-2xl text-olive">
            <CountUp value={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
          </div>
          <div className="label mt-1 !text-[9px]">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

export function CodePanel({ project }) {
  return (
    <div className="rounded-sm border border-charcoal/10 bg-white/80 p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-charcoal/65">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-olive" />{project.snippet_title}</span>
        <span className="normal-case">{project.snippet_meta}</span>
      </div>
      <pre className="overflow-x-auto rounded-sm bg-mist/80 p-4 font-mono text-[12px] leading-6">
        {project.snippet.split("\n").map((line, i) => (
          <div key={i} className={/^\s*(#|\/\/)/.test(line) ? "text-charcoal/55" : "text-charcoal"}>{line || "\u00A0"}</div>
        ))}
      </pre>
    </div>
  );
}

export function ProjectVisual({ project }) {
  const hasImage = project.cover || project.cover_path;
  const showCode = !hasImage && project.snippet;
  return (
    <div className="space-y-4">
      {showCode ? <CodePanel project={project} /> : <Shot project={project} />}
      <MetricsRow metrics={project.metrics} />
    </div>
  );
}

export default function ProjectRow({ project, index = 0 }) {
  const flip = index % 2 === 1;
  return (
    <article className="panel group grid items-center gap-8 p-6 md:p-10 lg:grid-cols-2 lg:gap-12">
      <div className={`transition duration-500 group-hover:-translate-y-1 ${flip ? "lg:order-first" : "lg:order-last"}`}>
        <ProjectVisual project={project} />
      </div>
      <div className={flip ? "lg:order-last" : "lg:order-first"}>
        <p className="label mb-4 flex gap-4"><span>{project.category}</span><span>{project.year}</span></p>
        <h3 className="text-[28px] leading-tight md:text-3xl">{project.title}</h3>
        <p className="mt-4 text-[14px] leading-relaxed text-charcoal/70">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">{project.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
        <div className="mt-7"><ProjectLinks links={project.links} /></div>
      </div>
    </article>
  );
}
