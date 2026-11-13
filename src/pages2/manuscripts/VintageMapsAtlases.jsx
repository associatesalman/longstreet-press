
import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

export default function VintageMapsAtlases() {

  // ==========================================
  // VINTAGE MAPS & ATLASES
  // Images: public/Vintage Maps/
  // Titles matched with actual covers
  // Individual Amazon search links
  // No prices
  // Georgia font
  // Five-column layout
  // No hover effects or animations
  // ==========================================

  const books = [
    {
      id: 1,
      title: "Around the Globe: Vintage Maps Scrapbook Paper",
      author: "Timeless Vintage Corner",
      format: "Vintage Map Scrapbook Paper & Crafts",
      image: "/Vintage Maps/Vintage Maps1.jpg",
      amazonUrl:
        "https://www.amazon.com/Around-Globe-Scrapbook-Double-Sided-Scrapbooking/dp/B0BMT2BT4B",
    },
    {
      id: 2,
      title: "Vintage Maps",
      author: "E. Lawrence ",
      format: "Vintage Maps & Nautical Paper Collection",
      image: "/Vintage Maps/Vintage Maps2.webp",
      amazonUrl:
        "https://www.amazon.com/Vintage-Maps-Nantucket-Marthas-Vineyard/dp/1079136223",
    },
    {
      id: 3,
      title: "Wanderlust Journal",
      author: "Vintage Maps Journal ",
      format: "Travel Journals & Antique Cartography",
      image: "/Vintage Maps/Vintage Maps3.webp",
      amazonUrl:
        "https://www.amazon.co.uk/Wanderlust-Journal-Notebook-Travellers-Geography/dp/1701467623",
    },
    {
      id: 4,
      title: "Full Pages of Vintage Maps",
      author: "Ephemera and Junk ",
      format: "Antique Maps & Vintage Paper Collections",
      image: "/Vintage Maps/Vintage Maps4.jpg",
      amazonUrl:
        "https://www.amazon.com/Full-Pages-Vintage-Maps-Scrapbooking/dp/B09WQBJC89",
    },
    {
      id: 5,
      title: "Vintage Map Notebook",
      author: " Wren Coletti",
      format: "Vintage Cartography & Travel Notebooks",
      image: "/Vintage Maps/Vintage Maps5.jpg",
      amazonUrl:
        "https://www.amazon.com/Vintage-Notebook-Large-Journal-Softcover/dp/B0CDNPTTW9",
    },
  ];

  return (
    <div
      className="w-full min-h-screen bg-[#ffffff] text-[#1f1f1f] px-4 sm:px-6 py-7"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ======================================
            BREADCRUMB NAVIGATION
        ====================================== */}

        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#595959] mb-5">

          <Link
            to="/"
            className="flex items-center gap-1 text-[#595959] no-underline"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <span>/</span>

          <span>Manuscripts & Science</span>

          <span>/</span>

          <span className="font-bold text-[#8c2d19]">
            Vintage Maps & Atlases
          </span>

        </nav>

        {/* ======================================
            PAGE HEADER
        ====================================== */}

        <header className="border-b border-[#e5e5e5] pb-6 mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex-1 min-w-0">

              <div className="flex items-center gap-2 text-[#8c2d19] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">

                <Compass size={15} />

                <span>
                  Vintage Cartography, Travel Journals & Historical Maps
                </span>

              </div>

              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                Vintage Maps & Atlases
              </h1>

              <p className="text-[14px] text-[#525252] mt-2 max-w-2xl leading-relaxed">
                Discover a captivating collection of
                vintage maps, antique cartography,
                travel journals, historical map
                illustrations, and beautifully designed
                scrapbook papers. Explore nostalgic
                world maps, nautical-inspired designs,
                decorative geographical prints,
                and vintage travel notebooks.
                These collections celebrate the
                timeless beauty of geographical
                exploration, historic navigation,
                creative journaling, and the
                artistic heritage of mapmaking.
              </p>

            </div>

            {/* ======================================
                CURATED INDEX
            ====================================== */}

            <div className="sm:border-l border-[#e5e5e5] sm:pl-6 shrink-0">

              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8c2d19]">
                In This Category
              </span>

              <span className="block text-xl font-bold text-[#1f1f1f] mt-1">
                {books.length} Volumes
              </span>

            </div>

          </div>

        </header>

        {/* ======================================
            BOOK COLLECTION GRID
        ====================================== */}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">

          {books.map((book) => (

            <article
              key={book.id}
              className="bg-[#ffffff] border border-[#e5e5e5] p-3 flex flex-col h-full min-w-0"
            >

              {/* ======================================
                  BOOK COVER
              ====================================== */}

              <div className="w-full h-60 bg-[#f5f5f5] p-2 flex items-center justify-center overflow-hidden">

                <img
                  src={book.image}
                  alt={
                    book.author
                      ? `${book.title} by ${book.author}`
                      : book.title
                  }
                  loading="lazy"
                  className="w-full h-full object-contain"
                />

              </div>

              {/* ======================================
                  CATEGORY BADGE
              ====================================== */}

              <div className="mt-3">

                <span className="inline-block text-[11px] font-semibold uppercase leading-snug text-[#8c2d19] tracking-wide">
                  {book.format}
                </span>

              </div>

              {/* ======================================
                  BOOK INFORMATION
              ====================================== */}

              <div className="flex flex-col flex-1 mt-2">

                {/* BOOK TITLE */}

                <h2 className="text-[17px] font-bold text-[#1f1f1f] leading-[1.35]">
                  {book.title}
                </h2>

                {/* AUTHOR NAME */}

                {book.author && (
                  <p className="text-[13px] text-[#595959] italic mt-2 leading-snug">
                    by {book.author}
                  </p>
                )}

                {/* ======================================
                    AMAZON VIEW BOOK BUTTON
                ====================================== */}

                <div className="mt-auto pt-4">

                  <div className="border-t border-[#e5e5e5] pt-3">

                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Find ${book.title} on Amazon`}
                      className="w-full rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold py-2.5 px-3 flex items-center justify-center gap-2 no-underline"
                    >


                      View Book

                      <ArrowUpRight size={15} />

                    </a>

                  </div>

                </div>

              </div>

            </article>

          ))}

        </section>


      </div>
    </div>
  );
}
