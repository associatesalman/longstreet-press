
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// ======================================================
// RARE COLLECTIBLES
// Updated book covers, titles and Amazon links
// No prices, hover animations or unrelated branding
// ======================================================

// SECTION 1 — GRAPHIC NOVELS

const comicBooks = [
  {
    id: 1,
    entry: "COLLECTION 01",
    title: "Emmanuel Just Wants to Die",
    author: "Talhí Briones & Karina Briones",
    format: "Indie Graphic Novel",
    image: "/comics/comic1.jpg",
    description:
      "Discover an independent graphic novel by Talhí Briones and Karina Briones, bringing a distinctive creative perspective to illustrated storytelling.",
    amazonUrl:
      "https://www.amazon.com/Emmanuel-Just-Wants-Talhi-Briones-ebook/dp/B087WXM5T9",
  },
  {
    id: 2,
    entry: "COLLECTION 02",
    title: "Cyber Fighter",
    author: "William Joseph Hill",
    format: "Sci-Fi Action Graphic Novel",
    image: "/comics/comic2.jpg",
    description:
      "Explore a science-fiction graphic novel that brings together futuristic themes, action-oriented storytelling, and imaginative visual narrative.",
    amazonUrl:
      "https://www.amazon.com/dp/B08ZL6X6W6",
  },
  {
    id: 3,
    entry: "COLLECTION 03",
    title: "1Y1 Son 10",
    author: "Tech Books for Kids",
    format: "Children's Graphic Novel",
    image: "/comics/comic3.jpg",
    description:
      "A children's graphic novel selection offering young readers an accessible introduction to illustrated storytelling and creative reading.",
    amazonUrl:
      "https://www.amazon.in/Makes-10-Teenagers-Understand-Different/dp/1974615286",
  },
  {
    id: 4,
    entry: "COLLECTION 04",
    title: "Lilwickidz Book 2",
    author: "Lilwickidz",
    format: "Children's Comic Book",
    image: "/comics/comic4.jpg",
    description:
      "Explore a colorful children's comic book featuring imaginative illustrations and playful storytelling for younger readers.",
    amazonUrl:
      "https://www.amazon.in/Lilwickidz-Comic-2-Darrian-Sullivan-ebook/dp/B07LFNZ54S",
  },
  {
    id: 5,
    entry: "COLLECTION 05",
    title: "The Demons of Angels: A Graphic Novel",
    author: "H.C. Gislason & Nick Romario",
    format: "Dark Graphic Novel",
    image: "/comics/comic5.jpg",
    description:
      "Discover a dark graphic novel exploring dramatic visual storytelling, atmospheric artwork, and imaginative fictional themes.",
    amazonUrl:
      "https://www.amazon.co.uk/Demons-Angels-Graphic-Novel-ebook/dp/B07BCXKMRZ",
  },
];

// SECTION 2 — UPDATED LITERARY COLLECTION

