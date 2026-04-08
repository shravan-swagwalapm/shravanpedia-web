import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import { getSearchIndex } from "@/lib/wiki";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shravanpedia",
  description:
    "A personal encyclopedia by Shravan Tickoo — people, projects, learnings, and ideas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchIndex = await getSearchIndex();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow"
        >
          Skip to content
        </a>
        <ClientShell searchIndex={searchIndex}>{children}</ClientShell>
      </body>
    </html>
  );
}
