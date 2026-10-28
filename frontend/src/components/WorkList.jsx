"use client";
import { useMemo, useState } from "react";
import ProjectRow from "./ProjectRow";

export default function WorkList({ projects }) {
  const [tag, setTag] = useState("All");
  const tags = useMemo(() => ["All", ...new Set(projects.flatMap((p) => p.stack))], [projects]);
  const shown = tag === "All" ? projects : projects.filter((p) => p.stack.includes(tag));
  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
        {tags.map((t) => (
          <button key={t} onClick={() => setTag(t)} aria-pressed={tag === t}
            className={`rounded-sm border px-3 py-1.5 font-mono text-[11px] transition ${tag === t ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 hover:bg-mist"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-8">
        {shown.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
        {shown.length === 0 && <p className="text-charcoal/65">No projects match this filter yet.</p>}
      </div>
    </>
  );
}
