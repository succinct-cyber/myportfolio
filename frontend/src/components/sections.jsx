import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, AppWindow, Clock, Compass, Database, Mail, Network, Server } from "lucide-react";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import ContactForm from "./ContactForm";

const skillIcons = { server: Server, window: AppWindow, database: Database, compass: Compass };

export function SectionHead({ label, title, children, level: H = "h2" }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-end">
      <Reveal>
        <p className="label mb-3">{label}</p>
        <H className="max-w-xl text-4xl leading-[1.05] md:text-5xl">{title}</H>
      </Reveal>
      {children && (
        <Reveal delay={0.1}>
          <p className="max-w-lg text-[15px] leading-relaxed text-charcoal/70 md:ml-auto">{children}</p>
        </Reveal>
      )}
    </div>
  );
}

export function PageHeader({ label, title, children }) {
  return (
    <section className="container-x pb-10 pt-16 md:pt-24">
      <SectionHead label={label} title={title} level="h1">{children}</SectionHead>
    </section>
  );
}

export function Hero({ profile, stats = [] }) {
  const chan = "font-mono text-[11px] text-charcoal/65 transition hover:text-olive";
  return (
    <>
      <section className="container-x pb-16 pt-16 md:pb-24 md:pt-24">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-mist px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-charcoal/75">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-olive" />
            {profile.availability}
          </p>
          <h1 className="text-balance text-5xl leading-[1.04] sm:text-6xl md:text-7xl lg:text-[88px]">
            {profile.headline}
          </h1>
          <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-charcoal/70">{profile.intro}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/work" className="btn-dark">Explore my work <ArrowDown size={13} /></Link>
            <Link href="/contact" className="btn-ghost">Get in touch</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="label">Channels</span>
            <span className="text-charcoal/30">/</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className={chan}>GitHub</a>
            <span className="text-charcoal/30">/</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={chan}>LinkedIn</a>
            <a href={`mailto:${profile.email}`} className={`${chan} sm:ml-3`}>{profile.email}</a>
          </div>
        </Reveal>
      </section>

      {stats.length > 0 && (
        <div className="border-t border-charcoal/10">
          <Reveal delay={0.15} className="container-x">
            <ul className="flex flex-wrap justify-center gap-x-24 gap-y-10 py-14 text-center">
              {stats.map((s) => (
                <li key={s.label}>
                  <p className="font-serif text-5xl md:text-6xl">
                    <CountUp value={s.value} suffix={s.suffix || ""} />
                  </p>
                  <p className="mt-2 text-[14px] leading-snug text-charcoal/70">{s.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      )}
    </>
  );
}

export function ViewAll() {
  return (
    <div className="mt-14 border-y border-charcoal/10 py-5 text-center">
      <Link href="/work" className="link-mono group">
        View all projects &amp; open-source repositories <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export function AboutBlock({ profile }) {
  const Field = ({ k, v }) => (
    <div className="border-t border-charcoal/10 pt-4">
      <dt className="label mb-1.5">{k}</dt>
      <dd className="text-[13px] leading-snug">{v}</dd>
    </div>
  );
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
      <Reveal className="panel space-y-5 p-6">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-sm border border-charcoal/10 bg-white">
            <Image src="/yomi-fabiyi-mark.svg" alt="" width={34} height={34} />
          </div>
          <div>
            <p className="font-serif text-xl">{profile.name}</p>
            <p className="label">{profile.role}</p>
          </div>
        </div>
        <dl className="space-y-4">
          <Field k="Specialization" v={profile.specialization} />
          <Field k="Core stack" v={profile.core_stack} />
          <Field k="Location & delivery" v={profile.location} />
          <Field k="Approach" v={profile.approach} />
        </dl>
        <p className="rounded-sm border border-charcoal/10 bg-white/70 p-3 font-mono text-[11px] leading-relaxed text-charcoal/75">
          Philosophy: {profile.philosophy}
        </p>
      </Reveal>
      <div className="space-y-6 text-[15px] leading-relaxed text-charcoal/80">
        {profile.bio.map((para, i) => <Reveal key={i} delay={i * 0.08}><p>{para}</p></Reveal>)}
        {profile.quote && (
          <Reveal delay={0.2}>
            <blockquote className="rounded-r-sm border-l-2 border-olive bg-mist/70 px-6 py-6 font-serif text-xl italic leading-snug text-charcoal/85">
              “{profile.quote}”
            </blockquote>
          </Reveal>
        )}
      </div>
    </div>
  );
}

export function SkillsMatrix({ categories }) {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((c, i) => {
        const Icon = skillIcons[c.icon] || Server;
        return (
          <Reveal key={c.name} delay={i * 0.07} className="panel flex flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-olive/40">
            <h3 className="flex items-center gap-2 font-sans text-[15px] font-medium tracking-normal"><Icon size={16} className="text-olive" /> {c.name}</h3>
            <p className="mb-5 mt-3 text-[13px] leading-snug text-charcoal/65">{c.blurb}</p>
            <ul className="mt-auto space-y-2">
              {c.items.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-3 rounded-sm bg-white/70 px-3 py-2 font-mono text-[11px]">
                  <span>{s.name}</span><span className="text-right text-charcoal/60">{s.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}

export function ContactBlock({ profile, level = "h2" }) {
  const Card = ({ icon: Icon, title, children }) => (
    <div className="panel p-5">
      <p className="mb-2 flex items-center gap-2.5 text-[15px] font-medium"><Icon size={16} className="text-olive" /> {title}</p>
      {children}
    </div>
  );
  const a = "font-mono text-[12px] transition hover:text-olive";
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div>
        <SectionHead label="Initiate contact / 04" title="Have something worth building?" level={level} />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-charcoal/70">
            I&apos;m open to software development opportunities and conversations about useful products to build.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 space-y-4">
          <Card icon={Clock} title="Response Time"><p className="text-[13px] text-charcoal/65">{profile.response_time}</p></Card>
          <Card icon={Mail} title="Direct Inbox"><a href={`mailto:${profile.email}`} className={a}>{profile.email}</a></Card>
          <Card icon={Network} title="Networks">
            <div className="flex gap-6">
              <a href={profile.github} target="_blank" rel="noreferrer" className={a}>GitHub Profile</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={a}>LinkedIn Profile</a>
            </div>
          </Card>
        </Reveal>
        <p className="label mt-6">{profile.timezone} / Asynchronous First · Available Worldwide</p>
      </div>
      <Reveal delay={0.1}><ContactForm /></Reveal>
    </div>
  );
}
