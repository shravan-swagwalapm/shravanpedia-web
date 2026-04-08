import Link from "next/link";
import Header from "@/components/Header";
import {
  getArticlesByCategory,
  getCategoryCounts,
} from "@/lib/wiki";
import { getCategoryMeta, CATEGORIES } from "@/lib/categories";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const counts = await getCategoryCounts();
  return counts.map(({ slug }) => ({ name: slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  const [articles, categoryCounts] = await Promise.all([
    getArticlesByCategory(name),
    getCategoryCounts(),
  ]);

  const meta = getCategoryMeta(name);
  const sorted = [...articles].sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );

  return (
    <>
      <Header />
      <main id="main-content" className="wiki-content" style={{ paddingBottom: "40px" }}>
        <h1 className="wiki-category-title">Category: {meta.name}</h1>
        <p className="wiki-category-desc">
          {meta.description}
        </p>

        <hr className="wiki-hr" />

        <p style={{
          fontSize: "13px",
          color: "var(--text-light)",
          marginTop: "12px",
          marginBottom: "16px",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
        }}>
          This category contains {articles.length} article{articles.length !== 1 ? "s" : ""}.
        </p>

        {sorted.length === 0 ? (
          <p style={{ color: "var(--text-faint)" }}>
            No public articles in this category yet.
          </p>
        ) : (
          <ul className="wiki-article-list">
            {sorted.map((article) => (
              <li key={article.slug}>
                <Link href={`/${article.categorySlug}/${article.slug}`}>
                  {article.frontmatter.title}
                </Link>
                {article.summary && (
                  <span className="article-meta">
                    &ndash; {article.summary}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Other categories */}
        <h2 style={{
          fontFamily: "'Linux Libertine', Georgia, serif",
          fontSize: "22px",
          fontWeight: 400,
          borderBottom: "1px solid var(--border-lighter)",
          paddingBottom: "4px",
          marginTop: "32px",
          marginBottom: "8px",
        }}>
          All categories
        </h2>
        <ul style={{ listStyle: "disc", paddingLeft: "24px", fontSize: "14px" }}>
          {categoryCounts.map(({ slug, count }) => {
            const catMeta = getCategoryMeta(slug);
            return (
              <li key={slug} style={{ padding: "2px 0" }}>
                <Link href={`/category/${slug}`}>
                  {catMeta.name}
                </Link>
                <span style={{
                  fontSize: "12px",
                  color: "var(--text-faint)",
                  marginLeft: "4px",
                  fontFamily: "-apple-system, sans-serif"
                }}>
                  ({count} article{count !== 1 ? "s" : ""})
                </span>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
