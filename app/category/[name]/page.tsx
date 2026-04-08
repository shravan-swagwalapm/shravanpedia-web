import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  getArticlesByCategory,
  getCategoryCounts,
} from "@/lib/wiki";
import { getCategoryMeta } from "@/lib/categories";

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
  const sorted = [...articles].sort(
    (a, b) =>
      new Date(b.frontmatter.updated).getTime() -
      new Date(a.frontmatter.updated).getTime()
  );

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar
          categoryCounts={categoryCounts}
          activePath={`/category/${name}`}
        />
        <main id="main-content" className="flex-1 min-w-0 overflow-y-auto px-6 lg:px-10 py-8">
          {/* Category header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                {meta.name}
              </h1>
              <span
                className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full text-xs font-medium"
                style={{ backgroundColor: meta.bgColor, color: meta.color }}
              >
                {articles.length}
              </span>
            </div>
            {meta.description && (
              <p className="text-sm text-[var(--text-secondary)] max-w-xl">
                {meta.description}
              </p>
            )}
          </div>

          {/* Article list */}
          {sorted.length === 0 ? (
            <p className="text-sm text-[var(--text-tertiary)]">
              No public articles in this category yet.
            </p>
          ) : (
            <div className="space-y-4">
              {sorted.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${article.categorySlug}/${article.slug}`}
                  className="block rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                    {article.frontmatter.title}
                  </h2>
                  {article.summary && (
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">
                      {article.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                    <span>{article.frontmatter.updated}</span>
                    <span>{article.readingTime} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
