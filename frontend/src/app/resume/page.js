import { Download } from "lucide-react";
import { PUBLIC_API, getProfile, getResume, getSkills } from "@/lib/api";
import PrintButton from "@/components/PrintButton";

export const metadata = { title: "Resume", description: "Resume of Yomi Fabiyi, full-stack software engineer." };

export default async function ResumePage() {
  const [profile, resume, skills] = await Promise.all([getProfile(), getResume(), getSkills()]);
  const h = "label mb-5 border-b border-charcoal/10 pb-3";
  return (
    <article className="container-x max-w-4xl pb-8 pt-16 md:pt-24">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label mb-3">Resume</p>
          <h1 className="text-4xl md:text-5xl">{profile.name}</h1>
          <p className="mt-2 font-mono text-[12px] text-charcoal/70">{profile.role} · {profile.location}</p>
          <p className="mt-1 font-mono text-[12px] text-charcoal/70">{profile.email}</p>
        </div>
        <div className="flex flex-wrap gap-3 print:hidden">
          <a href="/Yomi-Fabiyi-Resumee.pdf" download className="btn-dark"><Download size={13} /> Download PDF</a>
          <PrintButton />
        </div>
      </header>

      <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-charcoal/80">{profile.intro}</p>

      <section className="mt-12">
        <h2 className={h}>Experience</h2>
        <ol className="space-y-8">
          {resume.experience.map((e) => (
            <li key={e.role + e.company} className="grid gap-2 md:grid-cols-[170px_1fr] md:gap-8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-charcoal/65">{e.period}</p>
              <div>
                <h3 className="font-sans text-[16px] font-medium tracking-normal">{e.role} <span className="text-charcoal/60">· {e.company}</span></h3>
                {e.summary && <p className="mt-2 text-[14px] leading-relaxed text-charcoal/70">{e.summary}</p>}
                {e.bullets?.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-[14px] text-charcoal/80">
                    {e.bullets.map((b) => <li key={b} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-olive" />{b}</li>)}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {resume.education.length > 0 && (
        <section className="mt-12">
          <h2 className={h}>Education</h2>
          <ul className="space-y-3">
            {resume.education.map((e) => (
              <li key={e.title} className="grid gap-1 md:grid-cols-[170px_1fr] md:gap-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-charcoal/65">{e.period}</p>
                <p className="text-[14px]">{e.title} <span className="text-charcoal/60">· {e.institution}</span></p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <h2 className={h}>Skills</h2>
        <dl className="space-y-3">
          {skills.map((c) => (
            <div key={c.name} className="grid gap-1 md:grid-cols-[170px_1fr] md:gap-8">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-charcoal/65">{c.name}</dt>
              <dd className="text-[14px]">{c.items.map((s) => s.name).join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
