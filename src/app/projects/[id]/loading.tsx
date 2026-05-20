export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Back Button Skeleton */}
      <div className="h-9 w-36 bg-slate-200 animate-pulse rounded-full mb-8" />

      {/* Project Meta Card Skeleton */}
      <div className="bg-white border border-outline rounded-2xl p-6 md:p-8 shadow-sm mb-10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-3 w-full md:w-2/3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-52 bg-slate-200 animate-pulse rounded-md" />
              <div className="h-6 w-16 bg-slate-200 animate-pulse rounded-full" />
            </div>
            <div className="h-4 w-64 bg-slate-200/60 animate-pulse rounded" />
            <div className="h-4 w-48 bg-slate-200/50 animate-pulse rounded" />
          </div>
          <div className="h-11 w-full md:w-36 bg-slate-200 animate-pulse rounded-xl self-start md:self-center shrink-0" />
        </div>
      </div>

      {/* Timeline Skeleton */}
      <div>
        <div className="h-6 w-44 bg-slate-200 animate-pulse rounded mb-6" />

        <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative">
              {/* Timeline dot placeholder */}
              <div className="absolute -left-[41px] top-4 h-6 w-6 rounded-full border-4 border-background bg-slate-100 flex items-center justify-center" />

              {/* Card placeholder */}
              <div className="bg-white border border-outline rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2 w-full md:w-1/2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-40 bg-slate-200 animate-pulse rounded" />
                      <div className="h-4 w-12 bg-slate-200 animate-pulse rounded-full" />
                    </div>
                    <div className="h-3 w-60 bg-slate-200/60 animate-pulse rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-slate-200 animate-pulse rounded" />
                    <div className="h-5 w-20 bg-slate-200/60 animate-pulse rounded" />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="h-3.5 w-24 bg-slate-200/40 animate-pulse rounded" />
                  <div className="h-3.5 w-20 bg-slate-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
