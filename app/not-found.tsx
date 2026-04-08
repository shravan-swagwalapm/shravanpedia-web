import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[var(--text-tertiary)] mb-4">
          404
        </h1>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Article not found
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          This article doesn&apos;t exist or is private.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-hover)]"
        >
          <span aria-hidden="true">&larr;</span>
          Back to home
        </Link>
      </div>
    </div>
  );
}
