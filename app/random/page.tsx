"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RandomPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((articles: Array<{ slug: string; categorySlug: string }>) => {
        if (articles.length === 0) {
          router.replace("/");
          return;
        }
        const random = articles[Math.floor(Math.random() * articles.length)];
        router.replace(`/${random.categorySlug}/${random.slug}`);
      })
      .catch(() => router.replace("/"));
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-[var(--text-tertiary)] animate-pulse">Picking a random article...</p>
    </div>
  );
}
