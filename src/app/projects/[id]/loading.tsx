export default function Loading() {
  return (
    <div className="govuk-width-container py-8">
      {/* GOV.UK Phase Banner */}
      <div className="govuk-phase-banner">
        <div className="govuk-phase-banner__content">
          <strong className="govuk-phase-banner__tag">BETA</strong>
          <span className="govuk-phase-banner__text text-govuk-secondary-text">
            This is a private administrative dashboard. Your feedback will help us improve it.
          </span>
        </div>
      </div>

      {/* GDS Back Link Skeleton */}
      <div className="h-6 w-36 bg-govuk-border/80 animate-pulse mb-8" />

      <div className="govuk-grid-row mb-8">
        <div className="govuk-grid-column-two-thirds space-y-4">
          <div className="h-9 w-64 bg-govuk-border animate-pulse" />
          <div className="h-4.5 w-80 bg-govuk-border/80 animate-pulse" />
        </div>
      </div>

      {/* Specifications box skeleton */}
      <div className="border-4 border-govuk-text bg-govuk-white p-6 mb-10 space-y-6">
        <div className="h-7 w-48 bg-govuk-border/80 animate-pulse pb-2" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex border-b border-govuk-border pb-4">
              <div className="h-5 w-32 bg-govuk-border/70 animate-pulse" />
              <div className="h-5 w-64 bg-govuk-border/50 animate-pulse ml-8" />
            </div>
          ))}
        </div>
        <div className="h-10 w-64 bg-govuk-border/60 animate-pulse mt-4" />
      </div>

      {/* Timeline skeleton (styled as a table rows skeleton) */}
      <div>
        <div className="h-7 w-48 bg-govuk-border/80 animate-pulse mb-4" />
        <table className="govuk-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">Deploy URL</th>
              <th scope="col" className="govuk-table__header">Target</th>
              <th scope="col" className="govuk-table__header">Commit / Ref</th>
              <th scope="col" className="govuk-table__header">Status</th>
              <th scope="col" className="govuk-table__header">Date & Time</th>
              <th scope="col" className="govuk-table__header">Action</th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className="govuk-table__row">
                <td className="govuk-table__cell">
                  <div className="h-4 w-40 bg-govuk-border/50 animate-pulse" />
                </td>
                <td className="govuk-table__cell">
                  <div className="h-4 w-12 bg-govuk-border/40 animate-pulse" />
                </td>
                <td className="govuk-table__cell">
                  <div className="space-y-1">
                    <div className="h-3.5 w-48 bg-govuk-border/40 animate-pulse" />
                    <div className="h-2.5 w-24 bg-govuk-border/30 animate-pulse" />
                  </div>
                </td>
                <td className="govuk-table__cell">
                  <div className="h-4.5 w-14 bg-govuk-border/50 animate-pulse" />
                </td>
                <td className="govuk-table__cell">
                  <div className="h-4 w-24 bg-govuk-border/30 animate-pulse" />
                </td>
                <td className="govuk-table__cell">
                  <div className="h-4 w-14 bg-govuk-border/50 animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
