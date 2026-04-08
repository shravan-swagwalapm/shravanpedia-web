import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FeaturedArticle from "@/components/FeaturedArticle";
import RecentlyUpdated from "@/components/RecentlyUpdated";
import CategoryCard from "@/components/CategoryCard";
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

  // Write search index for client-side search and /random
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(
    path.join(publicDir, "search-index.json"),
    JSON.stringify(searchIndex)
  );

  const recentArticles = articles.slice(0, 8);

  if (articles.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-1">
          <Sidebar categoryCounts={categoryCounts} activePath="/" />
          <main
            id="main-content"
            className="flex-1 flex items-center justify-center p-8"
          >
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                No articles yet
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Add markdown files to your Shravanpedia vault with{" "}
                <code className="px-1.5 py-0.5 rounded bg-[var(--bg-hover)] text-xs font-mono">
                  visibility: public
                </code>{" "}
                to get started.
              </p>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar categoryCounts={categoryCounts} activePath="/" />
        <main id="main-content" className="flex-1 min-w-0 overflow-y-auto">
          {/* Hero */}
          <section className="px-6 lg:px-10 pt-10 pb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#1d4ed8] to-[#7c3aed] bg-clip-text text-transparent mb-2">
              Welcome to Shravanpedia
            </h1>
            <p className="text-lg text-[var(--text-secondary)] font-[Newsreader,serif] italic mb-5">
              A personal wiki of people, projects, learnings, and ideas
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                {articles.length} article{articles.length !== 1 ? "s" : ""}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                {categoryCounts.length} categor
                {categoryCounts.length !== 1 ? "ies" : "y"}
              </span>
            </div>
          </section>

          {/* Featured + Recent */}
          <section className="px-6 lg:px-10 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
                    Featured
                  </h2>
                  <FeaturedArticle article={featured} />
                </div>
              )}
              {recentArticles.length > 0 && (
                <div>
                  <RecentlyUpdated articles={recentArticles} />
                </div>
              )}
            </div>
          </section>

          {/* Divider */}
          <div className="mx-6 lg:mx-10 border-t border-[var(--border)]" />

          {/* Category Cards */}
          <section className="px-6 lg:px-10 py-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
              Explore by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryCounts.map(({ slug, count }) => (
                <CategoryCard
                  key={slug}
                  meta={getCategoryMeta(slug)}
                  count={count}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
