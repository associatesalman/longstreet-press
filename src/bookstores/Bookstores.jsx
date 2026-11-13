
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import { books, getAmazonUrl, bookMatchesSearch } from "../data/bookstoresCatalog";

// =====================================================
// BOOK IMAGE
// =====================================================

function BookImage({ book, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`bg-[#f5f5f5] flex items-center justify-center overflow-hidden ${className}`}
    >
      {!failed ? (
        <img
          src={book.image}
          alt={`${book.title} book cover`}
          loading="lazy"
          className="w-full h-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-[#595959] p-4 text-center">
          <BookOpen size={30} />
          <span className="text-xs">
            Cover unavailable
          </span>
        </div>
      )}
    </div>
  );
}

// =====================================================
// BOOK CARD COMPONENT
// =====================================================

function BookCard({ book, onView }) {
  return (
    <article className="bg-[#ffffff] border border-[#e5e5e5] p-4 flex flex-col h-full min-w-0">

      {/* COVER */}

      <div className="h-64 p-2 bg-[#f5f5f5]">
        <BookImage
          book={book}
          className="w-full h-full"
        />
      </div>

      {/* CATEGORY */}

      <div className="mt-4">
        <span className="inline-block text-[#8c2d19] text-[11px] font-semibold uppercase leading-snug tracking-wide">
          {book.category}
        </span>
      </div>

      {/* CONTENT */}

      <div className="flex flex-col flex-1 mt-3">

        <h3 className="text-[19px] font-bold text-[#1f1f1f] leading-snug">
          {book.title}
        </h3>

        {book.subtitle && (
          <p className="text-[12px] text-[#595959] mt-1">
            {book.subtitle}
          </p>
        )}

        {book.author && (
          <p className="text-[13px] italic text-[#595959] mt-2">
            by {book.author}
          </p>
        )}

        <p className="text-[12px] text-[#595959] leading-relaxed mt-3 line-clamp-4">
          {book.description}
        </p>

        {/* BUTTONS */}

        <div className="mt-auto pt-5">

          <div className="flex flex-col gap-2">

            <a
              href={getAmazonUrl(book)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold py-2.5 px-3 flex items-center justify-center gap-2 no-underline"
            >
              View Book
              <ArrowUpRight size={15} />
            </a>

            <button
              type="button"
              onClick={() => onView(book)}
              className="w-full rounded border border-[#d4d4d4] bg-white hover:bg-[#f5f5f5] active:bg-[#e5e5e5] text-[#1f1f1f] text-[14px] font-semibold py-2.5"
            >
              Book details
            </button>

          </div>

        </div>

      </div>

    </article>
  );
}

// =====================================================
// MAIN BOOKSTORES PAGE
// =====================================================

export default function Bookstores() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Books");
  const [showAll, setShowAll] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openFaq, setOpenFaq] = useState(-1);

  // CATEGORIES GENERATED AUTOMATICALLY

  const categories = useMemo(() => {
    return [
      "All Books",
      ...new Set(books.map((book) => book.category)),
    ];
  }, []);

  // FILTER BOOKS BY TITLE, AUTHOR, CATEGORY

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory =
        category === "All Books" ||
        book.category === category;

      return matchesCategory && bookMatchesSearch(book, search);
    });
  }, [search, category]);

  const visibleBooks = showAll
    ? filteredBooks
    : filteredBooks.slice(0, 8);

  // SCROLL FUNCTION

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  // FAQ DATA

  const faqs = [
    {
      question: "How can I search for a book?",
      answer:
        "Use the search field to enter a book title, author name, or category. Matching books will appear automatically.",
    },
    {
      question: "Where can I find more information about a book?",
      answer:
        "Select Book Details to read the collection description or View Book to open its linked Amazon listing.",
    },
    {
      question: "Are all categories available in the collection?",
      answer:
        "The catalogue displays the categories currently included on this page. Use the filters to explore the available books.",
    },
    {
      question: "How can I find books by a particular author?",
      answer:
        "Enter the author's name in the catalogue search field. Search is case-insensitive, so uppercase and lowercase letters both work.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#ffffff] text-[#1f1f1f]"
      style={{
        fontFamily:
          "Georgia, 'Times New Roman', serif",
      }}
    >

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <header className="border-b border-[#e5e5e5]">

        {/* TOP LABEL */}

        <div className="border-b border-[#e5e5e5] bg-[#f5f5f5] py-3 px-6">

          <div className="max-w-7xl mx-auto flex justify-between gap-3 flex-wrap text-[12px] text-[#525252]">

            <span>
              Independent Book Collection
            </span>

            <span>
              Discover Literature Across Genres
            </span>

          </div>

        </div>

        {/* HERO MAIN */}

        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* LEFT */}

            <div className="lg:col-span-7">

              <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8c2d19] mb-3">
                The World of Books
              </p>

              <h1 className="text-4xl sm:text-5xl font-bold text-[#1f1f1f] leading-[1.12]">
                Books, Authors & Timeless Stories
              </h1>

              <p className="text-sm sm:text-base text-[#595959] mt-5 leading-relaxed max-w-xl">
                An organized collection of fiction, history,
                philosophy, crime thrillers, academic
                scholarship, graphic novels, memoirs, and
                contemporary works. Find new stories and
                authors across a wide range of interests.
              </p>

              {/* ACTION BUTTONS */}

              <div className="mt-8 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() => scrollTo("books-collection")}
                  className="rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold px-6 py-3 flex items-center gap-2"
                >
                  Browse the collection
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo("book-categories")}
                  className="rounded border border-[#d4d4d4] bg-white hover:bg-[#f5f5f5] active:bg-[#e5e5e5] text-[#1f1f1f] text-[14px] font-semibold px-6 py-3"
                >
                  Browse categories
                </button>

              </div>

              {/* COLLECTION STATS */}

              <div className="mt-8 pt-5 border-t border-[#e5e5e5] flex flex-wrap items-center gap-4 text-[12px] text-[#595959]">

                <span>{books.length} Books</span>
                <span aria-hidden="true">·</span>
                <span>{categories.length - 1} Categories</span>
                <span aria-hidden="true">·</span>
                <span>Author Collections</span>

              </div>

            </div>

            {/* RIGHT IMAGE */}

            <div className="lg:col-span-5">

              <div>

                <div className="h-[340px] sm:h-[400px] overflow-hidden relative bg-[#e5e5e5]">

                  <img
                    src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80"
                    alt="Classic library and book collection"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f]/90 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">

                    <p className="text-[12px] uppercase tracking-wide text-[#e5e5e5] font-semibold mb-2">
                      Curated Reading
                    </p>

                    <h2 className="text-lg font-bold">
                      Every Book Has a Story to Tell
                    </h2>

                  </div>

                </div>

                

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* =========================================
          EDITORIAL SECTION
      ========================================= */}

      <section className="max-w-7xl mx-auto px-6 py-14 sm:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* CONTENT */}

          <div>

            <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8c2d19] mb-3">
              Literary Discovery
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              More Than a Book.
              <span className="block mt-1">
                A World of Ideas.
              </span>
            </h2>

            <p className="text-sm text-[#595959] leading-7 mt-5">
              Books allow us to explore cultures, history,
              discoveries, imagination, and the human
              experience. Our catalogue brings together
              works from different genres so readers
              can discover subjects and stories that
              interest them.
            </p>

            <p className="text-sm text-[#595959] leading-7 mt-3">
              From ancient philosophical ideas and
              historical fiction to modern crime thrillers,
              academic research, and graphic storytelling,
              every category offers a different reading
              experience.
            </p>

            <button
              type="button"
              onClick={() => scrollTo("books-collection")}
              className="mt-6 text-[#8c2d19] hover:text-[#6e2312] text-[14px] font-semibold underline underline-offset-4 flex items-center gap-2"
            >
              See the books
              <ArrowUpRight size={15} />
            </button>

          </div>

          {/* IMAGE */}

          <div className="relative h-[320px] sm:h-[370px] overflow-hidden bg-[#e5e5e5]">

            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80"
              alt="Bookshelves filled with literature"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-[#1f1f1f]/85 p-5 text-white">

              <p className="text-[12px] uppercase tracking-wide text-[#e5e5e5] font-semibold">
                Literature & Knowledge
              </p>

              <h3 className="text-lg font-bold mt-1">
                Discover Something New on Every Shelf
              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          CATEGORY DIRECTORY
      ========================================= */}

      <section
        id="book-categories"
        className="bg-[#f5f5f5] py-14 sm:py-16"
      >

        <div className="max-w-7xl mx-auto px-6">

          {/* SECTION HEADING */}

          <div className="mb-8">

            <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8c2d19] mb-2">
              Explore by Interest
            </p>

            <h2 className="text-3xl font-bold">
              Browse Book Categories
            </h2>

            <p className="text-sm text-[#595959] mt-3 max-w-2xl leading-relaxed">
              Select a category to explore its books.
              Discover historical works, fiction,
              academic titles, memoirs, illustrated
              stories, and more.
            </p>

          </div>

          {/* CATEGORY CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {categories
              .filter((item) => item !== "All Books")
              .map((item) => {

                const count = books.filter(
                  (book) => book.category === item
                ).length;

                const firstBook = books.find(
                  (book) => book.category === item
                );

                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setCategory(item);
                      setSearch("");
                      setShowAll(true);
                      scrollTo("books-collection");
                    }}
                    className="bg-white border border-[#e5e5e5] hover:border-[#a3a3a3] p-4 text-left flex flex-col"
                  >

                    {firstBook && (
                      <div className="w-full h-44 bg-[#f5f5f5] p-3">
                        <BookImage
                          book={firstBook}
                          className="w-full h-full"
                        />
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-[#1f1f1f] mt-4 leading-snug">
                      {item}
                    </h3>

                    <p className="text-xs text-[#595959] mt-2">
                      {count} Books Available
                    </p>

                    <div className="mt-auto pt-4 text-[14px] font-semibold text-[#8c2d19] flex items-center gap-2">
                      View category
                      <ArrowRight size={13} />
                    </div>

                  </button>
                );
              })}

          </div>

        </div>

      </section>

      {/* =========================================
          BOOK COLLECTION
      ========================================= */}

      <section
        id="books-collection"
        className="max-w-7xl mx-auto px-6 py-14 sm:py-20 scroll-mt-5"
      >

        {/* HEADING */}

        <div className="text-center max-w-3xl mx-auto mb-10">

          <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8c2d19] mb-2">
            Book Catalogue
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold">
            The Book Collection
          </h2>

          <p className="text-sm text-[#595959] leading-relaxed mt-4">
            Browse our updated selection of books across
            fiction, history, philosophy, crime,
            humanities, academic research, graphic
            novels, and memoirs.
          </p>

        </div>

        {/* =====================================
            SEARCH AND CATEGORY FILTERS
        ===================================== */}

        <div className="mb-8">

          {/* SEARCH */}

          <div className="relative max-w-2xl mx-auto mb-6">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#595959]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowAll(false);
              }}
              placeholder="Search book title, author, or category..."
              className="w-full rounded border border-[#949494] bg-white py-3 pl-12 pr-10 text-[14px] outline-none focus:border-[#8c2d19] focus:ring-2 focus:ring-[#8c2d19]/30"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear book search"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#595959] hover:text-[#1f1f1f]"
              >
                <X size={17} />
              </button>
            )}

          </div>

          {/* CATEGORY BUTTONS */}

          <div className="flex flex-wrap justify-center gap-2">

            {categories.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setCategory(item);
                  setShowAll(false);
                }}
                aria-pressed={category === item}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${
                  category === item
                    ? "bg-[#8c2d19] text-white border-[#8c2d19]"
                    : "bg-white text-[#404040] border-[#d4d4d4] hover:bg-[#f5f5f5] hover:border-[#a3a3a3]"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        {/* RESULT COUNT */}

        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">

          <p className="text-xs font-bold text-[#595959]">
            Showing {visibleBooks.length} of {filteredBooks.length} Books
          </p>

          {(search || category !== "All Books") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All Books");
                setShowAll(false);
              }}
              className="text-[14px] font-semibold text-[#8c2d19] hover:text-[#6e2312] underline underline-offset-4"
            >
              Clear filters
            </button>
          )}

        </div>

        {/* =====================================
            BOOK GRID
        ===================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">

          {visibleBooks.map((book, index) => (
            <BookCard
              key={`${book.asin}-${book.category}-${index}`}
              book={book}
              onView={setSelectedBook}
            />
          ))}

        </div>

        {/* NO RESULTS */}

        {filteredBooks.length === 0 && (
          <div className="bg-[#f5f5f5] text-center py-14 px-5">

            <Search
              size={30}
              className="mx-auto text-[#8c2d19]"
            />

            <h3 className="text-xl font-bold mt-3">
              No Matching Books Found
            </h3>

            <p className="text-sm text-[#595959] mt-2">
              Try searching by another title or author.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All Books");
              }}
              className="mt-5 rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold px-5 py-2.5"
            >
              View all books
            </button>

          </div>
        )}

        {/* LOAD MORE */}

        {filteredBooks.length > 8 && (
          <div className="text-center mt-10">

            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold px-6 py-3 inline-flex items-center gap-2"
            >
              {showAll
                ? "Show fewer books"
                : `Show all ${filteredBooks.length} books`}

              <ArrowRight size={15} />
            </button>

          </div>
        )}

      </section>

      {/* =========================================
          FEATURED SPOTLIGHT
      ========================================= */}

      <section className="border-t border-[#e5e5e5] py-14 sm:py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* BOOK IMAGE */}

            <div className="bg-[#f5f5f5] p-4">

              <BookImage
                book={books[25]}
                className="w-full h-[350px] sm:h-[400px]"
              />

            </div>

            {/* DETAILS */}

            <div>

              <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8c2d19] mb-3">
                Featured Selection
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#1f1f1f] leading-tight">
                {books[25].title}
              </h2>

              <p className="text-lg text-[#404040] mt-3">
                {books[25].subtitle}
              </p>

              <p className="text-sm italic text-[#595959] mt-2">
                by {books[25].author}
              </p>

              <p className="text-sm leading-7 text-[#595959] mt-6">
                Set against the fall of ancient Rome,
                this historical novel explores family
                bonds, resilience, and life during a
                period of extraordinary political and
                cultural change.
              </p>

              <p className="text-sm leading-7 text-[#595959] mt-3">
                Explore the challenges faced by individuals
                and families during the transformation
                of a great civilization, and discover
                a story that connects personal experiences
                with a defining historical era.
              </p>

              <a
                href={getAmazonUrl(books[25])}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold px-6 py-3 no-underline"
              >
                View on Amazon
                <ArrowUpRight size={15} />
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          FAQ SECTION
      ========================================= */}

      <section className="bg-[#f5f5f5] py-14 sm:py-16">

        <div className="max-w-4xl mx-auto px-6">

          <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8c2d19] text-center mb-2">
            Helpful Information
          </p>

          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[#d4d4d4]"
            >

              <button
                type="button"
                onClick={() =>
                  setOpenFaq(
                    openFaq === index ? -1 : index
                  )
                }
                aria-expanded={openFaq === index}
                className="w-full py-5 flex justify-between items-center gap-4 text-left"
              >

                <span className="font-bold text-base sm:text-lg">
                  {faq.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`text-[#8c2d19] shrink-0 transition-transform ${
                    openFaq === index
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {openFaq === index && (
                <p className="pb-5 text-sm leading-relaxed text-[#595959]">
                  {faq.answer}
                </p>
              )}

            </div>
          ))}

        </div>

      </section>

      {/* =========================================
          BOOK DETAILS MODAL
      ========================================= */}

      {selectedBook && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedBook(null);
            }
          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedBook.title}
            className="bg-[#ffffff] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-[#e5e5e5]"
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              aria-label="Close book details"
              className="absolute top-4 right-4 z-10 rounded bg-white p-2 border border-[#d4d4d4] hover:bg-[#f5f5f5]"
            >
              <X size={19} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* COVER */}

              <div className="bg-[#f5f5f5] p-8 sm:p-10">

                <BookImage
                  book={selectedBook}
                  className="w-full h-[320px] sm:h-[420px]"
                />

              </div>

              {/* CONTENT */}

              <div className="p-6 sm:p-9 flex flex-col">

                <span className="text-[12px] uppercase tracking-wide font-semibold text-[#8c2d19]">
                  {selectedBook.category}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] mt-3 leading-tight">
                  {selectedBook.title}
                </h2>

                {selectedBook.subtitle && (
                  <p className="text-sm text-[#595959] mt-2">
                    {selectedBook.subtitle}
                  </p>
                )}

                {selectedBook.author && (
                  <p className="text-sm text-[#595959] italic mt-3">
                    by {selectedBook.author}
                  </p>
                )}

                <div className="border-t border-[#e5e5e5] mt-5 pt-5">

                  <h3 className="text-[15px] font-bold text-[#1f1f1f]">
                    About This Book
                  </h3>

                  <p className="text-sm leading-7 text-[#595959] mt-3">
                    {selectedBook.description}
                  </p>

                </div>

                <div className="mt-auto pt-8 flex flex-col gap-3">

                  <a
                    href={getAmazonUrl(selectedBook)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold px-5 py-3 flex items-center justify-center gap-2 no-underline"
                  >
                    View Book on Amazon
                    <ArrowUpRight size={15} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedBook(null)}
                    className="rounded border border-[#d4d4d4] bg-white hover:bg-[#f5f5f5] active:bg-[#e5e5e5] text-[#1f1f1f] text-[14px] font-semibold py-3"
                  >
                    Return to Collection
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =========================================
          BOTTOM DECORATIVE DIVIDER
      ========================================= */}

      <div className="max-w-7xl mx-auto px-6 py-8">

      </div>

    </div>
  );
}
