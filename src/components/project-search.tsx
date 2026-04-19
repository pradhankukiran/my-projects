"use client";

import { useState } from "react";
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

function statusColor(state: string | undefined): string {
  switch (state) {
    case "READY":
      return "bg-green-50 text-green-700 border-green-200";
    case "ERROR":
      return "bg-red-50 text-red-700 border-red-200";
    case "BUILDING":
    case "INITIALIZING":
    case "QUEUED":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "CANCELED":
      return "bg-gray-50 text-gray-500 border-gray-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
}

function FaviconImage({ domain }: { domain: string }) {
  const [stage, setStage] = useState<"direct" | "google" | "hidden">("direct");

  if (stage === "hidden") {
    return <div className="h-4 w-4 shrink-0 rounded-sm bg-gray-100" />;
  }

  const src =
    stage === "direct"
      ? `https://${domain}/favicon.ico`
      : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={16}
      height={16}
      className="h-4 w-4 shrink-0 rounded-sm object-contain"
      referrerPolicy="no-referrer"
      onError={() => setStage(stage === "direct" ? "google" : "hidden")}
    />
  );
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

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-black focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const state = project.targets?.production?.readyState;

            return (
              <a
                key={project.id}
                href={`https://${project.resolvedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 p-5 transition-colors hover:border-gray-400"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FaviconImage domain={project.resolvedUrl} />
                    <h2 className="text-sm font-semibold text-black truncate">
                      {project.name}
                    </h2>
                  </div>
                  {state && (
                    <span
                      className={`shrink-0 border px-2 py-0.5 text-xs font-medium ${statusColor(state)}`}
                    >
                      {state}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-gray-500 truncate font-mono">
                  {project.resolvedUrl}
                </p>

                <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                  <span className="border border-gray-200 px-2 py-0.5">
                    {frameworkLabel(project.framework)}
                  </span>
                  {project.link && (
                    <span className="truncate">
                      {project.link.org}/{project.link.repo}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  Updated {timeAgo(project.updatedAt)}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
