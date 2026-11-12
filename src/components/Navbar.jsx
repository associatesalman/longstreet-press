
import React, { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  BookOpen,
  Gift,
  Truck,
  Landmark,
  Tag,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

import longstreetLogo from "../assets/longstreet logo.png";
import { browseGroups, rareGroups } from "../data/siteNavigation";

// ======================================================
// ALL SEARCHABLE WEBSITE PAGES
// ======================================================

const searchablePages = [
  // MAIN PAGES
  { name: "Home", path: "/" },
  { name: "Book Stores", path: "/bookstores" },
  { name: "Book Marketing", path: "/book-marketing" },
  { name: "Collector Support", path: "/contact" },
  { name: "Advanced Search Options", path: "/advanced-search" },
  { name: "About Longstreet Press", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Use", path: "/terms" },

  // DROPDOWNS
  { name: "Browse Books", dropdown: "browse" },
  { name: "Rare & Antiquarian", dropdown: "rare" },

  // ALL CATEGORY PAGES
  ...[...browseGroups, ...rareGroups].flatMap((group) => group.links),
];

const mobileSections = [
  { id: "browse", title: "Browse Books", groups: browseGroups },
  { id: "rare", title: "Rare & Antiquarian", groups: rareGroups },
];

// ======================================================
// SEARCH NORMALIZATION
// Supports capital, small and partial words
// ======================================================

const normalizeText = (value) => {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
};

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchError, setSearchError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Close menus after any navigation (desktop dropdowns stay open on touch devices otherwise).
  const [menuPath, setMenuPath] = useState(location.pathname);
  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname);
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  // ======================================================
  // ORIGINAL DROPDOWN FUNCTION
  // ======================================================

  const toggleDropdown = (name) => {
    setActiveDropdown((current) =>
      current === name ? null : name
    );
  };

  // ======================================================
  // LIVE SEARCH
  // ======================================================

  const filteredPages = useMemo(() => {
    const query = normalizeText(searchQuery);

    if (!query) return [];

    const queryWords = query.split(" ");

    return searchablePages
      .filter((page) => {
        if (!page || !page.name) return false;

        const name = normalizeText(page.name);
        const path = normalizeText(page.path || "");

        return (
          name.includes(query) ||
          path.includes(query) ||
          queryWords.every(
            (word) =>
              name.includes(word) || path.includes(word)
          )
        );
      })
      .sort((a, b) => {
        const nameA = normalizeText(a.name);
        const nameB = normalizeText(b.name);

        const getScore = (name) => {
          if (name === query) return 0;
          if (name.startsWith(query)) return 1;

          if (
            name.split(" ").some((word) =>
              word.startsWith(query)
            )
          ) {
            return 2;
          }

          return 3;
        };

        return getScore(nameA) - getScore(nameB);
      });
  }, [searchQuery]);

  // ======================================================
  // OPEN PAGE
  // ======================================================

  const openPage = (page) => {
    if (!page) return;

    setSearchQuery("");
    setSearchError("");
    setShowSuggestions(false);
    setSelectedIndex(-1);

    if (page.dropdown) {
      // Small screens use the mobile menu instead of the desktop mega-menu panels.
      if (window.matchMedia("(max-width: 767px)").matches) {
        setMobileOpen(true);
        setMobileSection(page.dropdown);
      } else {
        setActiveDropdown(page.dropdown);
      }
    } else if (page.path) {
      setActiveDropdown(null);
      navigate(page.path);
      window.scrollTo(0, 0);
    }
  };

  // ======================================================
  // SEARCH BUTTON / ENTER
  // ======================================================

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchError(
        "Please enter a page or category name."
      );
      return;
    }

    const page =
      selectedIndex >= 0 &&
      selectedIndex < filteredPages.length
        ? filteredPages[selectedIndex]
        : filteredPages[0];

    if (page) {
      openPage(page);
    } else {
      setSearchError("No matching page found.");
      setShowSuggestions(true);
    }
  };

  // ======================================================
  // KEYBOARD SEARCH NAVIGATION
  // ======================================================

  const handleSearchKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (!filteredPages.length) return;

      e.preventDefault();
      setShowSuggestions(true);

      setSelectedIndex((previous) =>
        previous < filteredPages.length - 1
          ? previous + 1
          : 0
      );
    }

    if (e.key === "ArrowUp") {
      if (!filteredPages.length) return;

      e.preventDefault();
      setShowSuggestions(true);

      setSelectedIndex((previous) =>
        previous > 0
          ? previous - 1
          : filteredPages.length - 1
      );
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <header
      className="w-full bg-[#fbf8f2] text-[#2c241e] border-b-2 border-[#d6c7b2] font-serif"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setActiveDropdown(null);
          setMobileOpen(false);
        }
      }}
    >

      {/* ==================================================
          1. TOP ANNOUNCEMENT BAR
      ================================================== */}

      <div className="bg-[#241a15] text-[#e8dfcf] text-[11px] py-1.5 px-6 border-b border-[#c29b38] font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">

          <div className="tracking-widest uppercase text-gray-300">
            Longstreet Press — Rare, Antiquarian & Collectible Books
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#c29b38] font-semibold tracking-wide">
  A World of Timeless Stories