const fictionBooks = [
  {
    id: 1,
    title: "Vesta and Her Children",
    subtitle: "A Tale of the Fall of Rome",
    author: "Marcia Twain",
    format: "Historical Fiction",
    image: "/fiction/fiction1.webp",
    description:
      "A historical novel set against the fall of ancient Rome, exploring family, resilience, and the challenges of a changing civilization.",
    amazonUrl:
      "https://www.amazon.com/Vesta-Her-Children-Tale-Fall/dp/B0DKTKBY8N",
  },
  {
    id: 2,
    title: "The Illustrated Catholic Bible Companion",
    subtitle: "All 73 Books — One Story of Salvation",
    author: "Brendan Mulcahy",
    format: "Illustrated Catholic Bible Guide",
    image: "/Theology, Bibles/Theology, Bibles5.jpg",
    description:
      "An illustrated companion exploring all 73 books of the Catholic Bible and connecting Scripture through the story of salvation.",
    amazonUrl:
      "https://www.amazon.com/Illustrated-Catholic-Bible-Companion-Book/dp/B0HKD8QN1T",
  },
  {
    id: 3,
    title: "Mansfield Park",
    subtitle: "A Classic Novel",
    author: "Jane Austen",
    format: "Classic English Fiction",
    image: "/fiction/fiction3.jpg",
    description:
      "Jane Austen's enduring classic examining family relationships, morality, social expectations, and personal integrity.",
    amazonUrl:
      "https://www.amazon.com/Janeite-Journal-Mansfield-Park/dp/0996947833",
  },
  {
    id: 4,
    title: "The Tenth Symphony",
    subtitle: "",
    author: "Dean Evans",
    format: "Contemporary Literary Fiction",
    image: "/fiction/fiction4.jpg",
    description:
      "A contemporary literary work presented through a musical theme, offering readers an exploration of creative expression.",
    amazonUrl:
      "https://www.amazon.com/Tenth-Symphony-Dean-Evans-ebook/dp/B0CF8BL7PW",
  },
  {
    id: 5,
    title: "El collar de diamantes / The Diamond Necklace",
    subtitle: "Spanish Translation",
    author: "Guy de Maupassant",
    format: "Classic Short Fiction",
    image: "/fiction/fiction5.jpg",
    description:
      "A timeless story exploring ambition, appearances, sacrifice, and unexpected consequences, presented in Spanish translation.",
    amazonUrl:
      "https://www.amazon.com/diamantes-Diamond-Necklace-Maupassant-Translation-ebook/dp/B009Z1FBJU",
  },
];

// SECTION 3 — BIOGRAPHY & MEMOIR


const biographyBooks = [
  {
    id: 1,
    entry: "NO. 01",
    title: "Better Late Than Never: Transitioning Late in Life",
    subtitle: "A Transgender Autobiography",
    author: "Kristy McClellan",
    format: "Autobiography & Personal Journey",
    image: "/biography/biography1.jpg",
    description:
      "A personal autobiography exploring identity, self-discovery, and the experience of transitioning later in life. Kristy McClellan shares a deeply personal journey of change and individual growth.",
    amazonUrl:
      "https://www.amazon.com/Better-Late-Than-Never-Transitioning-ebook/dp/B085LV28RK",
  },
  {
    id: 2,
    entry: "NO. 02",
    title: "Love Me",
    subtitle:
      "A Memoir of Online Dating, Mental Illness and Redemption",
    author: "Oshun Reed",
    format: "Personal Memoir & Redemption",
    image: "/biography/biography2.jpg",
    description:
      "A personal memoir examining online dating, emotional struggles, mental health, and the search for meaningful relationships. A story centered on personal experiences and redemption.",
    amazonUrl:
      "https://www.amazon.com/Love-Me-Memoir-Illness-Redemption-ebook/dp/B0DG655JHW",
  },
  {
    id: 3,
    entry: "NO. 03",
    title: "The Corfu Diaries: One Way Ticket to Paradise",
    subtitle: "A Travel Memoir",
    author: "Mike O'Toole",
    format: "Travel Memoir & Adventure",
    image: "/biography/biography3.jpg",
    description:
      "A travel memoir following a journey associated with the Greek island of Corfu. Explore the excitement of new experiences, unfamiliar surroundings, and the possibilities of a different way of life.",
    amazonUrl:
      "https://www.amazon.com/Corfu-Diaries-Travel-Memoir-Starting-ebook/dp/B0GX2YQT2W",
  },
  {
    id: 4,
    entry: "NO. 04",
    title: "Good Trouble on the High Seas",
    subtitle: "A Memoir",
    author: null,
    format: "Maritime Memoir & Sea Adventures",
    image: "/biography/biography4.jpg",
    description:
      "A maritime memoir inviting readers into a world of ocean journeys, life at sea, and personal experiences shaped by adventure and unexpected challenges.",
    amazonUrl:
      "https://www.amazon.com/Good-Trouble-High-Seas-Memoir-ebook/dp/B0F6BNP924",
  },
  {
    id: 5,
    entry: "NO. 05",
    title: "Strange Tribe",
    subtitle: "A Family Memoir",
    author: "John Hemingway",
    format: "Family History & Memoir",
    image: "/biography/biography5.jpg",
    description:
      "John Hemingway explores family history, relationships, identity, and the influence of an extraordinary literary legacy in this personal family memoir.",
    amazonUrl:
      "https://www.amazon.co.uk/Strange-Tribe-family-John-Hemingway-ebook/dp/B081ZL8YDJ",
  },
];



