export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* M3 Header Skeleton */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-outline">
        <div className="max-w-2xl space-y-3 w-full">
          <div className="h-10 w-64 bg-slate-200 animate-pulse rounded-lg" />
          <div className="h-5 w-full bg-slate-200/70 animate-pulse rounded-lg max-w-xl" />
        </div>
      </div>

      {/* M3 Stats Skeleton Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-outline rounded-2xl p-6 shadow-sm flex items-center justify-between"
          >
            <div className="space-y-3 w-2/3">
              <div className="h-3 w-24 bg-slate-200 animate-pulse rounded" />
              <div className="h-8 w-12 bg-slate-200/80 animate-pulse rounded" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-slate-200 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Search Bar / Chips Skeleton */}
      <div className="mb-8 space-y-6">
        <div className="h-11 w-full max-w-lg bg-slate-200 animate-pulse rounded-full" />
        <div className="flex gap-2">
          <div className="h-7 w-12 bg-slate-200 animate-pulse rounded-full" />
          <div className="h-7 w-20 bg-slate-200 animate-pulse rounded-full" />
          <div className="h-7.5 w-16 bg-slate-200 animate-pulse rounded-full" />
        </div>
      </div>

      {/* Project Cards Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-outline rounded-2xl p-6 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-5 w-32 bg-slate-200 animate-pulse rounded" />
              <div className="h-5 w-14 bg-slate-200/80 animate-pulse rounded-full" />
            </div>
            <div className="h-4 w-48 bg-slate-200/60 animate-pulse rounded" />

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="h-6 w-16 bg-slate-200 animate-pulse rounded" />
              <div className="h-4 w-24 bg-slate-200/60 animate-pulse rounded" />
            </div>

            <div className="pt-3 border-t border-slate-100/50 flex justify-between items-center">
              <div className="h-3 w-20 bg-slate-200/40 animate-pulse rounded" />
              <div className="h-7.5 w-20 bg-slate-200 animate-pulse rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
