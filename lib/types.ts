export interface ArticleFrontmatter {
  title: string;
  category: string;
  created: string;
  updated: string;
  source?: string;
  tags?: string[];
  visibility?: "public" | "private";
  featured?: boolean;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  html: string;
  headings: Heading[];
  readingTime: number;
  summary: string;
  filePath: string;
  categorySlug: string;
}

export interface Heading {
  depth: number;
  text: string;
  id: string;
}

export interface Backlink {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  context: string;
}

export interface CategoryMeta {
  name: string;
  slug: string;
  color: string;
  bgColor: string;
  description: string;
}

export interface SearchEntry {
  slug: string;
  categorySlug: string;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  category: string;
}
