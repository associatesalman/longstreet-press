
import React from "react";
import { Link } from "react-router-dom";
import BookSearchNotice from "../components/BookSearchNotice";
import { bookAnchorId, highlightClass, useBookHighlight } from "../lib/bookSearch";
import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

export default function LiteraryClassicFiction() {
  const books = [
    {
      id: 1,
      title: "Vesta and Her Children",
      subtitle: "A Tale of the Fall of Rome",
      author: "Marcia Twain",
      format: "Historical Fiction",
      image: "/fiction/fiction1.webp",
      amazonUrl:
        "https://www.amazon.com/Vesta-Her-Children-Tale-Fall/dp/B0DKTKBY8N/ref=sr_1_1?dib=eyJ2IjoiMSJ9.yHaqMcP3FSKDDGmipBWvVg.6t6ger1hqUWx_KcJCtfUaOdeGXhDix-WLVM55zUmZzE&dib_tag=se&keywords=Vesta+and+Her+Children+Marcia+Twain&qid=1794331389&sr=8-1",
    },
    {
      id: 2,
      title: "Catholic Bible: 73 Books with Tabs",
      subtitle: "",
      author: "Fr. Mike Schmitz",
      format: "Religious Literature",
      image: "/fiction/fiction2.jpg",
      amazonUrl:
        "https://www.amazon.com/Catholic-Bible-Books-Tabs-Understand/dp/B0HHM9NMX8/ref=sr_1_1?dib=eyJ2IjoiMSJ9.n4DNaf1omBbqPCUhCibf6ZjD52arEORjj3XWoyBwvqtwps7nKAiVafC59lwBLy1vSqkvREZctm_vy5wEel_NkDWm_LkfL4iLoOG0NQCkYy41WwPMp6FDZRblI0alS9nGbkxaWBClAL03FxoLL7MN0twY1t25ygoM21Pa3h-xtpLBeVkR8ohk_m8lunhdx27yTXMLpUDFBar0aWtBUxf_9w78xgZQogQ01dtes3X3P7k.m1cJOyKg4LaHT0gPhwROR52uRqaIwiyhSQC2_r1u1kU&dib_tag=se&keywords=Catholic+Bible+73+Books+with+Tabs+Fr+Mike+Schmitz&nsdOptOutParam=true&qid=1794331419&sr=8-1",
    },
    {
      id: 3,
      title: "Mansfield Park",
      subtitle: "A Classic Novel",
      author: "Jane Austen",
      format: "Classic English Fiction",
      image: "/fiction/fiction3.jpg",
      amazonUrl:
        "https://www.amazon.com/Janeite-Journal-Mansfield-Park/dp/0996947833/ref=sr_1_3?Adv-Srch-Books-Submit.x=0&Adv-Srch-Books-Submit.y=0&dib=eyJ2IjoiMSJ9.jzoZplDQcHirOwnFwFlEJyJpmlYD8F-nSvuxnDiO2V3GjHj071QN20LucGBJIEps.wwdChsNWTAoA9zAKr5cvzKZYcGXzJgcGmZiU3b3AlyM&dib_tag=se&keywords=literary+and+classic+fiction&qid=1794331507&refinements=p_30%3AIndependent&s=books&sr=1-3&unfiltered=1",
    },
    {
      id: 4,
      title: "The Tenth Symphony",
      subtitle: "",
      author: "Dean Evans",
      format: "Contemporary Literary Fiction",
      image: "/fiction/fiction4.jpg",
      amazonUrl:
        "https://www.amazon.com/Tenth-Symphony-Dean-Evans-ebook/dp/B0CF8BL7PW/ref=sr_1_1?dib=eyJ2IjoiMSJ9.mMFTSK8f95qsK8gJ8FFe_g.Xury2gPHNznp2IUbsyRSW1DUFFXwL487MMvO-S4aO7Q&dib_tag=se&keywords=The+Tenth+Symphony+Dean+Evans&qid=1794331541&sr=8-1",
    },
    {
      id: 5,
      title:
        "El collar de diamantes / The Diamond Necklace",
      subtitle: "Spanish Translation",
      author: "Guy de Maupassant",
      format: "Classic Short Fiction",
      image: "/fiction/fiction5.jpg",
      amazonUrl:
        "https://www.amazon.com/diamantes-Diamond-Necklace-Maupassant-Translation-ebook/dp/B009Z1FBJU/ref=sr_1_1?dib=eyJ2IjoiMSJ9.MhO9Uu1hDsFNEB-KTvsCAjfGaBqZX74m6yvEh5IzUQQMjF16kMYKhh-My4_h-O0BSnwxLA4e155D4FVntgXr_FAvkRVfmleXbyQyWbBpZbUYvAwmsqs8S1-rQHrIrn7CCL7u6oF_w0e6rCO_7XUWwbuu1fv4pb91R712LPuA8ffyb3AAHudWKMgt8BlyZskusmRwiMqGPUWAv3CWVm44QsT70aF8N1rMTyxB94OvLg4.fQwFcBPIZCZ8I3PVOPkK3wJW3hANiShuY2yVxMFbzfg&dib_tag=se&keywords=El+collar+de+diamantes+Guy+de+Maupassant+Spanish&nsdOptOutParam=true&qid=1794331568&sr=8-1",
    },
  ];

  const { query: bookQuery, match: bookMatch } = useBookHighlight(books);

  return (
    <div
      className="w-full min-h-screen bg-[#ffffff] text-[#1f1f1f] px-4 sm:px-6 py-7"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* BREADCRUMB */}

        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#595959] mb-5">
          <Link
            to="/"
            className="flex items-center gap-1 text-[#595959] no-underline"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <span>/</span>
          <span>Categories</span>
          <span>/</span>

          <span className="font-bold text-[#8c2d19]">
            Literary & Classic Fiction
          </span>
        </nav>

        {/* PAGE HEADER */}

        <header className="border-b border-[#e5e5e5] pb-6 mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex-1">

              <p className="text-[#8c2d19] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">
                Timeless Literary Masterpieces
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                Literary & Classic Fiction
              </h1>

              <p className="text-[14px] text-[#525252] mt-2 max-w-2xl leading-relaxed">
                Explore a diverse selection of literary
                works, historical fiction, classic
                novels, religious literature, and
                thought-provoking stories. Discover
                remarkable narratives that explore
                history, faith, human relationships,
                culture, and the enduring power
                of storytelling.
              </p>

            </div>

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

        {/* BOOK COLLECTION */}

        <BookSearchNotice query={bookQuery} match={bookMatch} />


        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">

          {books.map((book) => (

            <article
              key={book.id}
              id={bookAnchorId(book)}
              aria-current={bookMatch?.id === book.id ? "true" : undefined}
              className={`bg-[#ffffff] border border-[#e5e5e5] p-3 flex flex-col h-full${bookMatch?.id === book.id ? highlightClass : ""}`}
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

              {/* BOOK DETAILS */}

              <div className="flex flex-col flex-1 mt-2">

                <h2 className="text-[17px] font-bold text-[#1f1f1f] leading-[1.35]">
                  {book.title}
                </h2>

                {book.subtitle && (
                  <p className="text-[12px] text-[#595959] mt-1 leading-snug">
                    {book.subtitle}
                  </p>
                )}

                <p className="text-[13px] text-[#595959] italic mt-2 leading-snug">
                  by {book.author}
                </p>

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
