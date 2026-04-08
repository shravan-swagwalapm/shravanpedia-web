import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import type { Article } from "@/lib/types";

export default function FeaturedArticle({ article }: { article: Article }) {
  const meta = getCategoryMeta(article.frontmatter.category);
  const initials = article.frontmatter.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <article
      className="group relative overflow-hidden rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] transition-shadow hover:shadow-lg"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{
          background: `linear-gradient(to bottom, ${meta.color}, var(--accent, #f59e0b))`,
        }}
      />
      <div className="p-6 pl-8">
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-semibold"
            style={{
              background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
            }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2"
              style={{ backgroundColor: meta.bgColor, color: meta.color }}
            >
              {meta.name}
            </span>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 leading-snug">
              {article.frontmatter.title}
            </h3>
            {article.summary && (
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-3">
                {article.summary}
              </p>
            )}
            <Link
              href={`/${article.categorySlug}/${article.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-[gap] hover:gap-3"
              style={{ color: meta.color }}
            >
              Read article
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
