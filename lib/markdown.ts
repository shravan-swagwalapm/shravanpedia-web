import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";
import type { Heading } from "./types";

interface SlugInfo {
  title: string;
  categorySlug: string;
  visibility: string;
}

function remarkWikiLinks(slugMap: Map<string, SlugInfo>) {
  return () => (tree: any) => {
    visit(tree, "text", (node: any, index: number | undefined, parent: any) => {
      if (index === undefined || !parent) return;

      const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
      const value: string = node.value;
      if (!regex.test(value)) return;
      regex.lastIndex = 0;

      const children: any[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(value)) !== null) {
        if (match.index > lastIndex) {
          children.push({ type: "text", value: value.slice(lastIndex, match.index) });
        }

        const rawSlug = match[1].trim();
        const displayText = match[2]?.trim();
        const normalizedSlug = rawSlug.toLowerCase().replace(/\s+/g, "-");
        const info = slugMap.get(normalizedSlug);

        if (info && info.visibility === "public") {
          children.push({
            type: "html",
            value: `<a href="/${info.categorySlug}/${normalizedSlug}" class="wiki-link">${displayText ?? info.title}</a>`,
          });
        } else if (info && info.visibility === "private") {
          children.push({
            type: "html",
            value: `<span class="wiki-link-private" title="This article is private">${displayText ?? info.title}</span>`,
          });
        } else {
          children.push({
            type: "html",
            value: `<span class="wiki-link-missing" title="Article does not exist">${displayText ?? rawSlug}</span>`,
          });
        }

        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < value.length) {
        children.push({ type: "text", value: value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}

function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>(.*?)<\/h[23]>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const text = match[3]
      .replace(/<[^>]+>/g, "")
      .replace(/&#x26;/g, "&")
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .trim();
    headings.push({
      depth: parseInt(match[1]),
      id: match[2],
      text,
    });
  }

  return headings;
}

export async function renderMarkdown(
  content: string,
  slugMap: Map<string, SlugInfo>
): Promise<{ html: string; headings: Heading[] }> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkWikiLinks(slugMap))
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const html = String(result);
  const headings = extractHeadings(html);

  return { html, headings };
}
