export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-100 animate-pulse" />
        <div className="mt-2 h-5 w-72 bg-gray-100 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-gray-200 p-5">
            <div className="h-5 w-32 bg-gray-100 animate-pulse" />
            <div className="mt-3 h-4 w-48 bg-gray-100 animate-pulse" />
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-16 bg-gray-100 animate-pulse" />
              <div className="h-6 w-20 bg-gray-100 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