// ======================================================
// REUSABLE BOOK COVER
// ======================================================

function BookCover({
  book,
  className = "",
}) {
  return (
    <div
      className={`
        bg-[#f5f5f5]
        border border-[#e5e5e5]
        p-2 overflow-hidden
        flex items-center justify-center
        ${className}
      `}
    >
      <img
        src={book.image}
        alt={`${book.title} by ${book.author}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// ======================================================
// AMAZON VIEW BOOK BUTTON
// ======================================================

function ViewBookButton({
  book,
  fullWidth = false,
}) {
  return (
    <a
      href={book.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${book.title} on Amazon`}
      className={`inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 font-sans text-center no-underline rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold ${fullWidth ? "w-full" : ""}`}
    >
      View Book
      <ArrowUpRight size={15} />
    </a>
  );
}

// ======================================================
// REUSABLE CATEGORY LABEL
// ======================================================

function CategoryLabel({ children }) {
  return (
    <span className="inline-block self-start text-[11px] font-sans font-semibold uppercase text-[#8c2d19] leading-snug tracking-wide">
      {children}
    </span>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function RareCollectibles() {
  return (
    <main
      className="w-full bg-[#ffffff] text-[#1f1f1f]"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-14">

        {/* ==========================================
            SECTION 1 — GRAPHIC NOVELS
        ========================================== */}

        <section>

          {/* HEADER */}

          <div className="mb-7">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

              <div className="max-w-3xl">

                <p className="text-[#8c2d19] text-[12px] font-sans font-semibold uppercase tracking-wide mb-2">
                  Illustrated Literature
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Graphic Novels & Illustrated Adventures
                </h2>

                <p className="text-sm text-[#595959] leading-7 mt-3">
                  Graphic storytelling, fantasy adaptations,
                  Japanese manga, and illustrated adventures,
                  with memorable characters and imaginative
                  worlds brought to life through art.
                </p>

              </div>

              <Link
                to="/graphic-novels-manga"
                className="shrink-0 text-[14px] font-sans font-semibold text-[#8c2d19] underline underline-offset-4 hover:text-[#6e2312]"
              >
                See all graphic novels
              </Link>

            </div>

          </div>

          {/* COMIC COLLECTION */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">

            {comicBooks.map((book) => (
              <article
                key={book.id}
                className="bg-[#ffffff] border border-[#e5e5e5] p-3 flex flex-col h-full min-w-0"
              >

                <BookCover
                  book={book}
                  className="w-full h-60"
                />

                <div className="flex flex-col flex-1 mt-3">

                  <CategoryLabel>
                    {book.format}
                  </CategoryLabel>

                  <h3 className="text-[17px] font-bold text-[#1f1f1f] mt-3 leading-snug">
                    {book.title}
                  </h3>

                  <p className="text-[13px] text-[#595959] italic mt-2 leading-snug">
                    by {book.author}
                  </p>

                  <p className="text-[12px] text-[#595959] mt-3 leading-6">
                    {book.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <div>
                      <ViewBookButton
                        book={book}
                        fullWidth
                      />
                    </div>
                  </div>

                </div>

              </article>
            ))}

          </div>

        </section>

        {/* ==========================================
            SECTION 2 — UPDATED COLLECTOR'S LIBRARY
        ========================================== */}

        <section>

          <div className="mb-7">

            <p className="text-[#8c2d19] font-sans font-semibold text-[12px] uppercase tracking-wide mb-2">
              Collector's Library
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f]">
              Literature, History & Illustrated Editions
            </h2>

            <p className="text-sm text-[#595959] leading-7 mt-3 max-w-3xl">
              Selected works that connect historical
              storytelling, literary heritage, religious
              traditions, and illustrated publishing, each
              with its own perspective on culture,
              literature, and the human experience.
            </p>

          </div>

          {/* TWO FEATURED BOOKS */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* BOOK 1 — VESTA */}

            <article className="bg-white border border-[#e5e5e5] p-4 sm:p-5 flex flex-col">

              <div className="flex flex-col sm:flex-row gap-5 flex-1 items-start">

                <BookCover
                  book={fictionBooks[0]}
                  className="w-36 h-52 shrink-0 mx-auto sm:mx-0"
                />

                <div className="flex-1 min-w-0">

                                    <CategoryLabel>
                    {fictionBooks[0].format}
                  </CategoryLabel>

                  <h3 className="text-xl font-bold mt-3 leading-tight">
                    {fictionBooks[0].title}
                  </h3>

                  <p className="text-[12px] text-[#595959] mt-2">
                    {fictionBooks[0].subtitle}
                  </p>

                  <p className="text-[13px] text-[#595959] italic mt-2">
                    by {fictionBooks[0].author}
                  </p>

                  <p className="text-[13px] text-[#595959] mt-3 leading-6">
                    {fictionBooks[0].description}
                  </p>

                </div>

              </div>

              <div className="mt-5">
                <ViewBookButton
                  book={fictionBooks[0]}
                  fullWidth
                />
              </div>

            </article>

            {/* BOOK 2 — ILLUSTRATED CATHOLIC BIBLE */}

            <article className="bg-white border border-[#e5e5e5] p-4 sm:p-5 flex flex-col">

              <div className="flex flex-col sm:flex-row gap-5 flex-1 items-start">

                <BookCover
                  book={fictionBooks[1]}
                  className="w-36 h-52 shrink-0 mx-auto sm:mx-0"
                />

                <div className="flex-1 min-w-0">

                                    <CategoryLabel>
                    {fictionBooks[1].format}
                  </CategoryLabel>

                  <h3 className="text-xl font-bold mt-3 leading-tight">
                    {fictionBooks[1].title}
                  </h3>

                  <p className="text-[12px] text-[#595959] mt-2">
                    {fictionBooks[1].subtitle}
                  </p>

                  <p className="text-[13px] text-[#595959] italic mt-2">
                    by {fictionBooks[1].author}
                  </p>

                  <p className="text-[13px] text-[#595959] mt-3 leading-6">
                    {fictionBooks[1].description}
                  </p>

                </div>

              </div>

              <div className="mt-5">
                <ViewBookButton
                  book={fictionBooks[1]}
                  fullWidth
                />
              </div>

            </article>

          </div>

          <div className="text-center mt-6">

            <Link
              to="/literary-classic-fiction"
              className="inline-block text-[#8c2d19] font-sans text-[14px] font-semibold underline underline-offset-4 hover:text-[#6e2312]"
            >
              Browse literary collections
            </Link>

          </div>

        </section>

        {/* ==========================================
            SECTION 3 — BIOGRAPHY & MEMOIR
        ========================================== */}

        <section>

          {/* HEADING */}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-7">

            <div className="max-w-3xl">

              <p className="text-[#8c2d19] font-sans font-semibold text-[12px] uppercase tracking-wide mb-2">
                Lives & Personal Journeys
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f1f1f] leading-tight">
                Biographies, Memoirs & Remarkable Lives
              </h2>

              <p className="text-sm text-[#595959] leading-7 mt-3">
                The lives and experiences of public
                figures and individuals whose journeys
                offer insight into history, ambition,
                identity, and culture.
              </p>

            </div>

            <Link
              to="/biography-memoir"
              className="text-[14px] font-sans font-semibold text-[#8c2d19] underline underline-offset-4 hover:text-[#6e2312] shrink-0"
            >
              See all biography & memoir
            </Link>

          </div>

          {/* FIRST TWO LARGE CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

            {biographyBooks.slice(0, 2).map((book) => (

              <article
                key={book.id}
                className="bg-[#ffffff] border border-[#e5e5e5] p-4 sm:p-5 flex flex-col sm:flex-row gap-5"
              >

                <BookCover
                  book={book}
                  className="w-36 h-52 shrink-0 mx-auto sm:mx-0"
                />

                <div className="flex-1 min-w-0 flex flex-col">

                  <div>
                    <CategoryLabel>
                      {book.format}
                    </CategoryLabel>
                  </div>

                  <h3 className="text-xl font-bold text-[#1f1f1f] mt-3 leading-tight">
                    {book.title}
                  </h3>

                  <p className="text-[13px] text-[#595959] italic mt-2">
                    by {book.author}
                  </p>

                  <div className="mt-auto pt-5">
                    <div>
                      <ViewBookButton book={book} />
                    </div>
                  </div>

                </div>

              </article>

            ))}

          </div>

          {/* THREE SMALLER CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">

            {biographyBooks.slice(2).map((book) => (

              <article
                key={book.id}
                className="bg-[#ffffff] border border-[#e5e5e5] p-4 flex flex-col h-full"
              >

                <BookCover
                  book={book}
                  className="w-full h-52 mb-4"
                />

                <div className="flex flex-col flex-1">

                  <CategoryLabel>
                    {book.format}
                  </CategoryLabel>

                  <h3 className="text-lg font-bold text-[#1f1f1f] mt-3 leading-snug">
                    {book.title}
                  </h3>

                  <p className="text-sm text-[#595959] italic mt-2">
                    by {book.author}
                  </p>

                  <div className="mt-auto pt-5">
                    <div>
                      <ViewBookButton
                        book={book}
                        fullWidth
                      />
                    </div>
                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* ==========================================
            SECTION 4 — UPDATED LITERARY HERITAGE
        ========================================== */}

        <section>

          <div className="mb-7">

            <p className="text-[#8c2d19] text-[12px] font-sans font-semibold tracking-wide uppercase mb-2">
              Literary Heritage
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Classics, Music & Timeless Short Fiction
            </h2>

            <p className="text-sm text-[#595959] mt-3 leading-7 max-w-3xl">
              Classic English literature, contemporary
              literary writing, and celebrated short
              fiction.
            </p>

          </div>

          {/* THREE UPDATED BOOKS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">

            {fictionBooks.slice(2).map((book) => (

              <article
                key={book.id}
                className="bg-[#ffffff] border border-[#e5e5e5] p-4 flex flex-col h-full"
              >

                <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-4 flex-1 items-start">

                  <BookCover
                    book={book}
                    className="w-32 h-48 shrink-0 mx-auto sm:mx-0"
                  />

                  <div className="flex-1 min-w-0">

                    <CategoryLabel>
                      {book.format}
                    </CategoryLabel>

                    <h3 className="text-lg font-bold text-[#1f1f1f] leading-snug mt-3">
                      {book.title}
                    </h3>

                    {book.subtitle && (
                      <p className="text-xs text-[#595959] mt-2">
                        {book.subtitle}
                      </p>
                    )}

                    <p className="text-[13px] text-[#595959] italic mt-2">
                      by {book.author}
                    </p>

                    <p className="text-[12px] text-[#595959] mt-3 leading-6">
                      {book.description}
                    </p>

                  </div>

                </div>

                <div className="mt-auto pt-5">
                  <div>
                    <ViewBookButton
                      book={book}
                      fullWidth
                    />
                  </div>
                </div>

              </article>

            ))}

          </div>

          <div className="text-center mt-6">

            <Link
              to="/literary-classic-fiction"
              className="inline-flex items-center gap-2 text-[14px] font-sans font-semibold text-[#8c2d19] underline underline-offset-4 hover:text-[#6e2312]"
            >
              See all literary classics
              <ArrowUpRight size={14} />
            </Link>

          </div>

        </section>


      </div>
    </main>
  );
}
