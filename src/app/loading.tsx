export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
      {/* Developer Profile Split Hero Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left biography skeleton */}
        <div className="lg:col-span-2 space-y-5 w-full">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-slate-200 animate-pulse shrink-0" />
            <div className="space-y-2 w-full">
              <div className="h-7 w-48 bg-slate-200 animate-pulse rounded-md" />
              <div className="h-4 w-36 bg-slate-200/80 animate-pulse rounded-md" />
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="h-4 w-full bg-slate-200/70 animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-slate-200/70 animate-pulse rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-24 bg-slate-200/50 animate-pulse rounded-full" />
            <div className="h-6 w-20 bg-slate-200/50 animate-pulse rounded-full" />
          </div>
        </div>

        {/* Right metrics card skeleton */}
        <div className="bg-white border border-outline rounded-2xl p-6 space-y-4 w-full shadow-2xs">
          <div className="h-4 w-28 bg-slate-200 animate-pulse rounded" />
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div className="h-3 w-20 bg-slate-100 animate-pulse rounded" />
              <div className="h-5 w-8 bg-slate-200 animate-pulse rounded" />
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div className="h-3 w-24 bg-slate-100 animate-pulse rounded" />
              <div className="h-5 w-6 bg-slate-200 animate-pulse rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-3 w-28 bg-slate-100 animate-pulse rounded" />
              <div className="h-5 w-6 bg-slate-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Main search and chips skeleton */}
      <div className="border-t border-slate-200/60 pt-10 space-y-6">
        <div className="h-11 w-full max-w-lg bg-slate-200 animate-pulse rounded-full" />
        <div className="flex gap-2">
          <div className="h-7.5 w-12 bg-slate-200 animate-pulse rounded-full" />
          <div className="h-7.5 w-20 bg-slate-200 animate-pulse rounded-full" />
          <div className="h-7.5 w-16 bg-slate-200 animate-pulse rounded-full" />
        </div>

        {/* Project grid skeleton */}
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
                <div className="h-6 w-20 bg-slate-200 animate-pulse rounded-md" />
                <div className="h-4 w-24 bg-slate-200/60 animate-pulse rounded" />
              </div>

              <div className="pt-3 border-t border-slate-100/50 flex justify-between items-center">
                <div className="h-3.5 w-20 bg-slate-200/40 animate-pulse rounded" />
                <div className="h-7.5 w-20 bg-slate-200 animate-pulse rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Global Recent Activity Skeleton */}
      <div className="border-t border-slate-200/60 pt-10 space-y-6">
        <div className="h-6 w-48 bg-slate-200 animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-outline rounded-xl p-4 shadow-3xs flex justify-between items-start gap-4"
            >
              <div className="space-y-2 w-2/3">
                <div className="flex gap-2">
                  <div className="h-4 w-24 bg-slate-200 animate-pulse rounded" />
                  <div className="h-4 w-10 bg-slate-100 animate-pulse rounded" />
                </div>
                <div className="h-3 w-40 bg-slate-200/50 animate-pulse rounded" />
                <div className="h-3 w-28 bg-slate-200/30 animate-pulse rounded" />
              </div>
              <div className="flex flex-col items-end shrink-0 space-y-2">
                <div className="h-3.5 w-12 bg-slate-200/40 animate-pulse rounded" />
                <div className="h-3.5 w-16 bg-slate-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
