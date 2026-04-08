import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b border-[var(--border)] bg-[var(--bg-surface)]/85 backdrop-blur-xl">
      <div className="flex w-full items-center gap-6 px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#1d4ed8] to-[#7c3aed] text-white text-sm font-bold">
            S
          </div>
          <span className="text-[15px] font-semibold text-[var(--text-primary)] hidden sm:block">
            Shravanpedia
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            Browse
          </Link>
          <Link
            href="/category"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            Categories
          </Link>
          <Link
            href="/random"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            Random
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search trigger */}
        <button
          id="search-trigger"
          className="flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 text-[13px] text-[var(--text-tertiary)] transition-colors hover:border-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-[var(--border)] bg-[var(--bg-surface)] px-1.5 py-0.5 text-[11px] font-mono text-[var(--text-tertiary)] sm:inline">
            &#8984;K
          </kbd>
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}
