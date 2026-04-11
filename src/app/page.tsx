import { getProjects, getProjectDomains } from "@/lib/vercel";
import ProjectSearch from "@/components/project-search";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();

  const projectsWithDomains = await Promise.all(
    projects.map(async (project) => {
      const domains = await getProjectDomains(project.id);
      const customDomain = domains.find(
        (d) => !d.name.endsWith(".vercel.app")
      );
      const resolvedUrl =
        customDomain?.name ??
        domains[0]?.name ??
        `${project.name}.vercel.app`;
      return { ...project, resolvedUrl };
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-1 text-sm text-gray-500">
          {projects.length} project{projects.length !== 1 ? "s" : ""} deployed
          on Vercel
        </p>
      </div>
      <ProjectSearch projects={projectsWithDomains} />
    </div>
  );
}
