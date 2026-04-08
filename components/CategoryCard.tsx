import Link from "next/link";
import type { CategoryMeta } from "@/lib/types";

export default function CategoryCard({
  meta,
  count,
}: {
  meta: CategoryMeta;
  count: number;
}) {
  return (
    <Link
      href={`/category/${meta.slug}`}
      className="group relative block rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
      style={{ backgroundColor: meta.bgColor }}
    >
      <div
        className="h-[3px] w-full"
        style={{ backgroundColor: meta.color }}
      />
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold" style={{ color: meta.color }}>
            {meta.name}
          </h3>
          <span
            className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full text-xs font-medium bg-white/60 dark:bg-black/20"
            style={{ color: meta.color }}
          >
            {count}
          </span>
        </div>
        {meta.description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
            {meta.description}
          </p>
        )}
      </div>
    </Link>
  );
}
