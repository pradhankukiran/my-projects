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

  // Compute portfolio statistics for Material Cards
  const totalProjects = projects.length;
  const activeDeployments = projects.filter(
    (p) => p.targets?.production?.readyState === "READY"
  ).length;
  const uniqueFrameworks = new Set(
    projects.map((p) => p.framework).filter(Boolean)
  ).size;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* M3 Header / Intro */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-outline">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
            My Project Hub
          </h1>
          <p className="mt-3 text-base text-on-surface-variant leading-relaxed">
            Welcome to my personal showcase portfolio. This dashboard displays live project statuses, git repos, and direct production environments fetched directly from the Vercel API.
          </p>
        </div>
        <div className="flex gap-2 self-start md:self-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            Live Sync Active
          </span>
        </div>
      </div>

      {/* M3 Overview Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-12">
        {/* Card 1: Total Projects */}
        <div className="bg-white border border-outline rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Total Projects
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-on-surface">
              {totalProjects}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Active Deployments */}
        <div className="bg-white border border-outline rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Active Deployments
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-on-surface text-emerald-600">
              {activeDeployments}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Frameworks Used */}
        <div className="bg-white border border-outline rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Frameworks Used
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-on-surface text-violet-600">
              {uniqueFrameworks}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main projects grid with filters & search */}
      <ProjectSearch projects={projectsWithDomains} />
    </div>
  );
}
