import Link from "next/link";
import { getProfile, getResume } from "@/lib/api";
import { AboutBlock, PageHeader } from "@/components/sections";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About", description: "Background, approach and philosophy of Yomi Fabiyi, a full-stack software engineer." };

export default async function AboutPage() {
  const [profile, resume] = await Promise.all([getProfile(), getResume()]);
  return (
    <>
      <PageHeader label="Background / 02" title="Building systems from data model to deployment" />
      <section className="container-x pb-12"><AboutBlock profile={profile} /></section>

      {resume.experience.length > 0 && (
        <section className="container-x border-t border-charcoal/10 py-16">
          <p className="label mb-8">Experience</p>
          <ol className="space-y-8">
            {resume.experience.map((e) => (
              <Reveal as="li" key={e.role + e.company} className="grid gap-2 md:grid-cols-[200px_1fr] md:gap-10">
                <p className="font-mono text-[11px] uppercase tracking-wider text-charcoal/65">{e.period}</p>
                <div>
                  <h2 className="font-sans text-[17px] font-medium tracking-normal">{e.role} <span className="text-charcoal/60">· {e.company}</span></h2>
                  {e.summary && <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-charcoal/70">{e.summary}</p>}
                </div>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      <section className="container-x border-t border-charcoal/10 py-16 text-center">
        <h2 className="text-3xl">Want the full picture?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/resume" className="btn-dark">View resume</Link>
          <Link href="/contact" className="btn-ghost">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
