import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import { getSearchIndex } from "@/lib/wiki";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shravanpedia",
  description:
    "A personal wiki by Shravan Tickoo. Notes on people, projects, learnings, and ideas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchIndex = await getSearchIndex();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..800&family=Newsreader:ital,wght@1,400&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-[Inter,system-ui,sans-serif] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:rounded-md focus:bg-[var(--bg-surface)] focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>
        <ClientShell searchIndex={searchIndex}>{children}</ClientShell>
      </body>
    </html>
  );
}
