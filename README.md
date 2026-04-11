<p align="center">
  <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
</p>

<h1 align="center">My Projects</h1>

<p align="center">
  A minimal, self-hosted portfolio dashboard that pulls your deployed projects directly from the Vercel API. Add your token, deploy, and share with recruiters.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Vercel_API-REST-000?style=flat-square&logo=vercel" alt="Vercel API" />
  <img src="https://img.shields.io/github/license/pradhankukiran/my-projects?style=flat-square" alt="License" />
</p>

---

## Features

- **Zero config** — add your Vercel token and deploy, that's it
- **Live data** — pulls projects, frameworks, deployment status, and production URLs directly from the Vercel API
- **Search** — instant client-side filtering across all projects
- **Deployment history** — drill into any project to see the full deployment timeline
- **Responsive** — works on desktop, tablet, and mobile
- **Server-rendered** — data fetched server-side so your API token is never exposed to the browser
- **Loading states** — skeleton UI while data streams in
- **Error handling** — clear setup instructions if the token is missing or invalid

## Quick Start

### 1. Clone

```bash
git clone https://github.com/pradhankukiran/my-projects.git
cd my-projects
npm install
```

### 2. Add your Vercel token

Generate a token at [vercel.com/account/tokens](https://vercel.com/account/tokens), then create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

```env
VERCEL_API_TOKEN=your_token_here
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpradhankukiran%2Fmy-projects&env=VERCEL_API_TOKEN&envDescription=Your%20Vercel%20API%20token%20from%20vercel.com%2Faccount%2Ftokens)

Or deploy manually:

```bash
npm i -g vercel
vercel
```

Add `VERCEL_API_TOKEN` as an environment variable in your Vercel project settings.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Shell with header navigation
│   ├── page.tsx                   # Projects dashboard (server component)
│   ├── loading.tsx                # Skeleton loading state
│   ├── error.tsx                  # Error boundary with setup instructions
│   └── projects/[id]/
│       ├── page.tsx               # Deployment history for a project
│       └── loading.tsx            # Skeleton loading state
├── components/
│   └── project-search.tsx         # Client-side search and project grid
└── lib/
    ├── types.ts                   # Vercel API TypeScript types
    └── vercel.ts                  # Server-side Vercel API client
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Data | [Vercel REST API](https://vercel.com/docs/rest-api) |
| Rendering | Server Components + Streaming |
| Hosting | [Vercel](https://vercel.com/) |

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /v9/projects` | List all projects |
| `GET /v9/projects/:id` | Single project details |
| `GET /v6/deployments` | Deployment history per project |

## License

MIT
