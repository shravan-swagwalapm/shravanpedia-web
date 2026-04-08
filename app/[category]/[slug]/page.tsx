import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ReadingProgress from "@/components/ReadingProgress";
import Backlinks from "@/components/Backlinks";
import RelatedPills from "@/components/RelatedPills";
import {
  getAllArticles,
  getArticle,
  getBacklinks,
  getCategoryCounts,
} from "@/lib/wiki";
import { getCategoryMeta } from "@/lib/categories";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({
    category: a.categorySlug,
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticle(category, slug);
  if (!article) return { title: "Not Found" };

  return {
    title: `${article.frontmatter.title} - Shravanpedia`,
    description: article.summary || `Read about ${article.frontmatter.title}`,
    openGraph: {
      title: article.frontmatter.title,
      description: article.summary || `Read about ${article.frontmatter.title}`,
      type: "article",
    },
  };
}

function extractRelatedSlugs(content: string): string[] {
  const relatedSection = content.match(
    /## Related\s*\n([\s\S]*?)(?=\n## |\n---|\n$|$)/
  );
  if (!relatedSection) return [];

  const links: string[] = [];
  const wikiLinkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match: RegExpExecArray | null;
  while ((match = wikiLinkRegex.exec(relatedSection[1])) !== null) {
    links.push(match[1].trim().toLowerCase().replace(/\s+/g, "-"));
  }
  return links;
}

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const [article, allArticles, backlinksMap, categoryCounts] =
    await Promise.all([
      getArticle(category, slug),
      getAllArticles(),
      getBacklinks(),
      getCategoryCounts(),
    ]);

  if (!article) notFound();

  const meta = getCategoryMeta(article.frontmatter.category);
  const backlinks = backlinksMap.get(article.slug) ?? [];
  const relatedSlugs = extractRelatedSlugs(article.content);

  return (
    <>
      <Header />
      <ReadingProgress />
      <div className="flex flex-1">
        <Sidebar
          categoryCounts={categoryCounts}
          activePath={`/${category}/${slug}`}
          toc={article.headings}
        />
        <main
          id="main-content"
          className="flex-1 min-w-0 overflow-y-auto px-6 lg:px-10 py-8 max-w-3xl"
        >
          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: meta.bgColor, color: meta.color }}
            >
              {meta.name}
            </span>
            <span className="text-[var(--text-tertiary)]">
              {article.frontmatter.updated}
            </span>
            <span className="text-[var(--text-tertiary)]">
              {article.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
            {article.frontmatter.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <div className="mb-8 pl-4 border-l-2 border-gradient-to-b from-[var(--accent)] to-transparent">
              <p className="text-lg text-[var(--text-secondary)] font-[Newsreader,serif] italic leading-relaxed">
                {article.summary}
              </p>
            </div>
          )}

          {/* Article body */}
          <article
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-code:text-[13px] prose-code:font-[JetBrains_Mono,monospace]"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          {/* Backlinks */}
          <Backlinks backlinks={backlinks} />

          {/* Related */}
          <RelatedPills slugs={relatedSlugs} articles={allArticles} />
        </main>
      </div>
    </>
  );
}
