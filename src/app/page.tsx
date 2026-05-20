import Link from "next/link";
import { getProjects, getProjectDomains, getAllDeployments } from "@/lib/vercel";
import ProjectSearch from "@/components/project-search";

export const dynamic = "force-dynamic";

function statusDotColor(state: string): string {
  switch (state) {
    case "READY":
      return "bg-emerald-500";
    case "ERROR":
      return "bg-rose-500";
    case "BUILDING":
    case "INITIALIZING":
    case "QUEUED":
      return "bg-amber-500 animate-ping";
    case "CANCELED":
      return "bg-slate-400";
    default:
      return "bg-slate-400";
  }
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function Home() {
  const [projects, recentDeployments] = await Promise.all([
    getProjects(),
    getAllDeployments(5),
  ]);

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

  // Compute portfolio statistics for the compact metrics dashboard
  const totalProjects = projects.length;
  const activeDeployments = projects.filter(
    (p) => p.targets?.production?.readyState === "READY"
  ).length;
  const uniqueFrameworks = new Set(
    projects.map((p) => p.framework).filter(Boolean)
  ).size;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
      {/* Developer Profile Hero Layout (Split Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Biography & Brand */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-5">
            {/* Elegant avatar placeholder */}
            <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-extrabold shadow-md border-2 border-white select-none shrink-0">
              KP
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
                Kiran Pradhan
              </h1>
              <p className="text-sm font-semibold text-primary">
                Full Stack Engineer & Creative Developer
              </p>
            </div>
          </div>

          <p className="text-base text-on-surface-variant leading-relaxed max-w-2xl">
            Welcome to my personal showcase. I construct web architectures, frontends, and integrations. This workspace provides dynamic insights into my production deployments, github synchronizations, and live status logs fetched directly from Vercel API.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              API Connected
            </span>
            <a
              href="https://github.com/pradhankukiran"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-outline bg-white hover:bg-slate-50 text-xs font-semibold text-on-surface m3-transition shadow-2xs"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Right Col: M3 Metrics Card */}
        <div className="bg-white border border-outline rounded-2xl p-6 shadow-sm space-y-4 w-full">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-on-surface-variant">
            System Overview
          </h3>

          <div className="space-y-3.5">
            {/* Stat row 1 */}
            <div className="flex items-center justify-between border-b border-outline/50 pb-2.5">
              <span className="text-xs font-semibold text-on-surface-variant">Total Projects</span>
              <span className="text-lg font-bold text-on-surface">{totalProjects}</span>
            </div>

            {/* Stat row 2 */}
            <div className="flex items-center justify-between border-b border-outline/50 pb-2.5">
              <span className="text-xs font-semibold text-on-surface-variant">Active Deployments</span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-lg font-bold text-emerald-600">{activeDeployments}</span>
              </div>
            </div>

            {/* Stat row 3 */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-on-surface-variant">Supported Frameworks</span>
              <span className="text-lg font-bold text-violet-600">{uniqueFrameworks}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main projects grid with filters & search */}
      <div className="border-t border-outline/65 pt-10">
        <ProjectSearch projects={projectsWithDomains} />
      </div>

      {/* Bottom Global Recent Activity Feed */}
      <div className="border-t border-outline/65 pt-10 space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-5 rounded bg-primary" />
          <h2 className="text-lg font-extrabold text-on-surface">Recent Deployment Activity</h2>
        </div>

        {recentDeployments.length === 0 ? (
          <p className="text-sm text-on-surface-variant italic">No recent deployment logs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentDeployments.map((d) => (
              <Link
                key={d.uid}
                href={`/projects/${d.name}`}
                className="bg-white border border-outline hover:border-slate-300 rounded-xl p-4 shadow-3xs flex justify-between items-start gap-4 m3-transition cursor-pointer"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface truncate hover:text-primary">
                      {d.name}
                    </span>
                    <span className="shrink-0 text-3xs font-semibold text-on-surface-variant font-mono bg-slate-100 border border-outline px-1.5 py-0.25 rounded">
                      {d.target === "production" ? "prod" : "preview"}
                    </span>
                  </div>
                  <p className="text-3xs text-on-surface-variant font-mono truncate max-w-xs break-all">
                    {d.url}
                  </p>
                  {d.meta?.githubCommitMessage && (
                    <p className="text-3xs text-on-surface-variant/80 italic truncate line-clamp-1 max-w-[250px]">
                      "{d.meta.githubCommitMessage}"
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end shrink-0 space-y-2">
                  <span className="text-3xs text-on-surface-variant/75 font-semibold">
                    {timeAgo(d.created)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${statusDotColor(d.state)}`} />
                    <span className="text-3xs font-bold uppercase tracking-wider text-on-surface-variant">
                      {d.state}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
