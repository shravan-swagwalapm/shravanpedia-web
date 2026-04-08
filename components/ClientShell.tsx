"use client";

import { useState, useEffect, useCallback } from "react";
import type { SearchEntry } from "@/lib/types";
import SearchModal from "./SearchModal";

interface ClientShellProps {
  children: React.ReactNode;
  searchIndex: SearchEntry[];
}

export default function ClientShell({
  children,
  searchIndex,
}: ClientShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClick() {
      setSearchOpen(true);
    }

    const trigger = document.getElementById("search-trigger");
    const triggerBtn = document.getElementById("search-trigger-btn");

    trigger?.addEventListener("click", handleClick);
    triggerBtn?.addEventListener("click", handleClick);

    return () => {
      trigger?.removeEventListener("click", handleClick);
      triggerBtn?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {children}
      <SearchModal
        isOpen={searchOpen}
        onClose={closeSearch}
        searchIndex={searchIndex}
      />
    </>
  );
}
