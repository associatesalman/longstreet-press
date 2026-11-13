
import React from "react";
import { Link } from "react-router-dom";
import {
  Landmark,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

export default function AncientWorldHistory() {

  // ==========================================
  // ANCIENT & WORLD HISTORY
  // Images: public/ancient/
  // Titles matched with actual book covers
  // No prices
  // No hover animations
  // ==========================================

  const books = [
    {
      id: 1,
      title: "Hellenistic Philosophies for the Modern Man",
      author: "George Smeader",
      format: "Ancient Greek Philosophy",
      image: "/ancient/ancient1.jpg",
      amazonUrl:
        "https://www.amazon.ca/Hellenistic-Philosophies-Modern-Man-Epicureanism/dp/B0CHL9N3JG",
    },
    {
      id: 2,
      title: "Pensie: A Path of Virtue, Wisdom, and Reflection",
      author: "Author not specified",
      format: "Ancient Wisdom & Reflection",
      image: "/ancient/ancient2.jpg",
      amazonUrl:
        "https://www.amazon.com/Pensif-Reflection-Education-Philosophy-Sociology-ebook/dp/B0FDDC6JS3/ref=sr_1_1?dib=eyJ2IjoiMSJ9.bhMShBYXKTF9A15nGNE76K5XGqjm9q_qxo9vaInszsbGEXcC-cUNXnUlNzHxBZZ2zCemvF68AEYyLYNLpmNy7r3zXPrMpXyjLolTe9wfxhMUQRU35T-3gYv36kOEykEk6jkN6zwWhHNWaRgDRTJYHz_hdcKmBxg4DYPCUUa5mwTe18ldm19Pm5W_eCdt1wb8.JZRf1-733-VcVz18ksMHRy3P4s7fgOWQWCFREEH1p8c&dib_tag=se&keywords=Pensie+A+Path+of+Virtue+Wisdom+and+Reflection&nsdOptOutParam=true&qid=1794410835&sr=8-1",
    },
    {
      id: 3,
      title: "G.R.'s Bizarre, Vol. 1: The Good, the Bad & the Math",
      author: "Greg Ricker",
      format: "Ancient Mysteries & Mathematics",
      image: "/ancient/ancient3.jpg",
      amazonUrl:
        "https://www.amazon.com/G-R-s-Bizarre-Good-Bad-Math-ebook/dp/B07T2WL21B/ref=sr_1_1?dib=eyJ2IjoiMSJ9.EE6tAClz1Lv17A_WPeVP9g.r83Dq4ZvmUsOIsuuueid72SUxvcVS4cSx6sJrfyyT94&dib_tag=se&keywords=GRs+Bizarre+The+Good+The+Bad+and+The+Math+Greg+Ricker&nsdOptOutParam=true&qid=1794410874&sr=8-1",
    },
    {
      id: 4,
      title: "Vesta and Her Children: A Tale of the Fall of Rome",
      author: "Marcia J. H. Twain",
      format: "Ancient Roman Historical Fiction",
      image: "/ancient/ancient4.jpg",
      amazonUrl:
        "https://www.amazon.in/Vesta-Her-Children-Tale-Fall/dp/B0DKTKBY8N",
    },
    {
      id: 5,
      title: "The Polite Apocalypse: Manners and the Death of Discourse",
      author: "C. R. Beaumont",
      format: "Social History & Philosophy",
      image: "/ancient/ancient5.jpg",
      amazonUrl:
        "https://www.amazon.com/POLITE-APOCALYPSE-DISCOURSE-Philosophy-Sociology-ebook/dp/B0G36ZW438?ref_=saga_dp_bnx_dsk_dp",
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

        {/* BREADCRUMB NAVIGATION */}

        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#595959] mb-5">

          <Link
            to="/"
            className="flex items-center gap-1 text-[#595959] no-underline"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <span>/</span>
          <span>Thought & Science</span>
          <span>/</span>

          <span className="font-bold text-[#8c2d19]">
            Ancient & World History
          </span>

        </nav>

        {/* PAGE HEADER */}

        <header className="border-b border-[#e5e5e5] pb-6 mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex-1">

              <div className="flex items-center gap-2 text-[#8c2d19] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">

                <Landmark size={16} />

                <span>
                  Civilizations, Empires & World Heritage
                </span>

              </div>

              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                Ancient & World History
              </h1>

              <p className="text-[14px] text-[#525252] mt-2 max-w-2xl leading-relaxed">
                Explore fascinating ancient civilizations,
                powerful empires, historical discoveries,
                and the cultural achievements that shaped
                human history across centuries.
              </p>

            </div>

            {/* CURATED INDEX */}

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

        {/* BOOK COLLECTION GRID */}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">

          {books.map((book) => (

            <article
              key={book.id}
              className="bg-[#ffffff] border border-[#e5e5e5] p-3 flex flex-col h-full"
            >

              {/* BOOK COVER */}

              <div className="w-full h-60 bg-[#f5f5f5] p-2 flex items-center justify-center overflow-hidden">

                <img
                  src={book.image}
                  alt={`${book.title} by ${book.author}`}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />

              </div>

              {/* CATEGORY */}

              <div className="mt-3">

                <span className="inline-block text-[11px] font-semibold uppercase leading-snug text-[#8c2d19] tracking-wide">
                  {book.format}
                </span>

              </div>

              {/* BOOK INFORMATION */}

              <div className="flex flex-col flex-1 mt-2">

                {/* BOOK TITLE */}

                <h2 className="text-[17px] font-bold text-[#1f1f1f] leading-[1.35]">
                  {book.title}
                </h2>

                {/* AUTHOR */}

                {book.author !== "Author not specified" && (
                  <p className="text-[13px] text-[#595959] italic mt-2 leading-snug">
                    by {book.author}
                  </p>
                )}

                {/* AMAZON VIEW BUTTON */}

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
