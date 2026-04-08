import { CategoryMeta } from "./types";

export const CATEGORIES: Record<string, CategoryMeta> = {
  people: {
    name: "People",
    slug: "people",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    description:
      "Friends, collaborators, mentors, and the personal stories that shaped a builder",
  },
  projects: {
    name: "Projects",
    slug: "projects",
    color: "#059669",
    bgColor: "#ecfdf5",
    description:
      "What Shravan builds and why each one matters beyond the code",
  },
  learnings: {
    name: "Learnings",
    slug: "learnings",
    color: "#b45309",
    bgColor: "#fffbeb",
    description:
      "Principles, frameworks, and hard-won lessons from 10+ years of building",
  },
  inspirations: {
    name: "Inspirations",
    slug: "inspirations",
    color: "#be123c",
    bgColor: "#fff1f2",
    description:
      "The spiritual foundations and creative sparks behind everything",
  },
  ideas: {
    name: "Ideas",
    slug: "ideas",
    color: "#1d4ed8",
    bgColor: "#eef2ff",
    description:
      "Startup concepts, strategic frameworks, and the content flywheel",
  },
  interests: {
    name: "Interests",
    slug: "interests",
    color: "#0e7490",
    bgColor: "#ecfeff",
    description:
      "Teaching, books, investing, and the India tech ecosystem",
  },
  places: {
    name: "Places",
    slug: "places",
    color: "#4d7c0f",
    bgColor: "#f7fee7",
    description: "Cities, venues, travels, and cultural context",
  },
};

export function getCategoryMeta(category: string): CategoryMeta {
  const slug = category.toLowerCase();
  return (
    CATEGORIES[slug] ?? {
      name: category,
      slug,
      color: "#6b7280",
      bgColor: "#f9fafb",
      description: "",
    }
  );
}
