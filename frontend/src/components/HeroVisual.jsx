"use client";
import { motion } from "framer-motion";

const lines = [
  ["kw", "class ", "tx", "Portfolio", "mu", "(models.Model):"],
  ["mu", "    # schema first, UI second"],
  ["tx", "    name = ", "kw", "models.CharField", "mu", "(max_length=120)"],
  ["tx", "    stack = ", "kw", "models.JSONField", "mu", "(default=list)"],
  [],
  ["kw", "@api_view", "mu", '(["GET"])'],
  ["kw", "def ", "tx", "projects", "mu", "(request):"],
  ["kw", "    return ", "tx", "Response", "mu", "(serialize(Project.objects.all()))"],
];
const color = { kw: "text-olive", tx: "text-ivory", mu: "text-ivory/50" };

export default function HeroVisual() {
  return (
    <motion.div
      className="rounded-md border border-charcoal/10 bg-mist p-4 shadow-[0_30px_60px_-35px_rgba(32,35,31,.55)]"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="overflow-hidden rounded-sm bg-charcoal">
        <div className="flex items-center gap-1.5 border-b border-ivory/10 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-ivory/25" />
          <span className="h-2 w-2 rounded-full bg-ivory/25" />
          <span className="h-2 w-2 rounded-full bg-olive" />
          <span className="ml-3 font-mono text-[10px] text-ivory/45">portfolio/models.py</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[11.5px] leading-6 md:text-[12.5px]">
          {lines.map((parts, i) => (
            <div key={i}>
              {parts.length === 0 ? "\u00A0" : null}
              {Array.from({ length: parts.length / 2 }, (_, k) => (
                <span key={k} className={color[parts[k * 2]]}>{parts[k * 2 + 1]}</span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </motion.div>
  );
}
