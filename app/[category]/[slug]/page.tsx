import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import fs from "fs";
import path from "path";
import {
  getAllArticles,
  getArticle,
  getBacklinks,
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

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const [article, allArticles, backlinksMap] = await Promise.all([
    getArticle(category, slug),
    getAllArticles(),
    getBacklinks(),
  ]);

  if (!article) notFound();

  const meta = getCategoryMeta(article.frontmatter.category);
  const backlinks = backlinksMap.get(article.slug) ?? [];
  const hasToC = article.headings.length >= 3;

  // Check for article photo in public/images/
  const photoExtensions = [".jpeg", ".jpg", ".png", ".webp"];
  let photoPath: string | null = null;
  for (const ext of photoExtensions) {
    const imgFile = path.join(process.cwd(), "public", "images", `${slug}${ext}`);
    if (fs.existsSync(imgFile)) {
      photoPath = `/images/${slug}${ext}`;
      break;
    }
  }

  // Build infobox: use custom infobox from frontmatter if available, else generic
  const infoboxRows: Array<{ label: string; value: string }> = [];
  if (article.frontmatter.infobox) {
    // Custom infobox — biographical/project-specific fields
    for (const [key, value] of Object.entries(article.frontmatter.infobox)) {
      if (value) infoboxRows.push({ label: key, value: String(value) });
    }
  } else {
    // Fallback: generic metadata
    if (article.frontmatter.category) {
      infoboxRows.push({ label: "Category", value: article.frontmatter.category });
    }
    if (article.frontmatter.created) {
      infoboxRows.push({ label: "Created", value: article.frontmatter.created });
    }
    if (article.frontmatter.updated) {
      infoboxRows.push({ label: "Updated", value: article.frontmatter.updated });
    }
    if (article.frontmatter.tags && article.frontmatter.tags.length > 0) {
      infoboxRows.push({ label: "Tags", value: article.frontmatter.tags.join(", ") });
    }
  }
  infoboxRows.push({ label: "Reading time", value: `${article.readingTime} min read` });
  if (backlinks.length > 0) {
    infoboxRows.push({ label: "Linked from", value: `${backlinks.length} article${backlinks.length !== 1 ? "s" : ""}` });
  }

  // Extract related articles
  const relatedSection = article.content.match(
    /## Related\s*\n([\s\S]*?)(?=\n## |\n---|\n$|$)/
  );
  const relatedSlugs: string[] = [];
  if (relatedSection) {
    const wikiLinkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
    let match: RegExpExecArray | null;
    while ((match = wikiLinkRegex.exec(relatedSection[1])) !== null) {
      relatedSlugs.push(match[1].trim().toLowerCase().replace(/\s+/g, "-"));
    }
  }
  const relatedArticles = relatedSlugs
    .map((s) => allArticles.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <>
      <Header />
      <main id="main-content" className="wiki-content" style={{ paddingBottom: "40px" }}>
        {/* Article title */}
        <h1 className="wiki-article-title">
          {article.frontmatter.title}
        </h1>

        {/* From Shravanpedia tagline */}
        <p className="wiki-article-tagline">
          From Shravanpedia, the personal encyclopedia
        </p>

        {/* Tabs */}
        <div className="wiki-tabs">
          <span className="wiki-tab wiki-tab-active">Article</span>
          <span className="wiki-tab" style={{ color: "var(--text-faint)" }}>
            {article.readingTime} min read
          </span>
          <div style={{ flex: 1 }} />
          <span className="wiki-tab" style={{ color: "var(--text-faint)", fontSize: "12px" }}>
            Updated {article.frontmatter.updated}
          </span>
        </div>

        {/* Infobox — floats right */}
        <div className="wiki-infobox">
          <div className="wiki-infobox-header">
            {article.frontmatter.title}
          </div>
          {photoPath && (
            <div style={{ textAlign: "center", padding: "8px 10px 4px", background: "var(--bg-box)" }}>
              <Image
                src={photoPath}
                alt={article.frontmatter.title}
                width={220}
                height={280}
                style={{ objectFit: "cover", margin: "0 auto" }}
                unoptimized
              />
              <div style={{ fontSize: "11px", color: "var(--text-faint)", marginTop: "4px", fontStyle: "italic" }}>
                {article.frontmatter.title}
              </div>
            </div>
          )}
          <div className="wiki-infobox-subheader" style={{ background: meta.bgColor }}>
            {meta.name}
          </div>
          {infoboxRows.map((row) => (
            <div key={row.label} className="wiki-infobox-row">
              <div className="wiki-infobox-label">{row.label}</div>
              <div className="wiki-infobox-value">{row.value}</div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {article.summary && (
          <p style={{ fontSize: "14px", marginTop: "12px", marginBottom: "4px" }}>
            <strong>{article.frontmatter.title}</strong> &ndash;{" "}
            <em>{article.summary}</em>
          </p>
        )}

        {/* Table of Contents */}
        {hasToC && (
          <div className="wiki-toc">
            <div className="wiki-toc-title">Contents</div>
            <ol>
              {article.headings
                .filter((h) => h.depth === 2)
                .map((h, i) => {
                  const subheadings = article.headings.filter(
                    (sh) =>
                      sh.depth === 3 &&
                      article.headings.indexOf(sh) > article.headings.indexOf(h) &&
                      (article.headings.findIndex(
                        (next) =>
                          next.depth === 2 &&
                          article.headings.indexOf(next) > article.headings.indexOf(h)
                      ) === -1 ||
                        article.headings.indexOf(sh) <
                          article.headings.findIndex(
                            (next) =>
                              next.depth === 2 &&
                              article.headings.indexOf(next) > article.headings.indexOf(h)
                          ))
                  );
                  return (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                      {subheadings.length > 0 && (
                        <ol>
                          {subheadings.map((sh) => (
                            <li key={sh.id}>
                              <a href={`#${sh.id}`}>{sh.text}</a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  );
                })}
            </ol>
          </div>
        )}

        {/* Article body */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {/* See also / Backlinks */}
        {backlinks.length > 0 && (
          <div className="wiki-see-also">
            <h2>Linked from</h2>
            <ul>
              {backlinks.map((bl) => (
                <li key={bl.slug}>
                  <Link href={`/${bl.categorySlug}/${bl.slug}`}>
                    {bl.title}
                  </Link>
                  {bl.context && (
                    <span style={{ color: "var(--text-light)", fontSize: "13px" }}>
                      {" "}&ndash; {bl.context}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="wiki-see-also">
            <h2>See also</h2>
            <ul>
              {relatedArticles.map((ra) => ra && (
                <li key={ra.slug}>
                  <Link href={`/${ra.categorySlug}/${ra.slug}`}>
                    {ra.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Categories box */}
        <div className="wiki-categories-box">
          <strong>Categories: </strong>
          <Link href={`/category/${article.categorySlug}`}>
            {article.frontmatter.category}
          </Link>
          {article.frontmatter.tags?.map((tag) => (
            <span key={tag} style={{ marginLeft: "4px" }}>
              | {tag}
            </span>
          ))}
        </div>
      </main>
    </>
  );
}
