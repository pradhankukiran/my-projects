export default function Loading() {
  return (
    <div className="govuk-width-container py-8">


      {/* Developer Profile Header Grid Skeleton */}
      <div className="govuk-grid-row border-b-4 border-govuk-text pb-6 mb-8">
        <div className="govuk-grid-column-two-thirds space-y-4">
          <div className="h-9 w-64 bg-govuk-border animate-pulse" />
          <div className="h-4.5 w-80 bg-govuk-border/80 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-govuk-border/50 animate-pulse" />
            <div className="h-4 w-5/6 bg-govuk-border/50 animate-pulse" />
          </div>
          <div className="h-10 w-44 bg-govuk-border/40 animate-pulse" />
        </div>
      </div>

      {/* Search Grid Skeleton */}
      <div className="govuk-grid-row mb-6">
        <div className="govuk-grid-column-two-thirds space-y-3">
          <div className="h-6 w-48 bg-govuk-border/80 animate-pulse" />
          <div className="h-10 w-full max-w-xl bg-govuk-border/50 animate-pulse" />
        </div>
        <div className="govuk-grid-column-one-third space-y-3">
          <div className="h-6 w-40 bg-govuk-border/80 animate-pulse" />
          <div className="h-10 w-full bg-govuk-border/50 animate-pulse" />
        </div>
      </div>

      <div className="mb-6 border-b-2 border-govuk-border pb-2">
        <div className="h-7 w-56 bg-govuk-border/80 animate-pulse" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="govuk-summary-card govuk-summary-card--building">
            <div className="govuk-summary-card__title-wrapper">
              <div className="h-5 w-32 bg-govuk-border/60 animate-pulse" />
              <div className="h-4.5 w-14 bg-govuk-border/50 animate-pulse" />
            </div>
            <div className="govuk-summary-card__content flex flex-col justify-between h-[180px] space-y-3">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-govuk-border/40 animate-pulse" />
                <div className="h-4 w-40 bg-govuk-border/50 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-govuk-border">
                <div className="space-y-1">
                  <div className="h-3 w-12 bg-govuk-border/40 animate-pulse" />
                  <div className="h-4 w-16 bg-govuk-border/50 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-12 bg-govuk-border/40 animate-pulse" />
                  <div className="h-4 w-16 bg-govuk-border/50 animate-pulse" />
                </div>
              </div>
              <div className="pt-2 border-t border-govuk-border flex justify-between items-center mt-auto">
                <div className="h-3.5 w-20 bg-govuk-border/30 animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-12 bg-govuk-border/40 animate-pulse" />
                  <div className="h-6 w-12 bg-govuk-border/40 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
