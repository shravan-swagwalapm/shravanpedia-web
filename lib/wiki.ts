import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, ArticleFrontmatter, Backlink, SearchEntry } from "./types";
import { renderMarkdown } from "./markdown";

const VAULT_PATH =
  process.env.SHRAVANPEDIA_PATH ??
  path.join(/* turbopackIgnore: true */ process.env.HOME ?? "", "ProductBrain", "Shravanpedia");

const EXCLUDED_FILES = new Set(["SCHEMA.md", "index.md", "log.md"]);

function kebabToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function extractSummary(content: string): string {
  const match = content.match(/^>\s*(.+)$/m);
  return match ? match[1].trim() : "";
}

function readVaultFiles(): Array<{ relativePath: string; fullPath: string }> {
  if (!fs.existsSync(VAULT_PATH)) {
    throw new Error(
      `Vault not found at ${VAULT_PATH}. Set SHRAVANPEDIA_PATH env var.`
    );
  }

  const files: Array<{ relativePath: string; fullPath: string }> = [];

  function walk(dir: string, prefix: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = path.join(dir, entry.name);
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        walk(full, rel);
      } else if (
        entry.name.endsWith(".md") &&
        !EXCLUDED_FILES.has(entry.name)
      ) {
        files.push({ relativePath: rel, fullPath: full });
      }
    }
  }

  walk(VAULT_PATH, "");
  return files;
}

let _articlesCache: Article[] | null = null;
let _backlinksCache: Map<string, Backlink[]> | null = null;

export async function getAllArticles(): Promise<Article[]> {
  if (_articlesCache) return _articlesCache;

  const files = readVaultFiles();

  // Build slug map for wiki-link resolution (includes private articles)
  const slugMap = new Map<
    string,
    { title: string; categorySlug: string; visibility: string }
  >();
  const publicParsed: Array<{
    frontmatter: ArticleFrontmatter;
    content: string;
    slug: string;
    categorySlug: string;
    filePath: string;
  }> = [];

  for (const file of files) {
    const raw = fs.readFileSync(file.fullPath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as Partial<ArticleFrontmatter>;
    const fileName = path.basename(file.relativePath, ".md");
    const parts = file.relativePath.split("/");
    const categoryDir = parts.length > 1 ? parts[0] : "Uncategorized";
    const categorySlug = (fm.category ?? categoryDir).toLowerCase();

    slugMap.set(fileName, {
      title: fm.title ?? kebabToTitle(fileName),
      categorySlug,
      visibility: fm.visibility ?? "private",
    });

    if (fm.visibility === "public") {
      const stat = fs.statSync(file.fullPath);
      publicParsed.push({
        frontmatter: {
          title: fm.title ?? kebabToTitle(fileName),
          category: fm.category ?? categoryDir,
          created: fm.created
            ? String(fm.created)
            : stat.birthtime.toISOString().slice(0, 10),
          updated: fm.updated
            ? String(fm.updated)
            : stat.mtime.toISOString().slice(0, 10),
          source: fm.source,
          tags: fm.tags ?? [],
          visibility: "public",
          featured: fm.featured,
        },
        content,
        slug: fileName,
        categorySlug,
        filePath: file.relativePath,
      });
    }
  }

  // Render all public articles
  const articles: Article[] = [];
  for (const item of publicParsed) {
    const { html, headings } = await renderMarkdown(item.content, slugMap);
    const summary = extractSummary(item.content);
    const wordCount = item.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    articles.push({
      slug: item.slug,
      frontmatter: item.frontmatter,
      content: item.content,
      html,
      headings,
      readingTime,
      summary,
      filePath: item.filePath,
      categorySlug: item.categorySlug,
    });
  }

  articles.sort(
    (a, b) =>
      new Date(b.frontmatter.updated).getTime() -
      new Date(a.frontmatter.updated).getTime()
  );

  _articlesCache = articles;
  return articles;
}

export async function getBacklinks(): Promise<Map<string, Backlink[]>> {
  if (_backlinksCache) return _backlinksCache;

  const articles = await getAllArticles();
  const backlinks = new Map<string, Backlink[]>();
  const wikiLinkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;

  for (const article of articles) {
    let match: RegExpExecArray | null;
    const seen = new Set<string>();

    while ((match = wikiLinkRegex.exec(article.content)) !== null) {
      const targetSlug = match[1].trim().toLowerCase().replace(/\s+/g, "-");
      if (seen.has(targetSlug) || targetSlug === article.slug) continue;
      seen.add(targetSlug);

      const lineStart = article.content.lastIndexOf("\n", match.index) + 1;
      const lineEnd = article.content.indexOf("\n", match.index);
      const line = article.content
        .slice(lineStart, lineEnd === -1 ? undefined : lineEnd)
        .replace(
          /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
          (_, slug, display) => display ?? slug
        )
        .replace(/[#*>-]/g, "")
        .trim();
      const context = line.length > 120 ? line.slice(0, 117) + "..." : line;

      if (!backlinks.has(targetSlug)) backlinks.set(targetSlug, []);
      backlinks.get(targetSlug)!.push({
        slug: article.slug,
        title: article.frontmatter.title,
        category: article.frontmatter.category,
        categorySlug: article.categorySlug,
        context,
      });
    }
  }

  _backlinksCache = backlinks;
  return backlinks;
}

export async function getArticle(
  categorySlug: string,
  slug: string
): Promise<Article | null> {
  const articles = await getAllArticles();
  return (
    articles.find(
      (a) => a.categorySlug === categorySlug && a.slug === slug
    ) ?? null
  );
}

export async function getArticlesByCategory(
  categorySlug: string
): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export async function getCategoryCounts(): Promise<
  Array<{ slug: string; count: number }>
> {
  const articles = await getAllArticles();
  const counts = new Map<string, number>();
  for (const a of articles) {
    counts.set(a.categorySlug, (counts.get(a.categorySlug) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find((a) => a.frontmatter.featured) ?? articles[0] ?? null;
}

export async function getSearchIndex(): Promise<SearchEntry[]> {
  const articles = await getAllArticles();
  return articles.map((a) => ({
    slug: a.slug,
    categorySlug: a.categorySlug,
    title: a.frontmatter.title,
    summary: a.summary,
    body: a.content.slice(0, 500),
    tags: a.frontmatter.tags ?? [],
    category: a.frontmatter.category,
  }));
}
