import Header from "@/components/Header";
import Link from "next/link";
import {
  getAllArticles,
  getCategoryCounts,
  getFeaturedArticle,
  getSearchIndex,
} from "@/lib/wiki";
import { getCategoryMeta } from "@/lib/categories";
import fs from "fs";
import path from "path";

export default async function Home() {
  const [articles, categoryCounts, featured, searchIndex] = await Promise.all([
    getAllArticles(),
    getCategoryCounts(),
    getFeaturedArticle(),
    getSearchIndex(),
  ]);

  // Write search index for client-side search
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(
    path.join(publicDir, "search-index.json"),
    JSON.stringify(searchIndex)
  );

  const recentArticles = articles.slice(0, 8);

  // Group articles by category for portal boxes
  const articlesByCategory = new Map<string, typeof articles>();
  for (const a of articles) {
    const existing = articlesByCategory.get(a.categorySlug) ?? [];
    existing.push(a);
    articlesByCategory.set(a.categorySlug, existing);
  }

  return (
    <>
      <Header />
      <main id="main-content" className="wiki-content">
        {/* Portal banner */}
        <div className="wiki-portal-banner">
          <h1 className="wiki-portal-title">
            Welcome to Shravanpedia
          </h1>
          <p className="wiki-portal-subtitle">
            A personal encyclopedia by Shravan Tickoo
          </p>
          <p className="wiki-portal-stats">
            {articles.length} articles across {categoryCounts.length} categories
          </p>
        </div>

        <hr className="wiki-hr" />

        {/* Featured article */}
        {featured && (
          <div className="wiki-featured" style={{ margin: "16px 0" }}>
            <div className="wiki-featured-header">
              Featured article
            </div>
            <div className="wiki-featured-body">
              <p>
                <strong>
                  <Link href={`/${featured.categorySlug}/${featured.slug}`}>
                    {featured.frontmatter.title}
                  </Link>
                </strong>
                {featured.summary && (
                  <> &ndash; <em>{featured.summary}</em></>
                )}
              </p>
              <p style={{ fontSize: "13px", marginTop: "8px" }}>
                <Link href={`/${featured.categorySlug}/${featured.slug}`}>
                  Read full article &rarr;
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Portal grid — category boxes */}
        <div className="wiki-portal-grid">
          {categoryCounts.map(({ slug, count }) => {
            const meta = getCategoryMeta(slug);
            const catArticles = articlesByCategory.get(slug) ?? [];
            return (
              <div key={slug} className="wiki-portal-box">
                <div className="wiki-portal-box-header">
                  <Link
                    href={`/category/${slug}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {meta.name}
                  </Link>
                  {" "}
                  <span style={{ fontSize: "12px", fontWeight: 400, color: "var(--text-light)" }}>
                    ({count})
                  </span>
                </div>
                <div className="wiki-portal-box-body">
                  <ul>
                    {catArticles.slice(0, 5).map((a) => (
                      <li key={a.slug}>
                        <Link href={`/${a.categorySlug}/${a.slug}`}>
                          {a.frontmatter.title}
                        </Link>
                        {a.summary && (
                          <span>
                            {" "}&ndash; {a.summary.length > 80 ? a.summary.slice(0, 80) + "..." : a.summary}
                          </span>
                        )}
                      </li>
                    ))}
                    {catArticles.length > 5 && (
                      <li style={{ fontStyle: "italic" }}>
                        <Link href={`/category/${slug}`}>
                          ... and {catArticles.length - 5} more
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recently updated */}
        <div style={{ marginTop: "24px", marginBottom: "32px" }}>
          <h2 style={{
            fontFamily: "'Linux Libertine', Georgia, serif",
            fontSize: "22px",
            fontWeight: 400,
            borderBottom: "1px solid var(--border-lighter)",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}>
            Recently updated
          </h2>
          <ul style={{ listStyle: "disc", paddingLeft: "24px", fontSize: "14px" }}>
            {recentArticles.map((a) => (
              <li key={a.slug} style={{ padding: "2px 0" }}>
                <Link href={`/${a.categorySlug}/${a.slug}`}>
                  {a.frontmatter.title}
                </Link>
                <span style={{
                  fontSize: "12px",
                  color: "var(--text-faint)",
                  marginLeft: "6px",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  ({a.frontmatter.updated})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
