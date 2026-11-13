
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
} from "lucide-react";

// ======================================================
// BOOK CATEGORIES
// Balanced cards, consistent button alignment
// Actual local book covers and Amazon links
// ======================================================

const books = [
  {
    id: 1,
    title: "Vesta and Her Children",
    subtitle: "A Tale of the Fall of Rome",
    author: "Marcia Twain",
    format: "Historical Fiction",
    image: "/fiction/fiction1.webp",
    amazonUrl:
      "https://www.amazon.com/Vesta-Her-Children-Tale-Fall/dp/B0DKTKBY8N",
    
description:
  "Set against the dramatic backdrop of the fall of ancient Rome, Vesta and Her Children takes readers into a world where family, tradition, and survival are tested by extraordinary change. As a once-powerful civilization faces uncertainty, the story explores the strength of human relationships, the importance of preserving one's identity, and the courage required to confront an unpredictable future. Through its historical setting, the novel invites readers to reflect on resilience, sacrifice, loyalty, and the enduring bonds that connect generations.",
  },
  {
    id: 2,
    title: "The Illustrated Catholic Bible Companion",
    subtitle: "All 73 Books — One Story of Salvation",
    author: "Brendan Mulcahy",
    format: "Illustrated Catholic Bible Guide",
    image: "/Theology, Bibles/Theology, Bibles5.jpg",
    amazonUrl:
      "https://www.amazon.com/Illustrated-Catholic-Bible-Companion-Book/dp/B0HKD8QN1T/ref=sr_1_1?dib=eyJ2IjoiMSJ9.FpgMV8TvPgnH_AUODk2OfxgZ-rDr8YCO-I1t49eF0QjzFD0GmzKEuUCNOgPH7WyJ1gLcqHsPQ-hwIOiY0rFka5v3C89jbXOnPhP6vhLwJ6Y8LFEDpYScNm4lWmS4X0brflgKlZnwKzEIS90V8HrcIL-wrDUJWHz2-3Uj8udzgbf6_bLmoUqCk4C5ft1BQ6pqnqj4G93uWIFh9qGYBI6qxc8lyQJIutOmLpiBLSzBEIw.LLd1rvKA8B1BOO_gzQo_9pM0MlgeK4Y-z5RsvV5M9X4&dib_tag=se&keywords=The+Illustrated+Catholic+Bible+Companion+Brendan+MulcahyThe+Illustrated+Catholic+Bible+Companion+Brendan+Mulcahy&nsdOptOutParam=true&qid=1794499365&sr=8-1" +
      encodeURIComponent(
        "The Illustrated Catholic Bible Companion Brendan Mulcahy"
      ),
    description:
      "An illustrated guide connecting all 73 books of the Catholic Bible through the overarching story of salvation.",
  },
  {
    id: 3,
    title: "Mansfield Park",
    subtitle: "A Classic Novel",
    author: "Jane Austen",
    format: "Classic English Fiction",
    image: "/fiction/fiction3.jpg",
    amazonUrl:
      "https://www.amazon.com/Janeite-Journal-Mansfield-Park/dp/0996947833",
    description:
      "Jane Austen's timeless novel about love, morality, family relationships, and social expectations in English society.",
  },
  {
    id: 4,
    title: "The Tenth Symphony",
    subtitle: "",
    author: "Dean Evans",
    format: "Contemporary Literary Fiction",
    image: "/fiction/fiction4.jpg",
    amazonUrl:
      "https://www.amazon.com/Tenth-Symphony-Dean-Evans-ebook/dp/B0CF8BL7PW",
    description:
      "A contemporary literary work centered on the expressive world of music, artistic creativity, and storytelling.",
  },
  {
    id: 5,
    title: "El collar de diamantes / The Diamond Necklace",
    subtitle: "Spanish Translation",
    author: "Guy de Maupassant",
    format: "Classic Short Fiction",
    image: "/fiction/fiction5.jpg",
    amazonUrl:
      "https://www.amazon.com/diamantes-Diamond-Necklace-Maupassant-Translation-ebook/dp/B009Z1FBJU",
    description:
      "Guy de Maupassant's classic story of ambition, appearances, sacrifice, and unexpected consequences in Spanish translation.",
  },
];

// ======================================================
// REUSABLE BOOK COVER
// ======================================================

