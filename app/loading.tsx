export default function Loading() {
  return (
    <div className="container-x py-24" role="status" aria-label="Loading">
      <div className="h-10 w-2/3 animate-pulse rounded-xl bg-surface" />
      <div className="mt-6 h-5 w-1/2 animate-pulse rounded-lg bg-surface" />
      <div className="mt-12 grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-48 animate-pulse rounded-2xl bg-surface" />)}</div>
    </div>
  );
}
