"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isMissingToken = error.message?.includes("VERCEL_API_TOKEN");

  return (
    <div className="govuk-width-container py-12">
      {isMissingToken ? (
        <div className="border-4 border-govuk-text bg-govuk-white p-6 max-w-xl mx-auto">
          <div className="border-l-4 border-govuk-red pl-4 mb-6">
            <h2 className="govuk-heading-l text-govuk-red mb-2">Configuration Required</h2>
            <p className="govuk-body-s text-govuk-secondary-text">
              The application lacks credentials to connect with the Vercel REST API.
            </p>
          </div>
          
          <p className="govuk-body">
            Please create a <code className="font-mono text-xs font-bold bg-govuk-bg border border-govuk-border px-1">.env.local</code> file in your project root folder and specify your Vercel API authorization token:
          </p>
          
          <pre className="bg-govuk-bg border border-govuk-border p-4 font-mono text-xs mb-6 select-all">
            VERCEL_API_TOKEN=your_token_here
          </pre>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://vercel.com/account/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="govuk-button"
            >
              Generate Token on Vercel ↗
            </a>
            <button
              onClick={() => window.location.reload()}
              className="govuk-button govuk-button--secondary"
            >
              Reload Page
            </button>
          </div>
        </div>
      ) : (
        <div className="border-4 border-govuk-red bg-govuk-white p-6 max-w-xl mx-auto">
          <h2 className="govuk-heading-l text-govuk-red mb-4">There is a problem</h2>
          <p className="govuk-body">
            The system encountered an error loading the administrative console.
          </p>
          <div className="bg-govuk-bg border-l-4 border-govuk-red p-3 mb-6 font-mono text-xs break-all">
            {error.message || "An unexpected error occurred."}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="govuk-button govuk-button--warning"
          >
            Retry Connection
          </button>
        </div>
      )}
    </div>
  );
}
