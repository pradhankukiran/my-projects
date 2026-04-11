"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isMissingToken = error.message?.includes("VERCEL_API_TOKEN");

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {isMissingToken ? (
        <div className="border border-gray-200 p-8 max-w-lg">
          <h2 className="text-lg font-semibold">Setup Required</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create a <code className="bg-gray-100 px-1 py-0.5 text-xs font-mono">.env.local</code> file
            in the project root with your Vercel API token:
          </p>
          <pre className="mt-4 bg-gray-50 border border-gray-200 p-4 text-sm font-mono text-gray-800">
            VERCEL_API_TOKEN=your_token_here
          </pre>
          <p className="mt-4 text-xs text-gray-500">
            Generate a token at vercel.com/account/tokens
          </p>
        </div>
      ) : (
        <div className="border border-red-200 bg-red-50 p-8 max-w-lg">
          <h2 className="text-lg font-semibold text-red-800">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-red-700">{error.message}</p>
        </div>
      )}
    </div>
  );
}
