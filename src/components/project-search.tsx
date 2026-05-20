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
  angular: "Angular",
  astro: "Astro",
  hugo: "Hugo",
  jekyll: "Jekyll",
  eleventy: "Eleventy",
  blitz: "Blitz.js",
  create_react_app: "Create React App",
  vite: "Vite",
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
  if (!fw) return "Other";
  return FRAMEWORK_LABELS[fw] ?? fw;
}

function frameworkBadgeStyle(fw: string | null): string {
  if (!fw) return "bg-slate-100 text-slate-700 border-slate-200";
  switch (fw) {
    case "nextjs":
      return "bg-slate-900 text-slate-50 border-slate-800";
    case "vite":
      return "bg-violet-50 text-violet-700 border-violet-100";
    case "astro":
      return "bg-orange-50 text-orange-700 border-orange-100";
    case "svelte":
    case "sveltekit":
      return "bg-red-50 text-red-700 border-red-100";
    case "vue":
    case "nuxtjs":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "react":
      return "bg-cyan-50/50 text-cyan-700 border-cyan-100";
    case "angular":
      return "bg-rose-50 text-rose-700 border-rose-100";
    case "gatsby":
      return "bg-purple-50 text-purple-700 border-purple-100";
    default:
      return "bg-blue-50 text-blue-700 border-blue-100";
  }
}

function FrameworkIcon({ fw }: { fw: string | null }) {
  if (!fw) {
    return (
      <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    );
  }

  switch (fw) {
    case "nextjs":
      return (
        <svg className="h-3.5 w-3.5 text-white shrink-0" viewBox="0 0 75 75" fill="currentColor">
          <circle cx="37.5" cy="37.5" r="37.5" fill="black" />
          <path d="M57.06 60.12L32.22 28.18v25.29h-4.32V21.68h4.32l20.48 26.5V21.68h4.36v38.44z" fill="white" />
        </svg>
      );
    case "vite":
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 256 256" fill="none">
          <path d="M128 0L24 180h80L128 256l24-76h80L128 0z" fill="url(#vite-grad)" />
          <defs>
            <linearGradient id="vite-grad" x1="24" y1="0" x2="232" y2="256" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#41d1ff" />
              <stop offset="100%" stopColor="#bd34fe" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "astro":
      return (
        <svg className="h-3.5 w-3.5 text-orange-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h4.5l2-4.5h7l2 4.5H22L12 2zm-2.25 12L12 9.5l2.25 4.5h-4.5z" />
        </svg>
      );
    case "svelte":
    case "sveltekit":
      return (
        <svg className="h-3.5 w-3.5 text-orange-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.66 14.66c-.4.4-.92.6-1.66.6-.74 0-1.26-.2-1.66-.6l-.8-.8-.8.8c-.4.4-.92.6-1.66.6-.74 0-1.26-.2-1.66-.6l-.66-.66.66-.66c.4-.4.92-.6 1.66-.6.74 0 1.26.2 1.66.6l.8.8.8-.8c.4-.4.92-.6 1.66-.6.74 0 1.26.2 1.66.6l.66.66-.66.66zm.8-3.32c-.4-.4-.92-.6-1.66-.6-.74 0-1.26.2-1.66.6l-.8.8-.8-.8c-.4-.4-.92-.6-1.66-.6-.74 0-1.26.2-1.66.6l-.66.66.66.66c.4.4.92.6 1.66.6.74 0 1.26-.2 1.66-.6l.8-.8.8.8c.4.4.92.6 1.66.6.74 0 1.26-.2 1.66-.6l.66-.66-.66-.66z" />
        </svg>
      );
    case "vue":
    case "nuxtjs":
      return (
        <svg className="h-3.5 w-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 1.5L12 22.2 0 1.5h5.3l6.7 11.6 6.7-11.6z" />
          <path d="M18.7 1.5L12 13.1 5.3 1.5H0l12 20.7L24 1.5z" opacity=".5" />
        </svg>
      );
    case "react":
      return (
        <svg className="h-3.5 w-3.5 text-cyan-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg className="h-3.5 w-3.5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
  }
}

function statusColor(state: string | undefined): string {
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

  // Extract unique frameworks for Material chips
  const frameworks = Array.from(
    new Set(projects.map((p) => p.framework).filter(Boolean))
  ) as string[];

  // Filter projects by both search query and framework chip
  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesFramework = selectedFramework ? p.framework === selectedFramework : true;
    return matchesSearch && matchesFramework;
  });

  return (
    <div>
      {/* Search & Filter Control Panel */}
      <div className="mb-8 space-y-6">
        {/* M3 Pill-shaped Search Bar */}
        <div className="relative max-w-lg shadow-sm rounded-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-on-surface-variant/70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search deployed projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-outline bg-white py-3 pl-12 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-on-surface-variant hover:text-on-surface"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* M3 Framework Filter Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-on-surface-variant mr-1">
            Filter:
          </span>
          {/* "All" Chip */}
          <button
            onClick={() => setSelectedFramework(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold m3-transition flex items-center gap-1.5 ${
              selectedFramework === null
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-white text-on-surface border border-outline hover:bg-slate-50"
            }`}
          >
            {selectedFramework === null && (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
            All
          </button>
          {/* Dynamic Chips */}
          {frameworks.map((fw) => (
            <button
              key={fw}
              onClick={() => setSelectedFramework(fw)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold m3-transition flex items-center gap-1.5 ${
                selectedFramework === fw
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-white text-on-surface border border-outline hover:bg-slate-50"
              }`}
            >
              {selectedFramework === fw && (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {frameworkLabel(fw)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-outline max-w-sm mx-auto shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-on-surface-variant/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="mt-4 text-sm font-semibold text-on-surface">No projects match</h3>
          <p className="mt-1 text-xs text-on-surface-variant">Try adjusting your search query or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const state = project.targets?.production?.readyState;

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="m3-card-interactive block p-6 shadow-sm hover:shadow-md bg-white text-left cursor-pointer group"
              >
                {/* Name & Status */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                    {project.name}
                  </h2>
                  {state && (
                    <span
                      className={`shrink-0 border px-2.5 py-0.5 rounded-full text-2xs font-semibold uppercase tracking-wide ${statusColor(
                        state
                      )}`}
                    >
                      {state}
                    </span>
                  )}
                </div>

                {/* Resolved URL Link Preview */}
                <p className="mt-2 text-xs font-mono text-on-surface-variant/80 truncate">
                  {project.resolvedUrl}
                </p>

                {/* Badges / Repo */}
                <div className="mt-5 flex items-center justify-between gap-2 border-t border-outline/60 pt-4">
                  <div className="flex items-center gap-2 max-w-full truncate">
                    {/* Framework Badge with inline Icon */}
                    <span
                      className={`border px-2.5 py-1 rounded-lg text-2xs font-bold flex items-center gap-1.5 ${frameworkBadgeStyle(
                        project.framework
                      )}`}
                    >
                      <FrameworkIcon fw={project.framework} />
                      {frameworkLabel(project.framework)}
                    </span>

                    {/* Git repository link info */}
                    {project.link && (
                      <span className="flex items-center gap-1 text-2xs text-on-surface-variant font-medium truncate">
                        <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                          />
                        </svg>
                        <span className="truncate">{project.link.repo}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-outline/30 text-2xs text-on-surface-variant/75">
                  <span>Updated {timeAgo(project.updatedAt)}</span>
                  <a
                    href={`https://${project.resolvedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary/5 font-bold transition-all"
                  >
                    Visit Site
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
