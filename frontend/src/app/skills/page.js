import Link from "next/link";
import { getSkills } from "@/lib/api";
import { PageHeader, SkillsMatrix } from "@/components/sections";

export const metadata = { title: "Skills", description: "Backend, frontend, database and infrastructure toolchain: Python, Django, FastAPI, Go, React, PostgreSQL, MongoDB, AWS and Docker." };

export default async function SkillsPage() {
  const skills = await getSkills();
  return (
    <>
      <PageHeader label="Technical matrix / 03" title="Core competencies & toolchain">
        A grounded breakdown of the technologies and paradigms I leverage daily to construct robust digital products.
      </PageHeader>
      <section className="container-x pb-12"><SkillsMatrix categories={skills} /></section>
      <section className="container-x border-t border-charcoal/10 py-16 text-center">
        <h2 className="text-3xl">See it applied</h2>
        <Link href="/work" className="btn-dark mt-6">Explore my work</Link>
      </section>
    </>
  );
}