</span>

            <span className="text-gray-500">|</span>

            <div className="flex items-center gap-1 font-semibold text-[#e8dfcf]">
              <span>USD ($)</span>
            </div>
          </div>

        </div>
      </div>

      {/* ==================================================
          2. MAIN HEADER
      ================================================== */}

      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-6">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center shrink-0"
          aria-label="Longstreet Press home"
        >
          <img
            src={longstreetLogo}
            alt="Longstreet Press"
            className="block w-auto h-auto max-h-[76px] max-w-[260px] sm:max-w-[390px] md:max-w-[480px] object-contain"
          />
        </Link>

        {/* ==================================================
            SEARCH SECTION
        ================================================== */}

        <div className="flex flex-col items-end gap-1 font-sans relative">

          <form
            onSubmit={handleSearch}
            role="search"
            className="flex border-2 border-[#b8a68f] bg-white rounded-none shadow-inner"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
                setSelectedIndex(-1);
                setSearchError("");
              }}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setShowSuggestions(true);
                }
              }}
              onKeyDown={handleSearchKeyDown}
              onBlur={() => {
                setShowSuggestions(false);
              }}
              placeholder="Search pages, categories..."
              className="px-3 py-1.5 text-xs w-64 sm:w-80 md:w-96 outline-none text-[#241a15] placeholder-stone-400 bg-transparent font-serif"
              aria-label="Search website pages"
              aria-autocomplete="list"
              aria-expanded={
                showSuggestions && !!searchQuery.trim()
              }
              aria-controls="navbar-search-results"
              autoComplete="off"
            />

            <button
              type="submit"
              className="bg-[#382b22] hover:bg-[#241a15] px-4 flex items-center justify-center text-[#e8dfcf]"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* ==================================================
              LIVE AUTOCOMPLETE SUGGESTIONS
          ================================================== */}

          {showSuggestions && searchQuery.trim() && (
            <div
              id="navbar-search-results"
              role="listbox"
              className="absolute top-[40px] left-0 w-full bg-[#fdfbf7] border-2 border-[#b8a68f] shadow-xl z-[100] max-h-[320px] overflow-y-auto"
            >
              {filteredPages.length > 0 ? (
                <>
                  <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-[#8c2d19] border-b border-[#e2d7c5]">
                    Matching Pages ({filteredPages.length})
                  </div>

                  {filteredPages.map((page, index) => (
                    <button
                      key={page.name}
                      type="button"
                      role="option"
                      aria-selected={selectedIndex === index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onClick={() => openPage(page)}
                      className={`w-full flex items-center gap-3 px-3 py-3 text-left border-b border-[#eee5d9] text-[12px] ${
                        selectedIndex === index
                          ? "bg-[#efe8db] text-[#8c2d19]"
                          : "bg-[#fdfbf7] text-[#241a15]"
                      }`}
                    >
                      <Search
                        size={13}
                        className="text-[#8c7355] shrink-0"
                      />

                      <span className="flex-1 font-semibold">
                        {page.name}
                      </span>

                      <ArrowUpRight
                        size={13}
                        className="text-[#8c7355] shrink-0"
                      />
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-4 py-4 text-[12px] text-[#7a6452]">
                  No matching pages found.
                </div>
              )}
            </div>
          )}

          {/* SEARCH ERROR MESSAGE */}

          {searchError && (
            <p className="text-[11px] text-[#8c2d19] font-serif">
              {searchError}
            </p>
          )}

          {/* ADVANCED SEARCH */}

          <Link
            to="/advanced-search"
            className="text-[11px] text-[#8c2d19] hover:underline font-serif italic pr-1"
          >
            * Advanced Search Options
          </Link>

        </div>
      </div>

      {/* ==================================================
          3. NAVIGATION BAR
      ================================================== */}

      <div className="border-t border-[#dfd4c3] bg-[#f4eee2] relative shadow-sm">

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center text-xs tracking-wider uppercase font-semibold">
          {/* MOBILE MENU TOGGLE (below md) */}

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden py-3 flex items-center gap-2 text-[#241a15] hover:text-[#8c2d19] uppercase tracking-wider font-semibold"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            {mobileOpen ? "Close Menu" : "Menu"}
          </button>

          <nav aria-label="Main" className="hidden md:flex items-center justify-center gap-6 sm:gap-9">

            {/* HOME */}

            <Link
              to="/"
              className="py-3 text-[#241a15] hover:text-[#8c2d19]"
            >
              Home
            </Link>

            {/* BROWSE BOOKS DROPDOWN */}

            <div
              className="relative"
              onMouseEnter={() =>
                setActiveDropdown("browse")
              }
            >
              <button
                onClick={() => toggleDropdown("browse")}
                className={`py-3 flex items-center gap-1 hover:text-[#8c2d19] ${
                  activeDropdown === "browse"
                    ? "text-[#8c2d19] border-b-2 border-[#8c2d19]"
                    : "text-[#241a15]"
                }`}
              >
                Browse Books
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* RARE BOOKS DROPDOWN */}

            <div
              className="relative"
              onMouseEnter={() =>
                setActiveDropdown("rare")
              }
            >
              <button
                onClick={() => toggleDropdown("rare")}
                className={`py-3 flex items-center gap-1 hover:text-[#8c2d19] ${
                  activeDropdown === "rare"
                    ? "text-[#8c2d19] border-b-2 border-[#8c2d19]"
                    : "text-[#241a15]"
                }`}
              >
                Rare & Antiquarian
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* BOOKSTORES */}

            <Link
              to="/bookstores"
              className="py-3 text-[#241a15] hover:text-[#8c2d19]"
            >
              Bookstores
            </Link>

            {/* BOOK MARKETING */}

            <Link
              to="/book-marketing"
              className="py-3 text-[#241a15] hover:text-[#8c2d19]"
            >
              Book Marketing
            </Link>

          </nav>
        </div>

        {/* ==================================================
            MOBILE MENU PANEL (below md)
        ================================================== */}

        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="md:hidden border-t border-[#dfd4c3] bg-[#fdfbf7] text-[13px] font-serif normal-case max-h-[75vh] overflow-y-auto"
          >
            <Link to="/" className="block px-6 py-3 border-b border-[#e2d7c5] text-[#241a15] font-semibold uppercase tracking-wider text-xs">
              Home
            </Link>

            {mobileSections.map((section) => {
              const open = mobileSection === section.id;
              return (
                <div key={section.id} className="border-b border-[#e2d7c5]">
                  <button
                    type="button"
                    onClick={() => setMobileSection(open ? null : section.id)}
                    aria-expanded={open}
                    className={`w-full px-6 py-3 flex items-center justify-between uppercase tracking-wider font-semibold text-xs ${
                      open ? "text-[#8c2d19]" : "text-[#241a15]"
                    }`}
                  >
                    {section.title}
                    <ChevronDown className={`w-3.5 h-3.5 ${open ? "rotate-180" : ""}`} />
                  </button>

                  {open && (
                    <div className="px-6 pb-4 space-y-4">
                      {section.groups.map((group) => (
                        <div key={group.heading}>
                          <h5 className="text-[11px] tracking-wider uppercase font-bold text-[#241a15] pb-2 mb-2 border-b border-[#e2d7c5] font-sans">
                            {group.heading}
                          </h5>
                          <div className="flex flex-col text-[#45362b]">
                            {group.links.map((link) => (
                              <Link key={link.path} to={link.path} className="py-1.5 hover:text-[#8c2d19] hover:underline">
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {[
              { name: "Bookstores", path: "/bookstores" },
              { name: "Book Marketing", path: "/book-marketing" },
              { name: "Advanced Search", path: "/advanced-search" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-6 py-3 border-b border-[#e2d7c5] text-[#241a15] hover:text-[#8c2d19] font-semibold uppercase tracking-wider text-xs"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}

        {/* ==================================================
            BROWSE BOOKS DROPDOWN PANEL
        ================================================== */}

        {activeDropdown === "browse" && (
          <div
            onMouseLeave={() => setActiveDropdown(null)}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full w-full max-w-5xl bg-[#fdfbf7] border-2 border-[#b8a68f] shadow-2xl z-50 text-xs normal-case overflow-hidden p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* COLUMN 1: LITERATURE & CLASSICS */}

              <div>
                <h5 className="text-[11px] tracking-wider uppercase font-bold text-[#241a15] pb-2 mb-3 border-b border-[#e2d7c5] font-sans">
                  Literature & Classics
                </h5>

                <div className="flex flex-col gap-2 text-[#45362b]">

                  <Link
                    to="/biography-memoir"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Biography & Memoir
                  </Link>

                  <Link
                    to="/literary-classic-fiction"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Literary & Classic Fiction
                  </Link>

                  <Link
                    to="/poetry-fine-verse"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Poetry & Fine Verse
                  </Link>

                  <Link
                    to="/historical-fiction"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Historical Fiction
                  </Link>

                  <Link
                    to="/graphic-novels-manga"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Graphic Novels & Manga
                  </Link>

                  <Link
                    to="/romance-literature"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Romance Literature
                  </Link>

                </div>
              </div>

              {/* COLUMN 2: THOUGHT & SCIENCE */}

              <div>
                <h5 className="text-[11px] tracking-wider uppercase font-bold text-[#241a15] pb-2 mb-3 border-b border-[#e2d7c5] font-sans">
                  Thought & Science
                </h5>

                <div className="flex flex-col gap-2 text-[#45362b]">

                  <Link
                    to="/theology-philosophy"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Theology & Philosophy
                  </Link>

                  <Link
                    to="/ancient-world-history"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Ancient & World History
                  </Link>

                  <Link
                    to="/science-fiction-fantasy"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Science Fiction & Fantasy
                  </Link>

                  <Link
                    to="/crime-thriller-mystery"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Crime, Thriller & Mystery
                  </Link>

                  <Link
                    to="/humanities-social-sciences"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Humanities & Social Sciences
                  </Link>

                  <Link
                    to="/scholarly-educational"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Scholarly & Educational
                  </Link>

                </div>
              </div>

              {/* COLUMN 3: ARTS & SPECIAL INTERESTS */}

              <div>
                <h5 className="text-[11px] tracking-wider uppercase font-bold text-[#241a15] pb-2 mb-3 border-b border-[#e2d7c5] font-sans">
                  Arts & Special Interests
                </h5>

                <div className="flex flex-col gap-2 text-[#45362b]">

                  <Link
                    to="/fine-arts-photography"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Fine Arts & Photography
                  </Link>

                  <Link
                    to="/gastronomy-culinary-arts"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Gastronomy & Culinary Arts
                  </Link>

                  <Link
                    to="/natural-history-wildlife"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Natural History & Wildlife
                  </Link>

                  <Link
                    to="/hobbies-crafts-guilds"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Hobbies, Crafts & Guilds
                  </Link>

                  <Link
                    to="/sports-natural-pursuits"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Sports & Natural Pursuits
                  </Link>

                  <Link
                    to="/childrens-illustrated"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Children's Illustrated
                  </Link>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================================================
            RARE & ANTIQUARIAN DROPDOWN PANEL
        ================================================== */}

        {activeDropdown === "rare" && (
          <div
            onMouseLeave={() => setActiveDropdown(null)}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full w-full max-w-5xl bg-[#fdfbf7] border-2 border-[#b8a68f] shadow-2xl z-50 text-xs normal-case overflow-hidden p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* COLUMN 1: CLASSICAL RARITIES */}

              <div>
                <h5 className="text-[11px] tracking-wider uppercase font-bold text-[#241a15] pb-2 mb-3 border-b border-[#e2d7c5] font-sans">
                  Classical Rarities
                </h5>

                <div className="flex flex-col gap-2 text-[#45362b]">

                  <Link
                    to="/antiquarian-leatherbounds"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Antiquarian Leatherbounds
                  </Link>

                  <Link
                    to="/art-fine-printing"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    The Art of Fine Printing
                  </Link>

                  <Link
                    to="/fine-arts-folios"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Fine Arts & Folios
                  </Link>

                  <Link
                    to="/ancient-medieval-history"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Ancient & Medieval History
                  </Link>

                  <Link
                    to="/law-finance-statecraft"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Law, Finance & Statecraft
                  </Link>

                  <Link
                    to="/vintage-childrens-classics"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Vintage Children's Classics
                  </Link>

                </div>
              </div>

              {/* COLUMN 2: PERIOD TREASURES */}

              <div>
                <h5 className="text-[11px] tracking-wider uppercase font-bold text-[#241a15] pb-2 mb-3 border-b border-[#e2d7c5] font-sans">
                  Period Treasures
                </h5>

                <div className="flex flex-col gap-2 text-[#45362b]">

                  <Link
                    to="/historic-cookery-treatises"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Historic Cookery Treatises
                  </Link>

                  <Link
                    to="/pamphlets-ephemera"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Pamphlets & Ephemera
                  </Link>

                  <Link
                    to="/oddities-curiosa-rarities"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Oddities, Curiosa & Rarities
                  </Link>

                  <Link
                    to="/natural-history-animals"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Natural History & Animals
                  </Link>

                  <Link
                    to="/nineteenth-century-literature"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Nineteenth-Century Literature
                  </Link>

                  <Link
                    to="/wax-cylinders-recordings"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Wax Cylinders & Recordings
                  </Link>

                </div>
              </div>

              {/* COLUMN 3: MANUSCRIPTS & SCIENCE */}

              <div>
                <h5 className="text-[11px] tracking-wider uppercase font-bold text-[#241a15] pb-2 mb-3 border-b border-[#e2d7c5] font-sans">
                  Manuscripts & Science
                </h5>

                <div className="flex flex-col gap-2 text-[#45362b]">

                  <Link
                    to="/theology-bibles-missals"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Theology, Bibles & Missals
                  </Link>

                  <Link
                    to="/early-science-astronomy"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Early Science & Astronomy
                  </Link>

                  <Link
                    to="/original-hand-signed-letters"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Original Hand-Signed Letters
                  </Link>

                  <Link
                    to="/genealogy-noble-heraldry"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Genealogy & Noble Heraldry
                  </Link>

                  <Link
                    to="/historic-games-sports"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Historic Games & Sports
                  </Link>

                  <Link
                    to="/vintage-maps-atlases"
                    className="hover:text-[#8c2d19] hover:underline"
                  >
                    Vintage Maps & Atlases
                  </Link>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </header>
  );
}
