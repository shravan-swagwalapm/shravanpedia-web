import Link from "next/link";

export default function Header() {
  return (
    <header className="wiki-header">
      <div className="wiki-header-inner">
        {/* Logo */}
        <Link href="/" className="wiki-logo">
          <div className="wiki-logo-icon">S</div>
          <div className="wiki-logo-text">
            <span className="wiki-logo-title">Shravanpedia</span>
            <span className="wiki-logo-subtitle">The personal encyclopedia</span>
          </div>
        </Link>

        {/* Search */}
        <div className="wiki-search">
          <button
            id="search-trigger"
            className="wiki-search-input"
            style={{ textAlign: "left", cursor: "text" }}
          >
            Search Shravanpedia
          </button>
          <button id="search-trigger-btn" className="wiki-search-btn">
            Search
          </button>
        </div>

        {/* Nav links */}
        <nav className="wiki-nav-links">
          <Link href="/">Main page</Link>
          <Link href="/category/learnings">Categories</Link>
          <Link href="/random">Random article</Link>
        </nav>
      </div>
    </header>
  );
}
