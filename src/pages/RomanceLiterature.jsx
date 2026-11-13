
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

export default function RomanceLiterature() {
  const books = [
    {
      id: 1,
      title: "Devlin",
      subtitle: "King's Cops",
      author: "Sadie King",
      format: "Contemporary Romance",
      image: "/romance/romance1.webp",
      amazonUrl:
        "https://www.amazon.com/Devlin-police-romance-Kings-Cops-ebook/dp/B08ZXQDZXK/ref=sr_1_1?dib=eyJ2IjoiMSJ9.Hm2QmJABzvuGt5XC8OiyJp4tSWm7BZ6xmGHGJINznFdV4JoXcwe8Mr7fJ3WM96u5hKRGbx7JCzbohXNcUwSBkQ.Lg5NLUdy9jw8sCcndabZq9rP8gY1DL6IXvfssNMRcWI&dib_tag=se&keywords=Devlin+Kings+Cops+Sadie+King&qid=1794334665&sr=8-1",
    },
    {
      id: 2,
      title: "Mountain Man's Obsession",
      subtitle: "Men of Maple Mountain",
      author: "Sadie King",
      format: "Mountain Man Romance",
      image: "/romance/romance2.webp",
      amazonUrl: "https://www.amazon.com/dp/B09TKNBFC7",
    },
    {
      id: 3,
      title: "Mason",
      subtitle: "King's Cops",
      author: "Sadie King",
      format: "Contemporary Romance",
      image: "/romance/romance3.jpg",
      amazonUrl:
        "https://www.amazon.com/Mason-Police-Romance-Kings-Cops-ebook/dp/B08WS4RPYT/ref=sr_1_1?dib=eyJ2IjoiMSJ9.5oCEtmPhInA3epTi_MvznCWcLWymlZ02CCbfgcabAtzECWEqUR1-uCTTlu9JNEGf.m4PJWn4tDI_UOHm2tegfdq4BGuJ1yn04RRERuLcrsGs&dib_tag=se&keywords=Mason+Kings+Cops+Sadie+King&qid=1794334695&sr=8-1",
    },
    {
      id: 4,
      title: "Protecting His Brat",
      subtitle: "Sunset Security",
      author: "Sadie King",
      format: "Protective Hero Romance",
      image: "/romance/romance4.jpg",
      amazonUrl:
        "https://www.amazon.com/Protecting-His-Brat-romance-Security-ebook/dp/B0BG8H2C4X/ref=sr_1_1?dib=eyJ2IjoiMSJ9.quomnExy1HoNlARoSzZ9D2Ekx6MmefuiqbiwtI43hvUmbhHNazIcoSTHp-oDB5nSZfvaJ_1cmGIes2Qs9DkLG3k6ifEcao4IlPIV-ORvxDR0QeqosPGxVEZ0K2Qb8VK_isK8NL6QyoT7ty4SUi1iPQrVbl3kISUijV5hFm80VzE.7KHCDufQJWhT_pbeWOZIElkCwzaSyxIAeSenzSAlMQQ&dib_tag=se&keywords=Protecting+His+Brat+Sadie+King&qid=1794334718&sr=8-1",
    },
    {
      id: 5,
      title: "The Biker's Revenge",
      subtitle: "Underground Crows MC",
      author: "Sadie King",
      format: "Motorcycle Club Romance",
      image: "/romance/romance5.jpg",
      amazonUrl: "https://www.amazon.com/dp/B0B7PW89ZJ",
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
            Romance Literature
          </span>
        </nav>

        {/* PAGE HEADER */}

        <header className="border-b border-[#e5e5e5] pb-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex-1">
              <p className="text-[#8c2d19] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">
                Passionate Stories & Unforgettable Romance
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                Romance Literature
              </h1>

              <p className="text-[14px] text-[#525252] mt-2 max-w-2xl leading-relaxed">
                Discover captivating romance novels featuring
                protective heroes, mountain men, passionate
                relationships, motorcycle club adventures,
                and unforgettable love stories. Explore
                emotional journeys filled with attraction,
                devotion, suspense, and second chances.
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

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">

          {books.map((book) => (
            <article
              key={book.id}
              className="bg-[#ffffff] border border-[#e5e5e5] p-3 flex flex-col h-full"
            >

              {/* BOOK IMAGE */}

              <div className="w-full h-60 bg-[#f5f5f5] p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={book.image}
                  alt={`${book.title} by ${book.author}`}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* BOOK CATEGORY */}

              <div className="mt-3">
                <span className="inline-block text-[11px] font-semibold uppercase leading-snug text-[#8c2d19] tracking-wide">
                  {book.format}
                </span>
              </div>

              {/* BOOK INFORMATION */}

              <div className="flex flex-col flex-1 mt-2">

                <h2 className="text-[17px] font-bold text-[#1f1f1f] leading-[1.35]">
                  {book.title}
                </h2>

                <p className="text-[12px] text-[#595959] mt-1 leading-snug">
                  {book.subtitle}
                </p>

                <p className="text-[13px] text-[#595959] italic mt-2 leading-snug">
                  by {book.author}
                </p>

                {/* AMAZON VIEW BOOK BUTTON */}

                <div className="mt-auto pt-4">
                  <div className="border-t border-[#e5e5e5] pt-3">

                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Find ${book.title} by ${book.author} on Amazon`}
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
