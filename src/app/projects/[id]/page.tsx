import Link from "next/link";
import { getProject, getDeployments } from "@/lib/vercel";
import type { DeploymentState } from "@/lib/types";

export const dynamic = "force-dynamic";

function statusColor(state: DeploymentState): string {
  switch (state) {
    case "READY":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "ERROR":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "BUILDING":
    case "INITIALIZING":
    case "QUEUED":
      return "bg-amber-50 text-amber-700 border-amber-200 animate-pulse";
    case "CANCELED":
      return "bg-slate-100 text-slate-500 border-slate-200";
    default:
      return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

function statusDotColor(state: DeploymentState): string {
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

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const FRAMEWORK_LABELS: Record<string, string> = {
  nextjs: "Next.js",
  gatsby: "Gatsby",
  remix: "Remix",
  nuxtjs: "Nuxt",
  vue: "Vue",
  svelte: "Svelte",
  sveltekit: "SvelteKit",
  angular: "Angular",
  astro: "Astro",
  vite: "Vite",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, deployments] = await Promise.all([
    getProject(id),
    getDeployments(id),
  ]);

  const prodUrl =
    project.targets?.production?.alias?.[0] ??
    project.targets?.production?.url;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* M3 Pill Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-outline bg-white text-sm font-semibold text-on-surface hover:bg-slate-50 m3-transition shadow-2xs mb-8"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 1H5L1 8l4 7h6" className="hidden" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 13L5 8l5-5" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Project Meta Info Header Card */}
      <div className="bg-white border border-outline rounded-2xl p-6 md:p-8 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center flex-wrap gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
                {project.name}
              </h1>
              {project.framework && (
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {FRAMEWORK_LABELS[project.framework] ?? project.framework}
                </span>
              )}
            </div>

            {prodUrl && (
              <a
                href={`https://${prodUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover font-mono truncate max-w-md group"
              >
                https://{prodUrl}
                <svg className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            {project.link && (
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                <svg className="h-4 w-4 text-on-surface-variant/75" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub Integrated:</span>
                <a
                  href={`https://github.com/${project.link.org}/${project.link.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-primary"
                >
                  {project.link.org}/{project.link.repo}
                </a>
              </div>
            )}
          </div>

          {prodUrl && (
            <a
              href={`https://${prodUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-6 py-3 rounded-xl bg-primary text-on-primary hover:bg-primary-hover font-bold shadow-sm hover:shadow m3-transition inline-flex items-center justify-center gap-2"
            >
              Open Production App
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Deployment History Timeline Section */}
      <div>
        <h2 className="text-xl font-extrabold text-on-surface mb-6 px-1">
          Deployment Timeline
        </h2>

        {deployments.length === 0 ? (
          <div className="text-center py-10 bg-white border border-outline rounded-2xl">
            <p className="text-sm text-on-surface-variant">No deployments found.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-outline ml-4 pl-8 space-y-8">
            {deployments.map((d) => (
              <div key={d.uid} className="relative group">
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[41px] top-4 h-6 w-6 rounded-full border-4 border-background bg-white flex items-center justify-center shadow-sm">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${statusDotColor(
                      d.state
                    )}`}
                  />
                </div>

                {/* Deployment Card */}
                <div className="bg-white border border-outline rounded-2xl p-5 shadow-2xs hover:shadow-xs m3-transition">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Left: Deployment URL and status */}
                    <div className="space-y-1.5 max-w-full md:max-w-md">
                      <div className="flex items-center gap-2.5">
                        <a
                          href={d.inspectorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs font-semibold text-on-surface hover:text-primary break-all"
                        >
                          {d.url}
                        </a>
                        <span
                          className={`shrink-0 border px-2 py-0.5 rounded-full text-3xs font-bold uppercase tracking-wider ${statusColor(
                            d.state
                          )}`}
                        >
                          {d.state}
                        </span>
                      </div>

                      {/* Commit Message */}
                      {d.meta?.githubCommitMessage ? (
                        <p className="text-xs text-on-surface-variant font-medium line-clamp-2 italic">
                          "{d.meta.githubCommitMessage}"
                        </p>
                      ) : (
                        <p className="text-xs text-on-surface-variant/60 font-medium">
                          Deploy triggered manually
                        </p>
                      )}
                    </div>

                    {/* Right: Metadata */}
                    <div className="flex items-center gap-3">
                      {/* Target Indicator */}
                      {d.target === "production" ? (
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 text-3xs font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-md">
                          Production
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-500 border border-slate-200 text-3xs font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-md">
                          Preview
                        </span>
                      )}

                      {/* Source branch info */}
                      {d.meta?.githubCommitRef && (
                        <span className="hidden sm:inline-flex items-center gap-1 bg-slate-50 border border-outline px-2 py-0.5 rounded text-3xs font-mono text-slate-600">
                          <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          {d.meta.githubCommitRef}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card bottom: date metadata */}
                  <div className="mt-4 pt-3 border-t border-outline/50 flex items-center justify-between text-3xs text-on-surface-variant/60">
                    <span className="font-semibold">{formatDate(d.created)}</span>
                    <a
                      href={d.inspectorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-bold"
                    >
                      View Inspector ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
