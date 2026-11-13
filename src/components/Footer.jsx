
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";

import footerLogo from "../assets/footer logo.png";

// ================================================
// FOOTER NAVIGATION - 4 COLUMNS, 5 LINKS EACH
// ================================================

const footerSections = [
  {
    heading: "Literature & Classics",
    links: [
      {
        name: "Biography & Memoir",
        path: "/biography-memoir",
      },
      {
        name: "Literary & Classic Fiction",
        path: "/literary-classic-fiction",
      },
      {
        name: "Poetry & Fine Verse",
        path: "/poetry-fine-verse",
      },
      {
        name: "Historical Fiction",
        path: "/historical-fiction",
      },
      {
        name: "Romance Literature",
        path: "/romance-literature",
      },
    ],
  },
  {
    heading: "Thought, Science & Arts",
    links: [
      {
        name: "Theology & Philosophy",
        path: "/theology-philosophy",
      },
      {
        name: "Ancient & World History",
        path: "/ancient-world-history",
      },
      {
        name: "Science Fiction & Fantasy",
        path: "/science-fiction-fantasy",
      },
      {
        name: "Fine Arts & Photography",
        path: "/fine-arts-photography",
      },
      {
        name: "Natural History & Wildlife",
        path: "/natural-history-wildlife",
      },
    ],
  },
  {
    heading: "Rare & Antiquarian",
    links: [
      {
        name: "Antiquarian Leatherbounds",
        path: "/antiquarian-leatherbounds",
      },
      {
        name: "The Art of Fine Printing",
        path: "/art-fine-printing",
      },
      {
        name: "Fine Arts & Folios",
        path: "/fine-arts-folios",
      },
      {
        name: "Ancient & Medieval History",
        path: "/ancient-medieval-history",
      },
      {
        name: "Law, Finance & Statecraft",
        path: "/law-finance-statecraft",
      },
    ],
  },
  {
    heading: "Special Collections",
    links: [
      {
        name: "Hobbies, Crafts & Guilds",
        path: "/hobbies-crafts-guilds",
      },
      {
        name: "Sports & Natural Pursuits",
        path: "/sports-natural-pursuits",
      },
      {
        name: "Wax Cylinders & Recordings",
        path: "/wax-cylinders-recordings",
      },
      {
        name: "Historic Cookery Treatises",
        path: "/historic-cookery-treatises",
      },
      {
        name: "Vintage Maps & Atlases",
        path: "/vintage-maps-atlases",
      },
    ],
  },
];

export default function Footer() {
  const location = useLocation();

  // SCROLL TO TOP ON PAGE CHANGE

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleFooterNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer
      className="w-full bg-black text-white text-xs border-t border-[#333333]"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >

      {/* ================================================
          1. LOGO AND BRAND INFORMATION
      ================================================ */}

      <div className="w-full bg-black border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* LOGO AND DESCRIPTION */}

            <div className="lg:col-span-12 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">

              {/* BRAND LOGO */}

              <Link
                to="/"
                onClick={handleFooterNavigation}
                aria-label="Longstreet Press home"
                className="shrink-0 flex items-center justify-center"
              >
                <img
                  src={footerLogo}
                  alt="Longstreet Press"
                  loading="lazy"
                  className="block w-auto h-auto max-w-[230px] sm:max-w-[260px] max-h-[110px] object-contain"
                />
              </Link>

              {/* BRAND CONTENT */}

              <div className="flex-1">

                <h3 className="text-2xl font-bold text-white leading-snug">
                  Preserving Stories, Inspiring Generations
                </h3>

                <p className="text-[14px] text-[#d4d4d4] mt-2 leading-relaxed max-w-xl">
                  A curated collection of rare books, literary
                  classics, historical works, fine art editions,
                  and manuscripts. At Longstreet Press, we
                  celebrate literature, knowledge, and the
                  lasting legacy of the written word.
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ================================================
          2. FOOTER PAGE DIRECTORY
      ================================================ */}

      <div className="w-full bg-black">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* FOUR COLUMNS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {footerSections.map((section, index) => (

              <div
                key={index}
                className="flex flex-col"
              >

                {/* COLUMN HEADING */}

                <h4 className="text-[13px] font-sans font-semibold text-white mb-3">
                  {section.heading}
                </h4>

                {/* COLUMN LINKS */}

                <div className="flex flex-col gap-2.5 font-sans text-[13px]">

                  {section.links.map((item, itemIndex) => (

                    <Link
                      key={itemIndex}
                      to={item.path}
                      onClick={handleFooterNavigation}
                      className="text-[#d4d4d4] hover:text-white hover:underline underline-offset-2 leading-relaxed"
                    >
                      {item.name}
                    </Link>

                  ))}

                </div>

              </div>

            ))}

          </div>

          {/* QUICK NAVIGATION SECTION REMOVED */}

        </div>
      </div>

      {/* ================================================
          3. BOTTOM FOOTER
      ================================================ */}

      <div className="bg-black py-6 border-t border-[#333333] font-sans text-[12px] text-[#d4d4d4]">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* BOTTOM LINKS - SUPPORT REMOVED */}

          <div className="flex flex-wrap items-center justify-center gap-3 text-center">

            <Link
              to="/"
              onClick={handleFooterNavigation}
              className="text-[#d4d4d4] hover:text-white hover:underline underline-offset-2"
            >
              Home
            </Link>

            <span aria-hidden="true">·</span>

            <Link
              to="/bookstores"
              onClick={handleFooterNavigation}
              className="text-[#d4d4d4] hover:text-white hover:underline underline-offset-2"
            >
              Bookstores
            </Link>

            <span aria-hidden="true">·</span>

            <Link
              to="/book-marketing"
              onClick={handleFooterNavigation}
              className="text-[#d4d4d4] hover:text-white hover:underline underline-offset-2"
            >
              Book Marketing
            </Link>

            {[
              { name: "Contact", path: "/contact" },
              { name: "Privacy", path: "/privacy" },
              { name: "Terms", path: "/terms" },
            ].map((link) => (
              <React.Fragment key={link.path}>
                <span aria-hidden="true">·</span>
                <Link
                  to={link.path}
                  onClick={handleFooterNavigation}
                  className="text-[#d4d4d4] hover:text-white hover:underline underline-offset-2"
                >
                  {link.name}
                </Link>
              </React.Fragment>
            ))}

          </div>

          {/* OFFICE ADDRESS */}

          <div className="flex items-center gap-2">

            <MapPin className="w-4 h-4 shrink-0" />

            <address className="not-italic leading-relaxed">
              <span className="block">
                2974 Hardman Ct NE
              </span>
              <span className="block">
                Atlanta, GA 30305-3425
              </span>
            </address>

          </div>

        </div>

        {/* ================================================
            COPYRIGHT
        ================================================ */}

        <div className="max-w-7xl mx-auto px-6 mt-5 pt-4 border-t border-[#333333] text-center text-[12px] text-[#a3a3a3]">

          <p>
            Copyright © {new Date().getFullYear()} Longstreet Press.
            All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}
