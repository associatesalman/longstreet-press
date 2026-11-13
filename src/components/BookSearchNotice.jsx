import { Link } from "react-router-dom";
import { Search } from "lucide-react";

/**
 * Status line shown on a category page reached from the homepage search
 * (?book=<title>): confirms the highlighted book, or explains that the title is
 * not in this category.
 */
export default function BookSearchNotice({ query, match }) {
  if (!query) return null;

  return (
    <div
      role="status"
      className="mb-5 px-4 py-3 bg-[#f5f5f5] text-[14px] text-[#404040] flex flex-wrap items-center gap-2"
    >
      <Search size={14} className="text-[#8c2d19] shrink-0" />
      {match ? (
        <span>
          Showing <strong className="text-[#8c2d19]">{match.title}</strong>, highlighted below.
        </span>
      ) : (
        <span>
          We couldn’t find <strong className="text-[#8c2d19]">“{query}”</strong> in this category. Browse the
          volumes below or try{" "}
          <Link to="/advanced-search" className="text-[#8c2d19] underline hover:text-[#6e2312]">
            Advanced Search
          </Link>
          .
        </span>
      )}
    </div>
  );
}
