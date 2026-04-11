export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="h-4 w-24 bg-gray-100 animate-pulse" />
      <div className="mt-6 mb-10">
        <div className="h-8 w-56 bg-gray-100 animate-pulse" />
        <div className="mt-2 h-4 w-72 bg-gray-100 animate-pulse" />
      </div>
      <div className="h-6 w-32 bg-gray-100 animate-pulse mb-4" />
      <div className="border border-gray-200">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-6 border-b border-gray-100 px-4 py-4 last:border-b-0"
          >
            <div className="h-4 w-16 bg-gray-100 animate-pulse" />
            <div className="h-4 w-48 bg-gray-100 animate-pulse" />
            <div className="h-4 w-20 bg-gray-100 animate-pulse hidden md:block" />
            <div className="h-4 w-24 bg-gray-100 animate-pulse hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
