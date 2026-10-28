import { getProfile, getProjects, getSkills } from "@/lib/api";
import { AboutBlock, ContactBlock, Hero, SectionHead, SkillsMatrix, ViewAll } from "@/components/sections";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";

export default async function Home() {
  const [profile, projects, skills] = await Promise.all([getProfile(), getProjects(), getSkills()]);
  const featured = projects.filter((p) => p.featured);
  const stats = [
    { value: 5, suffix: "+", label: "Years of experience" },
    { value: 10, suffix: "+", label: "Products built" },
  ];
  const band = "border-t border-charcoal/10 py-20 md:py-24";
  return (
    <>
      <Hero profile={profile} stats={stats} />
      <section className={band}>
        <div className="container-x">
          <SectionHead label="Selected work / 01" title="Crafted applications & backend systems">
            A curated selection of web applications built with an emphasis on reliable architecture, structured relational data, and practical workflows that solve real problems.
          </SectionHead>
          <div className="mt-12 space-y-8">
            {featured.map((p, i) => <Reveal key={p.slug}><ProjectRow project={p} index={i} /></Reveal>)}
          </div>
          <ViewAll />
        </div>
      </section>
      <section className={band}>
        <div className="container-x">
          <SectionHead label="Background / 02" title="Building systems from data model to deployment" />
          <AboutBlock profile={profile} />
        </div>
      </section>
      <section className={band}>
        <div className="container-x">
          <SectionHead label="Technical matrix / 03" title="Core competencies & toolchain">
            A grounded breakdown of the technologies and paradigms I leverage daily to construct robust digital products.
          </SectionHead>
          <SkillsMatrix categories={skills} />
        </div>
      </section>
      <section className={band}>
        <div className="container-x"><ContactBlock profile={profile} /></div>
      </section>
    </>
  );
}
