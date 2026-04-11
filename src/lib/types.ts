export interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  latestDeployments?: VercelDeployment[];
  targets?: {
    production?: {
      id: string;
      url: string;
      alias?: string[];
      readyState: DeploymentState;
      createdAt: number;
    };
  };
  link?: {
    type: string;
    repo: string;
    org: string;
    repoId: number;
  };
  createdAt: number;
  updatedAt: number;
}

export type DeploymentState =
  | "BUILDING"
  | "ERROR"
  | "INITIALIZING"
  | "QUEUED"
  | "READY"
  | "CANCELED";

export interface VercelDeployment {
  uid: string;
  name: string;
  url: string;
  created: number;
  state: DeploymentState;
  meta?: {
    githubCommitMessage?: string;
    githubCommitRef?: string;
    githubCommitSha?: string;
  };
  target: "production" | "preview" | null;
  inspectorUrl: string;
  creator?: {
    username: string;
  };
}

export interface VercelDomain {
  name: string;
  redirect: string | null;
  redirectStatusCode: number | null;
}

export interface VercelDomainsResponse {
  domains: VercelDomain[];
}

export interface VercelProjectsResponse {
  projects: VercelProject[];
  pagination: {
    count: number;
    next: number | null;
    prev: number | null;
  };
}

export interface VercelDeploymentsResponse {
  deployments: VercelDeployment[];
  pagination: {
    count: number;
    next: number | null;
    prev: number | null;
  };
}
