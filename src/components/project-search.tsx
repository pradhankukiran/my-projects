"use client";

import { useState } from "react";
import Link from "next/link";
import type { VercelProject } from "@/lib/types";

type ProjectWithUrl = VercelProject & { resolvedUrl: string };

const FRAMEWORK_LABELS: Record<string, string> = {
  nextjs: "Next.js",
  gatsby: "Gatsby",
  remix: "Remix",
  nuxtjs: "Nuxt",
  vue: "Vue",
  svelte: "Svelte",
  sveltekit: "SvelteKit",
  "sveltekit-1": "SvelteKit",
  angular: "Angular",
  astro: "Astro",
  hugo: "Hugo",
  jekyll: "Jekyll",
  eleventy: "Eleventy",
  blitz: "Blitz.js",
  create_react_app: "React",
  vite: "React",
  solidstart: "SolidStart",
  ember: "Ember",
  hexo: "Hexo",
  docusaurus: "Docusaurus",
  preact: "Preact",
  sanity: "Sanity",
  storybook: "Storybook",
  polymer: "Polymer",
  brunch: "Brunch",
  middleman: "Middleman",
  zola: "Zola",
  hydrogen: "Hydrogen",
  parcel: "Parcel",
  fasthtml: "FastHTML",
  blazor: "Blazor",
};

function frameworkLabel(fw: string | null): string {
  if (!fw) return "Other Framework";
  return FRAMEWORK_LABELS[fw] ?? fw;
}

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
      return { text: state ? state.toLowerCase() : "unknown", className: "govuk-tag--grey" };
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
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function ProjectSearch({
  projects,
}: {
  projects: ProjectWithUrl[];
}) {
  const [query, setQuery] = useState("");
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  // Extract unique frameworks
  const frameworks = Array.from(
    new Set(projects.map((p) => p.framework).filter(Boolean))
  ) as string[];

  // Filter projects by both search query and framework
  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesFramework = selectedFramework ? p.framework === selectedFramework : true;
    return matchesSearch && matchesFramework;
  });

  return (
    <div>
      {/* Search & Filter GDS Control Panel */}
      <div className="govuk-grid-row mb-6">
        {/* Search Field Column */}
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group">
            <label className="govuk-heading-m mb-1" htmlFor="search-projects">
              Search deployed projects
            </label>
            <div id="search-hint" className="govuk-body-s text-govuk-secondary-text mb-2">
              Filter by name or keyword.
            </div>
            <div className="flex gap-2 max-w-xl">
              <input
                className="govuk-input"
                id="search-projects"
                name="search-projects"
                type="text"
                placeholder="e.g. my-project"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-describedby="search-hint"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="govuk-button govuk-button--secondary"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Framework Filter Dropdown Column */}
        <div className="govuk-grid-column-one-third">
          <div className="govuk-form-group">
            <label className="govuk-heading-m mb-1" htmlFor="filter-framework">
              Filter by framework
            </label>
            <div id="filter-hint" className="govuk-body-s text-govuk-secondary-text mb-2">
              Select custom filter options.
            </div>
            <select
              className="govuk-input"
              id="filter-framework"
              value={selectedFramework || ""}
              onChange={(e) => setSelectedFramework(e.target.value || null)}
              aria-describedby="filter-hint"
            >
              <option value="">All frameworks</option>
              {frameworks.map((fw) => (
                <option key={fw} value={fw}>
                  {frameworkLabel(fw)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6 border-b-2 border-govuk-border pb-2">
        <h2 className="govuk-heading-l m-0">
          Deployed Applications ({filtered.length})
        </h2>
      </div>

      {/* Grid of Projects using GDS Summary Cards */}
      {filtered.length === 0 ? (
        <div className="border-4 border-govuk-border bg-govuk-white p-8 text-center max-w-md mx-auto my-12">
          <h3 className="govuk-heading-m">No matching records found</h3>
          <p className="govuk-body mb-4 text-govuk-secondary-text">
            There are no projects that match the search term "{query}" or the selected framework filter.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedFramework(null);
            }}
            className="govuk-button"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const state = project.targets?.production?.readyState;
            const cardClass =
              state === "READY"
                ? "govuk-summary-card govuk-summary-card--ready"
                : state === "ERROR"
                ? "govuk-summary-card govuk-summary-card--error"
                : "govuk-summary-card govuk-summary-card--building";

            const { text: statusText, className: tagClassName } = statusGdsTag(state || "");

            return (
              <div key={project.id} className={cardClass}>
                <div className="govuk-summary-card__title-wrapper">
                  <h3 className="govuk-summary-card__title">
                    <Link href={`/projects/${project.id}`} className="govuk-footer__link">
                      {project.name}
                    </Link>
                  </h3>
                  <span className={`govuk-tag ${tagClassName}`}>{statusText}</span>
                </div>
                <div className="govuk-summary-card__content flex flex-col justify-between h-[180px]">
                  <div className="space-y-3">
                    {/* Resolved URL */}
                    <div className="text-sm font-mono">
                      <span className="block font-bold text-3xs text-govuk-secondary-text uppercase tracking-wider mb-0.5">Production URL</span>
                      <a
                        href={`https://${project.resolvedUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="govuk-footer__link break-all block truncate"
                      >
                        https://{project.resolvedUrl}
                      </a>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-govuk-border">
                      <div>
                        <span className="block font-bold text-3xs text-govuk-secondary-text uppercase tracking-wider mb-0.5">Framework</span>
                        <span className="text-xs font-semibold block truncate">
                          {frameworkLabel(project.framework)}
                        </span>
                      </div>
                      <div>
                        <span className="block font-bold text-3xs text-govuk-secondary-text uppercase tracking-wider mb-0.5">Source Sync</span>
                        <span className="text-xs font-semibold block truncate">
                          {project.link ? (
                            <a
                              href={`https://github.com/${project.link.org}/${project.link.repo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="govuk-footer__link"
                            >
                              GitHub ↗
                            </a>
                          ) : (
                            "None"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-2 border-t border-govuk-border flex justify-between items-center text-3xs text-govuk-secondary-text mt-auto">
                    <span>Updated {timeAgo(project.updatedAt)}</span>
                    <div className="flex gap-2">
                      <Link
                        href={`/projects/${project.id}`}
                        className="govuk-button govuk-button--secondary text-xs px-2 py-0.5"
                      >
                        Details
                      </Link>
                      <a
                        href={`https://${project.resolvedUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="govuk-button text-xs px-2 py-0.5"
                      >
                        Visit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
