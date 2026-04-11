import Link from "next/link";
import { getProject, getDeployments } from "@/lib/vercel";
import type { DeploymentState } from "@/lib/types";

export const dynamic = "force-dynamic";

function statusDot(state: DeploymentState): string {
  switch (state) {
    case "READY":
      return "bg-green-500";
    case "ERROR":
      return "bg-red-500";
    case "BUILDING":
    case "INITIALIZING":
    case "QUEUED":
      return "bg-yellow-500";
    case "CANCELED":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
}

function targetLabel(target: "production" | "preview" | null): string {
  if (target === "production") return "Production";
  if (target === "preview") return "Preview";
  return "—";
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
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M10 12L6 8l4-4" />
        </svg>
        All Projects
      </Link>

      <div className="mt-6 mb-10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.name}
          </h1>
          {project.framework && (
            <span className="border border-gray-200 px-2 py-0.5 text-xs text-gray-600">
              {project.framework}
            </span>
          )}
        </div>

        {prodUrl && (
          <a
            href={`https://${prodUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-mono text-gray-500 hover:text-black"
          >
            {prodUrl} &#8599;
          </a>
        )}

        {project.link && (
          <p className="mt-1 text-sm text-gray-400">
            {project.link.org}/{project.link.repo}
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Deployments</h2>

        {deployments.length === 0 ? (
          <p className="text-sm text-gray-500">No deployments found.</p>
        ) : (
          <div className="border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Deployment</th>
                  <th className="px-4 py-3 hidden md:table-cell">Target</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Branch</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Created</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d) => (
                  <tr
                    key={d.uid}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 shrink-0 ${statusDot(d.state)}`}
                          style={{ borderRadius: 0 }}
                        />
                        <span className="text-xs">{d.state}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={d.inspectorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-gray-700 hover:text-black"
                      >
                        {d.url}
                      </a>
                      {d.meta?.githubCommitMessage && (
                        <p className="mt-0.5 text-xs text-gray-400 truncate max-w-xs">
                          {d.meta.githubCommitMessage}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span
                        className={`text-xs px-2 py-0.5 border ${
                          d.target === "production"
                            ? "border-blue-200 text-blue-700 bg-blue-50"
                            : "border-gray-200 text-gray-500"
                        }`}
                      >
                        {targetLabel(d.target)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500 font-mono">
                      {d.meta?.githubCommitRef ?? "—"}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(d.created)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
