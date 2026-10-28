import { ArrowUp } from "lucide-react";
import { getProfile } from "@/lib/api";

export default async function Footer() {
  const p = await getProfile();
  const link = "font-mono text-[11px] uppercase tracking-wider text-charcoal/65 transition hover:text-olive";
  return (
    <footer className="mt-24 border-t border-charcoal/10 print:hidden">
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-xl">{p.name}</p>
          <p className="mt-1 max-w-sm text-sm text-charcoal/65">Architecting resilient full-stack systems and pragmatic software tools.</p>
          <p className="label mt-6">© {new Date().getFullYear()} {p.name}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href={p.github} className={link} target="_blank" rel="noreferrer">GitHub</a>
          <a href={p.linkedin} className={link} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${p.email}`} className={link}>Email</a>
          <a href="#top" className="inline-flex items-center gap-1.5 rounded-sm border border-charcoal/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition hover:bg-mist">
            <ArrowUp size={12} /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
