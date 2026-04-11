import { getProjects } from "@/lib/vercel";
import ProjectSearch from "@/components/project-search";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-1 text-sm text-gray-500">
          {projects.length} project{projects.length !== 1 ? "s" : ""} deployed
          on Vercel
        </p>
      </div>
      <ProjectSearch projects={projects} />
    </div>
  );
}