function BookImage({ book, className = "" }) {
  return (
    <div
      className={`
        bg-[#f5f5f5]
        p-2 flex items-center justify-center
        overflow-hidden ${className}
      `}
    >
      <img
        src={book.image}
        alt={`${book.title} by ${book.author}`}
        loading="lazy"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// ======================================================
// AMAZON BUTTON
// ======================================================

function ViewBookButton({ book }) {
  return (
    <a
      href={book.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${book.title} on Amazon`}
      className="w-full h-11 flex items-center justify-center gap-2 px-3 font-sans no-underline rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold"
    >
      View Book
      <ArrowUpRight size={15} />
    </a>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function BookCategories() {
  const featuredBook = books[0];
  const collectionBooks = books.slice(1);

  return (
    <main
      className="w-full bg-[#ffffff] text-[#1f1f1f] py-8 px-4 sm:px-6"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADING */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

          <div className="max-w-3xl">

            <p className="font-sans text-[12px] font-semibold uppercase tracking-wide text-[#8c2d19] mb-2">
              Literary Collection
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Literary Classics & Timeless Stories
            </h2>

            <p className="text-[14px] text-[#595959] leading-7 mt-3">
              A selection of historical fiction,
              religious literature, classic English novels,
              contemporary storytelling, and timeless short fiction.
            </p>

          </div>

          <Link
            to="/literary-classic-fiction"
            className="shrink-0 text-[14px] font-sans font-semibold text-[#8c2d19] underline underline-offset-4 hover:text-[#6e2312]"
          >
            See all literary classics
          </Link>

        </div>

        {/* ==================================================
            BALANCED MAIN GRID
        ================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

          {/* ==================================================
              FEATURED BOOK
          ================================================== */}

          <article className="lg:col-span-5 bg-[#f5f5f5] p-5 flex flex-col h-full">

            <p className="text-[12px] font-sans font-semibold tracking-wide uppercase text-[#595959] mb-4">
              Featured Selection
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 items-start">

              <BookImage
                book={featuredBook}
                className="w-44 h-64 shrink-0 mx-auto sm:mx-0 bg-white"
              />

              <div className="flex-1 min-w-0">

                <span className="inline-block text-[#8c2d19] text-[11px] font-sans font-semibold uppercase leading-4 tracking-wide">
                  {featuredBook.format}
                </span>

                <h3 className="text-[25px] font-bold leading-tight mt-4">
                  {featuredBook.title}
                </h3>

                {featuredBook.subtitle && (
                  <p className="text-[14px] text-[#525252] mt-2">
                    {featuredBook.subtitle}
                  </p>
                )}

                <p className="text-[14px] text-[#595959] italic mt-3">
                  by {featuredBook.author}
                </p>

                <p className="text-[14px] text-[#404040] mt-5 leading-7">
                  {featuredBook.description}
                </p>

              </div>

            </div>

            {/* BUTTON AT BOTTOM */}

            <div className="mt-auto pt-5">

              <ViewBookButton book={featuredBook} />

            </div>

          </article>

          {/* ==================================================
              FOUR BOOKS - 2 X 2
          ================================================== */}

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">

            {collectionBooks.map((book) => (

              <article
                key={book.id}
                className="bg-[#ffffff] border border-[#e5e5e5] p-4 flex flex-col h-full min-w-0"
              >

                {/* COVER AND CONTENT */}

                <div className="flex flex-col xl:flex-row items-start gap-4 flex-1">

                  <BookImage
                    book={book}
                    className="w-32 h-48 shrink-0 mx-auto xl:mx-0"
                  />

                  <div className="min-w-0 flex-1">

                    <span className="inline-block text-[11px] font-sans font-semibold uppercase text-[#8c2d19] leading-4 tracking-wide">
                      {book.format}
                    </span>

                    <h3 className="text-[17px] font-bold leading-snug mt-3 text-[#1f1f1f]">
                      {book.title}
                    </h3>

                    {book.subtitle && (
                      <p className="text-[12px] text-[#595959] mt-2 leading-5">
                        {book.subtitle}
                      </p>
                    )}

                    <p className="text-[13px] text-[#595959] italic mt-2 leading-5">
                      by {book.author}
                    </p>

                    <p className="text-[12px] text-[#595959] mt-3 leading-6 line-clamp-4">
                      {book.description}
                    </p>

                  </div>

                </div>

                {/* FIXED BOTTOM ALIGNMENT */}

                <div className="mt-auto pt-5">

                  <div className="border-t border-[#e5e5e5] pt-4">
                    <ViewBookButton book={book} />
                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>


      </div>
    </main>
  );
}
