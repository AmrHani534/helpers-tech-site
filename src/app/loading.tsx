export default function Loading() {
  return (
    <div className="container-app pt-40 pb-20">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-32 rounded bg-white/5" />
        <div className="h-12 w-3/4 rounded bg-white/5" />
        <div className="h-6 w-1/2 rounded bg-white/5" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
