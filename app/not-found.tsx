import Header from "@/components/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="wiki-content" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <h1 className="wiki-article-title">Page not found</h1>
        <p className="wiki-article-tagline">
          From Shravanpedia, the personal encyclopedia
        </p>
        <hr className="wiki-hr" style={{ marginTop: "8px" }} />
        <p style={{ marginTop: "16px", fontSize: "14px" }}>
          The article you are looking for does not exist. It may have been moved
          or not yet written.
        </p>
        <p style={{ marginTop: "8px", fontSize: "14px" }}>
          <Link href="/">Return to the main page</Link>
        </p>
      </main>
    </>
  );
}
