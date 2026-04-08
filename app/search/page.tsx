import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getAllArticles, getCategoryCounts } from "@/lib/wiki";
import { getCategoryMeta } from "@/lib/categories";

export default async function SearchPage() {
  const [articles, categoryCounts] = await Promise.all([
    getAllArticles(),
    getCategoryCounts(),
  ]);

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar categoryCounts={categoryCounts} activePath="/category" />
        <main id="main-content" className="flex-1 min-w-0 overflow-y-auto px-6 lg:px-10 py-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            All Articles
          </h1>

          {articles.length === 0 ? (
            <p className="text-sm text-[var(--text-tertiary)]">
              No public articles yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {articles.map((article) => {
                const meta = getCategoryMeta(article.frontmatter.category);
                return (
                  <li
                    key={article.slug}
                    className="flex items-center gap-3 py-2 border-b border-[var(--border)] last:border-0"
                  >
                    <span
                      className="flex-shrink-0 w-2 h-2 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    <Link
                      href={`/${article.categorySlug}/${article.slug}`}
                      className="flex-1 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors truncate"
                    >
                      {article.frontmatter.title}
                    </Link>
                    <span
                      className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium"
                      style={{
                        backgroundColor: meta.bgColor,
                        color: meta.color,
                      }}
                    >
                      {meta.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}
