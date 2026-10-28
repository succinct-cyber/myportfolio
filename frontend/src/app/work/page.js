import { getProjects } from "@/lib/api";
import { PageHeader } from "@/components/sections";
import WorkList from "@/components/WorkList";

export const metadata = { title: "Work", description: "Selected web applications and backend systems built with Django, DRF, React and PostgreSQL." };

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader label="Selected work" title="Crafted applications & backend systems">
        Production web apps, data pipelines and civic-tech platforms, each built around reliable architecture and structured relational data.
      </PageHeader>
      <section className="container-x pb-8"><WorkList projects={projects} /></section>
    </>
  );
}
