import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import InfoPage, { InfoSection } from "./InfoPage";
import { books, bookMatchesSearch, fieldMatches, getAmazonUrl } from "../../data/bookstoresCatalog";
import { browseGroups, rareGroups } from "../../data/siteNavigation";

const ALL = "All Categories";
const categories = [ALL, ...new Set(books.map((book) => book.category))];

const inputClass =
  "w-full rounded bg-white border border-[#949494] px-3 py-2.5 text-[14px] text-[#1f1f1f] outline-none focus:border-[#8c2d19] focus:ring-2 focus:ring-[#8c2d19]/30";
const labelClass = "block text-[13px] font-semibold text-[#404040] mb-1.5 font-sans";

/**
 * Advanced Search over the Bookstores catalogue (src/data/bookstoresCatalog.js),
 * using the same matching rules as the Bookstores search. Filters live in the URL
 * (?q=&title=&author=&category=) so a search can be bookmarked or shared.
 */
export default function AdvancedSearch() {
  const [params, setParams] = useSearchParams();
  const filters = {
    q: params.get("q") ?? "",
    title: params.get("title") ?? "",
    author: params.get("author") ?? "",
    category: categories.includes(params.get("category")) ? params.get("category") : ALL,
  };
  const hasFilters = Boolean(filters.q.trim() || filters.title.trim() || filters.author.trim() || filters.category !== ALL);

  const setFilter = (name, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== ALL) next.set(name, value);
    else next.delete(name);
    setParams(next, { replace: true });
  };

  const results = useMemo(
    () =>
      books.filter(
        (book) =>
          (filters.category === ALL || book.category === filters.category) &&
          bookMatchesSearch(book, filters.q) &&
          fieldMatches([book.title, book.subtitle].filter(Boolean).join(" "), filters.title) &&
          fieldMatches(book.author, filters.author),
      ),
    [filters.q, filters.title, filters.author, filters.category],
  );

  return (
    <InfoPage
      wide
      eyebrow="Find a Volume"
      title="Advanced Search"
      intro={`Search the Bookstores catalogue of ${books.length} titles by keyword, title, author or category. Results update as you type.`}
    >
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="bg-[#f5f5f5] p-5 sm:p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div>
          <label htmlFor="as-q" className={labelClass}>Keyword</label>
          <input id="as-q" type="search" value={filters.q} onChange={(e) => setFilter("q", e.target.value)} placeholder="Any word" className={inputClass} />
        </div>
        <div>
          <label htmlFor="as-title" className={labelClass}>Title</label>
          <input id="as-title" type="search" value={filters.title} onChange={(e) => setFilter("title", e.target.value)} placeholder="e.g. Mansfield Park" className={inputClass} />
        </div>
        <div>
          <label htmlFor="as-author" className={labelClass}>Author</label>
          <input id="as-author" type="search" value={filters.author} onChange={(e) => setFilter("author", e.target.value)} placeholder="e.g. Jane Austen" className={inputClass} />
        </div>
        <div>
          <label htmlFor="as-category" className={labelClass}>Category</label>
          <select id="as-category" value={filters.category} onChange={(e) => setFilter("category", e.target.value)} className={inputClass}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          <p role="status" className="text-[13px] text-[#595959]">
            {results.length} {results.length === 1 ? "title" : "titles"} found
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#8c2d19] hover:text-[#6e2312] hover:underline underline-offset-2"
            >
              <RotateCcw size={14} />
              Clear filters
            </button>
          )}
        </div>
      </form>

      {results.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
          {results.map((book) => (
            <article key={`${book.asin}-${book.title}`} className="bg-[#ffffff] border border-[#e5e5e5] p-3 flex flex-col h-full">
              <div className="w-full h-60 bg-[#f5f5f5] p-2 flex items-center justify-center overflow-hidden">
                <img src={book.image} alt={`${book.title} book cover`} loading="lazy" className="w-full h-full object-contain" />
              </div>
              <div className="mt-3">
                <span className="inline-block text-[11px] font-semibold uppercase leading-snug text-[#8c2d19] tracking-wide">
                  {book.category}
                </span>
              </div>
              <div className="flex flex-col flex-1 mt-2">
                <h2 className="text-[17px] font-bold text-[#1f1f1f] leading-[1.35]">{book.title}</h2>
                {book.subtitle && <p className="text-[12px] text-[#595959] mt-1 leading-snug">{book.subtitle}</p>}
                {book.author && <p className="text-[13px] text-[#595959] italic mt-2 leading-snug">by {book.author}</p>}
                <div className="mt-auto pt-4">
                  <div className="border-t border-[#e5e5e5] pt-3">
                    <a
                      href={getAmazonUrl(book)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Find ${book.title} on Amazon`}
                      className="w-full rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold py-2.5 px-3 flex items-center justify-center gap-2 no-underline"
                    >
                      <span>View Book</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <InfoSection title="No Matching Titles">
          <p>
            No titles in the catalogue match these filters. Try fewer words, check the spelling, or clear the filters.
            You can also browse every category below.
          </p>
        </InfoSection>
      )}

      <section className="mt-10 border-t border-[#e5e5e5] pt-8">
        <h2 className="text-xl font-bold text-[#1f1f1f] mb-1">Browse by Category</h2>
        <p className="text-[13px] text-[#595959] mb-5">Each category page shows its own curated selection.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[13px]">
          {[...browseGroups, ...rareGroups].map((group) => (
            <div key={group.heading}>
              <h3 className="text-[14px] font-bold text-[#1f1f1f] mb-2">
                {group.heading}
              </h3>
              <div className="flex flex-col gap-1.5 text-[#404040]">
                {group.links.map((link) => (
                  <Link key={link.path} to={link.path} className="hover:text-[#8c2d19] hover:underline">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </InfoPage>
  );
}
