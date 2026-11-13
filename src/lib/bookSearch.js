import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/** Case-, accent- and punctuation-insensitive text for comparing titles. */
export const normalizeTitle = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * Finds the book whose title matches `query`: an exact match first, then a title
 * that extends the query with a subtitle (or vice versa), e.g. "Vesta and Her
 * Children" vs "Vesta and Her Children: A Tale of the Fall of Rome".
 */
export function findBookByTitle(books, query) {
  const q = normalizeTitle(query);
  if (!q) return null;
  return (
    books.find((book) => normalizeTitle(book.title) === q) ??
    books.find((book) => {
      const title = normalizeTitle(book.title);
      return title.startsWith(`${q} `) || q.startsWith(`${title} `);
    }) ??
    null
  );
}

/** DOM id of a book card, used for scrolling to it. */
export const bookAnchorId = (book) => `book-${book.id}`;

/**
 * Reads ?book=<title> (set by the homepage search), finds that book in this
 * page's collection and scrolls it into view. Returns the query and the match
 * (null when the title is not on this page).
 */
export function useBookHighlight(books) {
  const [params] = useSearchParams();
  const query = (params.get("book") ?? "").trim();
  const match = query ? findBookByTitle(books, query) : null;
  const matchId = match ? bookAnchorId(match) : null;

  useEffect(() => {
    if (!matchId) return undefined;
    // Run after the route-change scroll-to-top in Footer has happened.
    const timer = setTimeout(() => {
      document.getElementById(matchId)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    return () => clearTimeout(timer);
  }, [matchId, query]);

  return { query, match };
}

/** Extra classes for the highlighted card. */
export const highlightClass = " ring-2 ring-[#8c2d19] ring-offset-2 ring-offset-white";
