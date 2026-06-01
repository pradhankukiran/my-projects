import Link from "next/link";
import { getProjects, getProjectDomains, getAllDeployments } from "@/lib/vercel";
import ProjectSearch from "@/components/project-search";

export const dynamic = "force-dynamic";

function statusGdsTag(state: string): { text: string; className: string } {
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
      return { text: state.toLowerCase(), className: "govuk-tag--grey" };
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
  const [allProjects, allDeployments] = await Promise.all([
    getProjects(),
    getAllDeployments(10), // Fetch extra items to account for filtering
  ]);

  // Prevent dashboard from displaying itself recursively
  const selfProjectId = process.env.VERCEL_PROJECT_ID;
  const selfProjectName = "vercel-dashboard";

  const projects = allProjects.filter(
    (p) => p.id !== selfProjectId && p.name !== selfProjectName
  );

  const recentDeployments = allDeployments
    .filter((d) => d.name !== selfProjectName)
    .slice(0, 5);

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

      {/* Developer Profile Header Grid */}
      <div className="govuk-grid-row border-b-4 border-govuk-text pb-6 mb-8">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl mb-2">Kiran Kumar Pradhan</h1>
          <p className="govuk-body font-bold text-govuk-blue mb-4">
            Senior Full Stack Developer | AI | Machine Learning
          </p>
          <p className="govuk-body text-govuk-secondary-text">
            Welcome to the Vercel projects administrative portal. This system provides official, live tracking of production deployments, active hostnames, repository synchronizations, and deployment logs retrieved directly from the Vercel API.
          </p>
          <div>
            <a
              href="https://github.com/pradhankukiran"
              target="_blank"
              rel="noopener noreferrer"
              className="govuk-button govuk-button--secondary"
            >
              View GitHub Profile ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main search and projects table/list */}
      <div className="mb-12">
        <ProjectSearch projects={projectsWithDomains} />
      </div>

      {/* Recent Activity Section */}
      <div className="border-t border-govuk-border pt-8">
        <h2 className="govuk-heading-l mb-4">Recent Deployment Activity</h2>
        {recentDeployments.length === 0 ? (
          <p className="govuk-body text-govuk-secondary-text italic">No recent deployment logs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th scope="col" className="govuk-table__header">Project</th>
                  <th scope="col" className="govuk-table__header">Target</th>
                  <th scope="col" className="govuk-table__header">Host URL</th>
                  <th scope="col" className="govuk-table__header font-normal">Commit Message</th>
                  <th scope="col" className="govuk-table__header">Status</th>
                  <th scope="col" className="govuk-table__header">Time</th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {recentDeployments.map((d) => {
                  const { text, className } = statusGdsTag(d.state);
                  return (
                    <tr key={d.uid} className="govuk-table__row">
                      <td className="govuk-table__cell font-bold">
                        <Link href={`/projects/${d.name}`} className="govuk-footer__link">
                          {d.name}
                        </Link>
                      </td>
                      <td className="govuk-table__cell">
                        <span className="font-mono text-xs uppercase px-1 bg-govuk-bg border border-govuk-border">
                          {d.target === "production" ? "prod" : "preview"}
                        </span>
                      </td>
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
                        {d.meta?.githubCommitMessage ? (
                          <span className="italic">"{d.meta.githubCommitMessage}"</span>
                        ) : (
                          <span className="text-govuk-secondary-text">Manual build trigger</span>
                        )}
                      </td>
                      <td className="govuk-table__cell">
                        <span className={`govuk-tag ${className}`}>{text}</span>
                      </td>
                      <td className="govuk-table__cell text-govuk-secondary-text">
                        {timeAgo(d.created)}
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
