import Link from "next/link";
import { getProject, getDeployments } from "@/lib/vercel";
import type { DeploymentState } from "@/lib/types";

export const dynamic = "force-dynamic";

function statusGdsTag(state: DeploymentState): { text: string; className: string } {
  switch (state) {
    case "READY":
      return { text: "Ready", className: "govuk-tag--green" };
    case "ERROR":
      return { text: "Error", className: "govuk-tag--red" };
    case "BUILDING":
    case "INITIALIZING":
    case "QUEUED":
      return { text: "Building", className: "govuk-tag--yellow" };
    case "CANCELED":
      return { text: "Canceled", className: "govuk-tag--grey" };
    default:
      const fallback = state as string;
      return { text: fallback ? fallback.toLowerCase() : "unknown", className: "govuk-tag--grey" };
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
    <div className="govuk-width-container py-8">
      {/* GOV.UK Phase Banner */}
      <div className="govuk-phase-banner">
        <div className="govuk-phase-banner__content">
          <strong className="govuk-phase-banner__tag">BETA</strong>
          <span className="govuk-phase-banner__text text-govuk-secondary-text">
            This is a private administrative dashboard. Your feedback will help us improve it.
          </span>
        </div>
      </div>

      {/* GDS Back Link */}
      <Link href="/" className="govuk-back-link">
        Back to Dashboard
      </Link>

      <div className="govuk-grid-row mb-8">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl mb-4">{project.name}</h1>
          <p className="govuk-body">
            View detailed registry info, git integration pathways, and the full deployment timeline for this application.
          </p>
        </div>
      </div>

      {/* Project Meta Info via GOV.UK Summary List */}
      <div className="border-4 border-govuk-text bg-govuk-white p-6 mb-10">
        <h2 className="govuk-heading-l mb-6 pb-2 border-b-2 border-govuk-border">
          Project Specifications
        </h2>
        
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Framework</dt>
            <dd className="govuk-summary-list__value">
              {project.framework ? (
                <span className="font-semibold">
                  {FRAMEWORK_LABELS[project.framework] ?? project.framework}
                </span>
              ) : (
                <span className="text-govuk-secondary-text">Not detected</span>
              )}
            </dd>
          </div>

          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Production Link</dt>
            <dd className="govuk-summary-list__value font-mono text-sm">
              {prodUrl ? (
                <a
                  href={`https://${prodUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="govuk-footer__link"
                >
                  https://{prodUrl} ↗
                </a>
              ) : (
                <span className="text-govuk-secondary-text">Unavailable</span>
              )}
            </dd>
          </div>

          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Git Integration</dt>
            <dd className="govuk-summary-list__value">
              {project.link ? (
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-xs uppercase px-1.5 py-0.5 bg-govuk-bg border border-govuk-border">
                    {project.link.type}
                  </span>
                  <a
                    href={`https://github.com/${project.link.org}/${project.link.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="govuk-footer__link font-semibold"
                  >
                    {project.link.org}/{project.link.repo} ↗
                  </a>
                </div>
              ) : (
                <span className="text-govuk-secondary-text">No active VCS integration</span>
              )}
            </dd>
          </div>

          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Host Registry ID</dt>
            <dd className="govuk-summary-list__value font-mono text-xs text-govuk-secondary-text">
              {project.id}
            </dd>
          </div>
        </dl>

        {prodUrl && (
          <div className="pt-2">
            <a
              href={`https://${prodUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="govuk-button"
            >
              Open Production Application ↗
            </a>
          </div>
        )}
      </div>

      {/* Deployment History Table */}
      <div>
        <h2 className="govuk-heading-l mb-4">Deployment Timeline</h2>
        {deployments.length === 0 ? (
          <div className="border-4 border-govuk-border bg-govuk-white p-8 text-center">
            <p className="govuk-body text-govuk-secondary-text italic">No deployment history logs found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th scope="col" className="govuk-table__header">Deploy URL</th>
                  <th scope="col" className="govuk-table__header">Target</th>
                  <th scope="col" className="govuk-table__header">Commit / Ref</th>
                  <th scope="col" className="govuk-table__header">Status</th>
                  <th scope="col" className="govuk-table__header">Date & Time</th>
                  <th scope="col" className="govuk-table__header">Action</th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {deployments.map((d) => {
                  const { text, className } = statusGdsTag(d.state);
                  return (
                    <tr key={d.uid} className="govuk-table__row">
                      <td className="govuk-table__cell font-mono text-xs">
                        <a
                          href={`https://${d.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="govuk-footer__link"
                        >
                          {d.url}
                        </a>
                      </td>
                      <td className="govuk-table__cell">
                        <span className="font-mono text-xs uppercase px-1 bg-govuk-bg border border-govuk-border">
                          {d.target === "production" ? "prod" : "preview"}
                        </span>
                      </td>
                      <td className="govuk-table__cell">
                        <div className="space-y-1">
                          {d.meta?.githubCommitMessage ? (
                            <p className="italic text-xs font-semibold">"{d.meta.githubCommitMessage}"</p>
                          ) : (
                            <p className="text-govuk-secondary-text text-xs">Manual Deployment</p>
                          )}
                          {d.meta?.githubCommitRef && (
                            <p className="text-govuk-secondary-text text-3xs font-mono">
                              Branch: {d.meta.githubCommitRef}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="govuk-table__cell">
                        <span className={`govuk-tag ${className}`}>{text}</span>
                      </td>
                      <td className="govuk-table__cell text-govuk-secondary-text">
                        {formatDate(d.created)}
                      </td>
                      <td className="govuk-table__cell">
                        <a
                          href={d.inspectorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="govuk-footer__link text-xs font-bold"
                        >
                          Inspector ↗
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
