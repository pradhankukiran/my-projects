import type {
  VercelProject,
  VercelDeployment,
  VercelProjectsResponse,
  VercelDeploymentsResponse,
} from "./types";

const VERCEL_API = "https://api.vercel.com";

function getToken(): string {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) {
    throw new Error("VERCEL_API_TOKEN environment variable is not set");
  }
  return token;
}

async function vercelFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${VERCEL_API}${path}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Vercel API error ${res.status}: ${body}`);
  }

  return res.json();
}

export async function getProjects(): Promise<VercelProject[]> {
  const data = await vercelFetch<VercelProjectsResponse>(
    "/v9/projects?limit=100"
  );
  return data.projects;
}

export async function getProject(idOrName: string): Promise<VercelProject> {
  return vercelFetch<VercelProject>(`/v9/projects/${idOrName}`);
}

export async function getDeployments(
  projectId: string,
  limit = 20
): Promise<VercelDeployment[]> {
  const data = await vercelFetch<VercelDeploymentsResponse>(
    `/v6/deployments?projectId=${projectId}&limit=${limit}`
  );
  return data.deployments;
}
