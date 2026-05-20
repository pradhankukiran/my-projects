"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isMissingToken = error.message?.includes("VERCEL_API_TOKEN");

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      {isMissingToken ? (
        <div className="bg-white border border-outline rounded-2xl p-8 shadow-sm text-left">
          <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 mb-6">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Configuration Required</h2>
          <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
            Please create a <code className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800">.env.local</code> file in your project root containing your Vercel API token:
          </p>
          
          <pre className="mt-4 bg-slate-50 border border-outline rounded-xl p-4 text-xs font-mono text-on-surface-variant overflow-x-auto shadow-inner">
            VERCEL_API_TOKEN=your_token_here
          </pre>
          
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://vercel.com/account/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-hover font-bold text-sm shadow-2xs hover:shadow m3-transition"
            >
              Generate Token on Vercel ↗
            </a>
            <button
              onClick={() => window.location.reload()}
              className="text-center px-4 py-2.5 rounded-xl border border-outline bg-white hover:bg-slate-50 text-on-surface font-bold text-sm m3-transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-error-container text-on-error-container border border-red-200 rounded-2xl p-8 shadow-sm text-left">
          <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200 mb-6">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-900">Something went wrong</h2>
          <p className="mt-2 text-sm text-red-800 leading-relaxed">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full text-center px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 font-bold text-sm shadow-2xs transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
