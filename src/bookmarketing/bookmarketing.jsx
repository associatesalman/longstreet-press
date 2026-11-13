import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HONEYPOT_FIELD,
  MONTHLY_BUDGETS,
  PRIMARY_SERVICES,
  TARGET_MARKETS,
  emptyInquiry,
  validateInquiry,
} from "../lib/inquiry";

// Messages for each failure the server can report. None reveal provider details.
const SERVER_ERRORS = {
  "rate-limit": "We have received several submissions from your connection. Please wait a few minutes and try again.",
  unavailable: "Our inquiry desk is temporarily unavailable. Your details are still in the form; please try again later.",
  delivery: "We could not deliver your submission just now. Your details are still in the form; please try again shortly.",
};
const GENERIC_ERROR = "Something went wrong while sending your submission. Your details are still in the form; please try again.";

export default function MarketingPage() {
  // Book Marketing inquiries go to the server endpoint (server/inquiry.js), which emails
  // them over SMTP. The recipient address and credentials live only in server env vars.
  const [activeTab, setActiveTab] = useState("amazon");
  const [form, setForm] = useState(emptyInquiry);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [invalidFields, setInvalidFields] = useState({});
  // Synchronous guard so a double click cannot send two requests before React re-renders.
  const pending = useRef(false);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors([]);
    setSubmitted(false);
    setInvalidFields((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const showFieldErrors = (fieldErrors) => {
    setInvalidFields(fieldErrors);
    setErrors([...new Set(Object.values(fieldErrors))]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (pending.current) return;
    setErrors([]);
    setSubmitted(false);

    // Same rules the server applies (src/lib/inquiry.js).
    const { errors: fieldErrors } = validateInquiry(form);
    if (Object.keys(fieldErrors).length) {
      showFieldErrors(fieldErrors);
      return;
    }

    pending.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...form, [HONEYPOT_FIELD]: honeypot }),
      });

      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      // Success only when the server confirms the email provider accepted the message.
      if (response.ok && result?.ok === true) {
        setSubmitted(true);
        setInvalidFields({});
        setForm(emptyInquiry);
        setHoneypot("");
      } else if (result?.error === "validation" && result.errors && typeof result.errors === "object") {
        showFieldErrors(result.errors);
      } else {
        setErrors([SERVER_ERRORS[result?.error] ?? GENERIC_ERROR]);
      }
    } catch {
      setErrors(["Network error occurred. Your details are still in the form; please check your connection and try again."]);
    } finally {
      pending.current = false;
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name) =>
    `w-full rounded bg-white border ${invalidFields[name] ? "border-red-600" : "border-[#949494]"} px-3.5 py-2.5 text-[14px] text-[#1f1f1f] outline-none focus:border-[#8c2d19] focus:ring-2 focus:ring-[#8c2d19]/30`;

  // Links to /book-marketing#inquiry-desk (Contact, Privacy) open straight at the form,
  // after the global scroll-to-top on navigation has run.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== "#inquiry-desk") return undefined;
    const timer = setTimeout(() => {
      document.getElementById("inquiry-desk")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  const scrollToForm = () => {
    document.getElementById("inquiry-desk")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1f1f1f] selection:bg-[#8C2D19] selection:text-white">
      {/* Editorial Typography (Newsreader + Lora) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        
        .font-serif-heading {
          font-family: 'Newsreader', Georgia, serif;
          font-style: normal;
          letter-spacing: -0.015em;
        }
        .font-serif-body {
          font-family: 'Lora', Georgia, serif;
          font-style: normal;
        }
      `}</style>

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-4">
                Publishing and Book Marketing
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-[46px] font-bold leading-[1.18] font-serif-heading text-[#1f1f1f]">
                Book Publishing, Amazon Advertising, and Catalog Growth.
              </h1>

              <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] mt-6 leading-7 sm:leading-8 max-w-xl">
                From structural editing and classical interior typesetting to worldwide wholesale distribution,
                Amazon PPC management, and bespoke A+ Content, we provide an end-to-end publishing infrastructure
                for authors, university presses, and independent imprints.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToForm}
                  className="rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold py-3 px-6 cursor-pointer"
                >
                  Request a proposal
                </button>
                <a
                  href="#publishing-suite"
                  className="rounded border border-[#d4d4d4] bg-white hover:bg-[#f5f5f5] active:bg-[#e5e5e5] text-[#1f1f1f] text-[14px] font-semibold py-3 px-6 text-center no-underline cursor-pointer"
                >
                  See publishing services
                </a>
              </div>

              <div className="mt-9 pt-6 border-t border-[#e5e5e5] flex flex-wrap items-center gap-6 text-xs text-[#595959] font-serif-body">
                <span>Manuscript Editing</span>
                <span aria-hidden="true">·</span>
                <span>Interior Typesetting</span>
                <span aria-hidden="true">·</span>
                <span>Global Distribution</span>
                <span aria-hidden="true">·</span>
                <span>Amazon Advertising</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div>
                <div className="relative h-[320px] sm:h-[380px] overflow-hidden bg-[#e5e5e5]">
                  <img
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85"
                    alt="Fine library and books collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[12px] uppercase tracking-wide text-[#e5e5e5] font-semibold">
                      End-to-end publishing
                    </p>
                    <p className="font-serif-heading text-sm sm:text-base font-bold mt-1">
                      Books made to last for decades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICE HIGHLIGHTS STRIP
      ========================================================= */}
      <section className="bg-[#f5f5f5] py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="border-l border-[#d4d4d4] pl-5 sm:pl-6">
              <span className="block text-2xl sm:text-[28px] font-bold font-serif-heading text-[#1f1f1f]">
                ISBN
              </span>
              <span className="text-[13px] text-[#525252] mt-1 block leading-relaxed">
                Assignment, Barcodes and Legal Deposit
              </span>
            </div>

            <div className="border-l border-[#d4d4d4] pl-5 sm:pl-6">
              <span className="block text-2xl sm:text-[28px] font-bold font-serif-heading text-[#1f1f1f]">
                POD
              </span>
              <span className="text-[13px] text-[#525252] mt-1 block leading-relaxed">
                Print-on-Demand and Wholesale Distribution
              </span>
            </div>

            <div className="border-l border-[#d4d4d4] pl-5 sm:pl-6">
              <span className="block text-2xl sm:text-[28px] font-bold font-serif-heading text-[#1f1f1f]">
                PPC
              </span>
              <span className="text-[13px] text-[#525252] mt-1 block leading-relaxed">
                Amazon Advertising and A+ Content
              </span>
            </div>

            <div className="border-l border-[#d4d4d4] pl-5 sm:pl-6">
              <span className="block text-2xl sm:text-[28px] font-bold font-serif-heading text-[#1f1f1f]">
                90-Day
              </span>
              <span className="text-[13px] text-[#525252] mt-1 block leading-relaxed">
                Structured Launch Campaign Blueprint
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EDITORIAL FRAMEWORK SECTION
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="text-[12px] uppercase tracking-wide font-sans font-semibold text-[#8C2D19] mb-4">
              COMMERCIAL AND EDITORIAL STRATEGY
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-snug font-serif-heading text-[#1f1f1f]">
              A Commercial Framework Built Around Reader Conversion.
            </h2>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-6">
              In publishing, advertising spend without detail page optimization is wasted capital.
              Driving traffic to an Amazon product page with uncalibrated metadata and flat text leads
              to immediate bounce rates. We resolve this by combining custom Amazon A+ Content modules,
              credible critic endorsements, and clean comparison tables that turn browsing sessions into paid orders.
            </p>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-5">
              Simultaneously, we calibrate backend indexing—auditing 250-byte search term limits, keyword intent,
              and low-competition category paths. This ensures Amazon’s organic recommendation carousels actively
              promote your titles to proven buyers within your genre.
            </p>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-5">
              Whether supporting a frontlist release, optimizing Kindle Unlimited read-through for backlist series,
              or protecting author brands from competitor ad conquesting, our campaigns maintain commercial discipline
              and measurable returns on ad spend.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-[340px] sm:h-[380px] bg-[#e5e5e5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=85"
                alt="Curated book collection and premium hardcovers"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 inset-x-0 bg-[#1f1f1f]/85 p-5 sm:p-6 text-[#e5e5e5]">
                <p className="text-[12px] text-[#e5e5e5] uppercase tracking-wide font-sans font-semibold mb-2">
                  VISUAL MERCHANDISING
                </p>
                <h3 className="text-base sm:text-lg font-bold font-serif-heading text-white">
                  Amazon A+ Content and Brand Store Architecture
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EDITORIAL SECTION 1: ISBN REGISTRATION AND BARCODE
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24 border-t border-[#e5e5e5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-4">
              BIBLIOGRAPHIC INFRASTRUCTURE AND GLOBAL TRADE
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-snug font-serif-heading text-[#1f1f1f]">
              Official ISBN Assignment, EAN Barcodes, and Legal Deposit.
            </h2>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-6">
              An International Standard Book Number (ISBN) is the legal commercial identifier of your published volume.
              Unlike restrictive free platform identifiers that limit distribution strictly to a single retailer,
              we provision dedicated, publisher-owned Bowker and Nielsen ISBNs. This guarantees your work retains
              unconditional distribution rights across global bookstore chains, independent shops, and wholesale catalogues.
            </p>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-5">
              Every edition receives a high-resolution, vector-rendered EAN-13 barcode embedded with the standard Bookland
              prefix (978 and 979) and official 5-digit Price On-Product add-on extensions. Formatted to exact GS1 and
              ISO/IEC 15420 optical print tolerances, your book barcodes guarantee flawless scanning at retail points-of-sale
              and automated inventory checkouts worldwide.
            </p>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-5">
              Beyond commercial trade data, we coordinate essential institutional filings including formal Library of Congress
              Control Numbers (LCCN), Publisher's Cataloging-in-Publication (PCIP) metadata blocks, and legal deposit archiving
              with national libraries to establish the permanent bibliographic record of your book for generations.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-[340px] sm:h-[380px] bg-[#e5e5e5] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Bibliographic registers and vintage book printing"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 inset-x-0 bg-[#1f1f1f]/85 p-5 sm:p-6 text-[#e5e5e5]">
                <p className="text-[12px] text-[#e5e5e5] uppercase tracking-wide font-sans font-semibold mb-2">
                  GLOBAL TRADE IDENTIFICATION
                </p>
                <h3 className="text-base sm:text-lg font-bold font-serif-heading text-white">
                  Official Bowker and Nielsen Registry Infrastructure
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EDITORIAL SECTION 2: PRINT-ON-DEMAND (POD)
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24 border-t border-[#e5e5e5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative h-[340px] sm:h-[380px] bg-[#e5e5e5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=85"
                alt="Modern precision book binding and print manufacturing"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 inset-x-0 bg-[#1f1f1f]/85 p-5 sm:p-6 text-[#e5e5e5]">
                <p className="text-[12px] text-[#e5e5e5] uppercase tracking-wide font-sans font-semibold mb-2">
                  PRINT MANUFACTURING AGILITY
                </p>
                <h3 className="text-base sm:text-lg font-bold font-serif-heading text-white">
                  Zero-Inventory Global Print-On-Demand Architecture
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-4">
              AGILE SUPPLY CHAIN AND DISTRIBUTION
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-snug font-serif-heading text-[#1f1f1f]">
              Print-On-Demand Architecture with Traditional Quality.
            </h2>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-6">
              Modern digital Print-on-Demand (POD) technology eliminates costly warehousing overheads, unsold inventory risk,
              and catastrophic out-of-stock notices. Each physical book is produced, bound, and drop-shipped to retail accounts
              and direct readers within 24 to 48 hours of an order being placed across manufacturing nodes in North America,
              the United Kingdom, Europe, and Australia.
            </p>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-5">
              We uphold uncompromising material standards across both paperback and hardcover specifications: premium 50lb to
              70lb acid-free archival cream papers, durable polyurethane reactive (PUR) perfect binding, scuff-resistant matte
              protective laminates, and case-laminate cloth-effect boards that rival traditional high-run offset print runs.
            </p>

            <p className="font-serif-body text-[#595959] text-sm sm:text-[15px] leading-7 sm:leading-8 mt-5">
              By coordinating dual-source distribution through Ingram Content Group (Lightning Source) and KDP Print,
              your titles receive seamless commercial availability: automatic Prime 2-day delivery on Amazon alongside
              guaranteed wholesale availability in ordering databases utilized by Barnes and Noble, Waterstones, and independent bookshops.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION: FULL-SERVICE PUBLISHING SUITE
      ========================================================= */}
      <section id="publishing-suite" className="bg-[#ffffff] py-16 md:py-24 border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-3">
              PRODUCTION AND DISTRIBUTION ARCHITECTURE
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold font-serif-heading text-[#1f1f1f]">
              Full-Service Book Publishing, Editorial, and Print Production
            </h2>
            <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] mt-3 max-w-3xl leading-relaxed sm:leading-7">
              Publishing is an architectural discipline combining literary editing, bespoke typography,
              and global trade syndication. We guide manuscripts from initial draft to internationally
              distributed hardcover and digital editions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {/* Stage 1 */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2">
                  STAGE 01
                </span>
                <h3 className="text-lg font-bold font-serif-heading text-[#1f1f1f] mb-2.5">
                  Editorial and Manuscript Development
                </h3>
                <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed mb-4">
                  Multi-pass textual editing upholding rigorous university press standards to refine narrative pacing, voice, and thematic clarity.
                </p>
                <ul className="space-y-2.5 font-serif-body text-[13px] text-[#595959] border-t border-[#e5e5e5] pt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Developmental Editing:</strong> Structural evaluation of plot architecture, character arcs, and narrative cadence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Line and Copy Editing:</strong> Sentence-level polishing for rhythmic fluidity, syntax elegance, and tonal consistency.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Cold Proofreading:</strong> Rigorous examination for typographical errors, punctuation adherence, and styling consistency.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3.5 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
                Editorial Rigor Guaranteed
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2">
                  STAGE 02
                </span>
                <h3 className="text-lg font-bold font-serif-heading text-[#1f1f1f] mb-2.5">
                  Interior Book Architecture and Typography
                </h3>
                <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed mb-4">
                  Typesetting books using classical geometric page proportions, custom drop caps, and optical kerning pairs for timeless reading comfort.
                </p>
                <ul className="space-y-2.5 font-serif-body text-[13px] text-[#595959] border-t border-[#e5e5e5] pt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Bespoke Type Selection:</strong> Curating historically grounded serif fonts suited specifically to your book genre.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Pagination and Running Headers:</strong> Elegant chapter openers, clean margins, and widow and orphan suppression.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Multi-Format Master Outputs:</strong> Certified PDF/X-1a files for print alongside fully validated reflowable ePub editions.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3.5 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
                Classical Page Geometry
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2">
                  STAGE 03
                </span>
                <h3 className="text-lg font-bold font-serif-heading text-[#1f1f1f] mb-2.5">
                  Cover Architecture and Print Finishes
                </h3>
                <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed mb-4">
                  Striking, market-calibrated jacket design commanding attention on physical bookstore shelves and digital marketplace thumbnails.
                </p>
                <ul className="space-y-2.5 font-serif-body text-[13px] text-[#595959] border-t border-[#e5e5e5] pt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Hardcover Dust Jackets and Case Laminates:</strong> Engineering cloth-bound cases, foil stamping, and French flap jackets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Spine Width Precision:</strong> Calculating spine bulk down to the millimeter based on exact paper weight and page count.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Trade-Ready Back Covers:</strong> Structuring persuasive blurb typography, author biography portraits, and official barcode blocks.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3.5 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
                Tactile Material Quality
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2">
                  STAGE 04
                </span>
                <h3 className="text-lg font-bold font-serif-heading text-[#1f1f1f] mb-2.5">
                  Global Distribution and Bibliographic Registry
                </h3>
                <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed mb-4">
                  Opening worldwide retail and library distribution channels through premier book trade wholesalers across 195 countries.
                </p>
                <ul className="space-y-2.5 font-serif-body text-[13px] text-[#595959] border-t border-[#e5e5e5] pt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Ingram and Wholesale Syndication:</strong> Placing titles in ordering systems used by Barnes and Noble, Waterstones, and indie shops.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Library Network Integration:</strong> Supplying Baker and Taylor and OverDrive to ensure institutional library availability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C2D19] font-bold">•</span>
                    <span><strong>Official ISBN and Copyright Registration:</strong> Bowker ISBN assignment, Barcode generation, and Library of Congress filings.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3.5 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
                Global Retail Distribution
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION: AMAZON BOOK MARKETING AND ADVERTISING SUITE
      ========================================================= */}
      <section id="services-suite" className="bg-[#f5f5f5] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-3">
              SPECIALIZED AMAZON SERVICES
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold font-serif-heading text-[#1f1f1f]">
              Amazon Book Marketing, Advertising, and Page Merchandising
            </h2>
            <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] mt-3 max-w-3xl leading-relaxed sm:leading-7">
              With Amazon accounting for the majority of global print and digital book sales, success requires
              technical precision across Amazon Advertising, KDP metadata, and visual detail page architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2.5">
                  PILLAR 01
                </span>
                <h3 className="text-xl font-bold font-serif-heading text-[#1f1f1f] mb-3">
                  Amazon Book Marketing
                </h3>
                <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-6 mb-6">
                  Structural optimization of your KDP and Amazon Seller listings to maximize algorithmic relevance
                  and organic search rank without relying entirely on ad spend.
                </p>
                <ul className="space-y-4 font-serif-body text-sm text-[#595959] border-t border-[#e5e5e5] pt-5">
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Backend Keyword Architecture:</strong> Complete utilization of the 250-byte search term fields with zero punctuation waste and intent-based phrase research.</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Category Placement and BISAC Mapping:</strong> Identifying up to 10 low-competition, high-conversion browse paths to trigger Bestseller and New Release status.</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Author Central Infrastructure:</strong> Unifying international author profiles across the United States, United Kingdom, Canada, and European marketplaces.</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Amazon Attribution Tags:</strong> Generating secure tracking tags to measure sales, page reads, and bonus brand royalties from external traffic.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
                Full KDP and Catalog Audit Included
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2.5">
                  PILLAR 02
                </span>
                <h3 className="text-xl font-bold font-serif-heading text-[#1f1f1f] mb-3">
                  Amazon Advertising (PPC and DSP)
                </h3>
                <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-6 mb-6">
                  Disciplined paid ad management across Amazon's advertising platforms, controlling target ACoS
                  and driving verified book purchases while protecting author margins.
                </p>
                <ul className="space-y-4 font-serif-body text-sm text-[#595959] border-t border-[#e5e5e5] pt-5">
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Sponsored Products Campaigns:</strong> Exact, Phrase, and Auto campaigns harvesting commercial search terms and targeting comp-title ASINs.</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Sponsored Brands and Video Ads:</strong> High-impact search header banners and 15-second cinematic book trailers embedded directly in reader search results.</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Sponsored Display and Retargeting:</strong> Defending your product page from competitors while conquesting readers browsing related author titles.</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Amazon DSP Integration:</strong> Programmatic display advertising reaching active Kindle e-reader owners based on verified historical genre buying habits.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
                Daily Bid Adjustments and Budget Governance
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2.5">
                  PILLAR 03
                </span>
                <h3 className="text-xl font-bold font-serif-heading text-[#1f1f1f] mb-3">
                  Amazon A+ Content Production
                </h3>
                <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-6 mb-6">
                  Bespoke visual editorial spreads designed to replace static text descriptions, delivering
                  elevated typography, reader testimonials, and measurable conversion lifts.
                </p>
                <ul className="space-y-4 font-serif-body text-sm text-[#595959] border-t border-[#e5e5e5] pt-5">
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Catalog Comparison Matrices:</strong> Directing readers to series sequels, standalone works, and multi-format editions (Hardcover, Audio, Paperback).</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Editorial Endorsements and Callouts:</strong> Structuring awards, review quotes, and publication accolades into clean, credible design modules.</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Amazon Brand Story Carousel:</strong> A dedicated, full-width swipeable module highlighting the publishing imprint, catalog depth, and author heritage.</span>
                  </li>
                  <li className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                    <span><strong>Mobile-First Formatting:</strong> Pixel-perfect graphic composition tailored specifically for Amazon's mobile shopping application.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
                Full Copywriting and Asset Creation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION: CAMPAIGNS, SOCIAL MEDIA, AND AD SERVICES
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-3">
            INTEGRATED EXECUTION
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold font-serif-heading text-[#1f1f1f]">
            Campaigns, Social Media Marketing, and Advertising Services
          </h2>
          <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] mt-3 max-w-3xl leading-relaxed sm:leading-7">
            Connecting technical Amazon advertising with cultural momentum, social community buzz,
            and professional account management for sustainable reader acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2.5">
                SERVICE 01
              </span>
              <h3 className="text-xl font-bold font-serif-heading text-[#1f1f1f] mb-3">
                Structured Launch Campaigns
              </h3>
              <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-6 mb-6">
                Calculated campaign sequencing designed around publication milestones to generate
                concentrated sales volume and trigger Amazon’s organic recommendation algorithms.
              </p>
              <ul className="space-y-4 font-serif-body text-sm text-[#595959] border-t border-[#e5e5e5] pt-5">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Pre-Order Runway Strategy:</strong> Accumulating pre-launch reservation orders to generate initial day-one chart placement.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>72-Hour Bestseller Flights:</strong> Coordinated ad pulses and promotional pricing aimed at securing Category Number One flags.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Kindle Deals and Price Drops:</strong> Deploying time-sensitive price promotions to awaken dormant backlist algorithms.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Q4 and Seasonal Catalog Surges:</strong> Strategic ad scaling across peak holiday gift periods, academic terms, and summer reading lists.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
              Launch Flights and Evergreen Schedules
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2.5">
                SERVICE 02
              </span>
              <h3 className="text-xl font-bold font-serif-heading text-[#1f1f1f] mb-3">
                Social Media Marketing
              </h3>
              <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-6 mb-6">
                Authentic, literary-focused promotion engaging reading communities across BookTok,
                Bookstagram, and paid social channels without spamming or generic tactics.
              </p>
              <ul className="space-y-4 font-serif-body text-sm text-[#595959] border-t border-[#e5e5e5] pt-5">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>BookTok and Creator Seeding:</strong> Distributing physical advance review copies (ARCs) to vetted book creators who drive organic recommendation spikes.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Bookstagram Aesthetic Creation:</strong> High-resolution editorial book photography, quote banners, and thematic design for Instagram readers.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Meta Direct-Response Advertising:</strong> Targeted Facebook and Instagram ad campaigns delivering verified buyers to Amazon Attribution endpoints.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Goodreads and Reader Communities:</strong> Moderating virtual group reads, ARC feedback management, and certified reader reviews.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
              Vetted Literary Influencer Network
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2.5">
                SERVICE 03
              </span>
              <h3 className="text-xl font-bold font-serif-heading text-[#1f1f1f] mb-3">
                Full-Service Advertising Management
              </h3>
              <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-6 mb-6">
                End-to-end, accountable ad account management for publishers and active authors requiring
                hands-on governance, algorithmic adjustments, and transparent commercial reporting.
              </p>
              <ul className="space-y-4 font-serif-body text-sm text-[#595959] border-t border-[#e5e5e5] pt-5">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Continuous Search Term Harvesting:</strong> Weekly auditing of search reports to capture emerging keywords and prune unprofitable bids.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Competitor ASIN Interception:</strong> Strategically bidding on competing title pages to capture readers at point of purchase.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>ACoS and TACoS Governance:</strong> Managing bids to maintain profitability across total catalog revenue rather than isolated ad silos.</span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#8C2D19] font-bold mt-0.5">•</span>
                  <span><strong>Bi-Weekly Performance Reviews:</strong> Comprehensive reports breaking down ad spend, organic sales velocity, and blended return on investment.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e5e5] text-[12px] font-semibold text-[#8C2D19] uppercase tracking-wider">
              Dedicated Senior Campaign Strategist
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ADVANCE REVIEW COPIES (ARC) AND EDITORIAL SYNDICATION
      ========================================================= */}
      <section className="bg-[#ffffff] border-t border-[#e5e5e5] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-3">
                CRITIC AND READER SOCIAL PROOF
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold font-serif-heading text-[#1f1f1f] leading-tight">
                Advance Review Distribution and Trade Review Pitching
              </h2>
              <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] mt-5 leading-relaxed sm:leading-7">
                Before launching Amazon advertising, establishing authentic customer reviews and prestigious trade
                endorsements is essential for conversion. We organize compliance-safe Advance Review Copy (ARC)
                distribution across verified bibliophile communities and trade review syndicates.
              </p>

              <div className="mt-8 space-y-4 font-serif-body text-sm text-[#595959]">
                <div className="p-4 bg-[#f5f5f5]">
                  <strong className="text-[#1f1f1f] block mb-1">Pre-Publication Galley Seeding:</strong>
                  <span>Delivering digital and physical proof copies to book bloggers, Goodreads librarians, and category influencers 6 to 8 weeks before launch.</span>
                </div>
                <div className="p-4 bg-[#f5f5f5]">
                  <strong className="text-[#1f1f1f] block mb-1">Trade Journal Submission Coordination:</strong>
                  <span>Structuring formal review submissions for consideration by Publishers Weekly, Kirkus Reviews, Booklist, and independent literary journals.</span>
                </div>
                <div className="p-4 bg-[#f5f5f5]">
                  <strong className="text-[#1f1f1f] block mb-1">Amazon Review TOS Compliance:</strong>
                  <span>Every review initiative operates strictly within Amazon Customer Review Creation Guidelines, avoiding incentivized review penalties or listing suspensions.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#f5f5f5] p-8 sm:p-10">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19] block mb-2">
                  CRITICAL SOCIAL PROOF METRIC
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#1f1f1f] mb-4">
                  Why Reviews Dictate Amazon Ad Efficiency
                </h3>
                <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-7 mb-6">
                  Amazon advertising performance depends on how well a book page converts browsers into buyers. Pages with
                  few customer reviews tend to convert less efficiently, so building a base of genuine reader reviews before
                  scaling ad spend helps every advertising dollar work harder.
                </p>
                <div className="pt-5 border-t border-[#e5e5e5] flex justify-between items-center gap-4 text-[13px] text-[#525252] font-semibold">
                  <span>Pre-launch ARC campaigns</span>
                  <span>Verified review conversion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE FIVE PILLARS: INTERACTIVE TABS
      ========================================================= */}
      <section id="channels" className="bg-[#f5f5f5] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-3">
              MARKETING CAPABILITIES
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold font-serif-heading text-[#1f1f1f]">
              Full-Spectrum Book Marketing and Discovery
            </h2>
            <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] mt-3 max-w-2xl leading-relaxed sm:leading-6">
              We coordinate technical Amazon algorithms with visual merchandising, reader seeding,
              and dedicated editorial distribution.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "amazon", label: "01. Amazon PPC and A+ Content" },
              { id: "editorial", label: "02. Direct Newsletter and Site Takeovers" },
              { id: "social", label: "03. BookTok and Creator Seeding" },
              { id: "pr", label: "04. Literary PR and Critic Reviews" },
              { id: "backlist", label: "05. Catalog and Backlist Resurrections" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#8c2d19] border-[#8c2d19] text-white"
                    : "bg-white border-[#d4d4d4] text-[#404040] hover:bg-[#f5f5f5] hover:border-[#a3a3a3]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded p-6 sm:p-10">
            {activeTab === "amazon" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19]">
                    DOMINATING THE ALGORITHM
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#1f1f1f] mt-2 mb-4">
                    Amazon PPC, A+ Content, and BSR Ranking
                  </h3>
                  <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-7 mb-5">
                    For most authors, Amazon is the primary sales channel. We deploy exact ASIN targeting,
                    negative keyword pruning, and custom visual A+ Content modules to turn passive views
                    into compounding royalty income.
                  </p>
                  <div className="p-4 sm:p-5 bg-[#f5f5f5] border-l-2 border-[#8C2D19] text-xs font-serif-body text-[#404040] leading-relaxed">
                    "Amazon's algorithm rewards consistent sales velocity. Once your conversion rate exceeds
                    category averages, Amazon begins advertising your book in Customers Also Bought."
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8C2D19] block mb-1.5">
                      Visual Merchandising
                    </span>
                    <h4 className="text-sm font-bold font-serif-heading mb-2">Amazon A+ Content Production</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Custom banner art, comparative title carousels, author spotlights, and quote callouts
                      that transform plain product pages into high-converting storefronts.
                    </p>
                  </div>

                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8C2D19] block mb-1.5">
                      Sponsored Products PPC
                    </span>
                    <h4 className="text-sm font-bold font-serif-heading mb-2">Targeted ASIN and Keyword Bidding</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Bidding on competing author names and bestselling titles in your niche with strict ACoS
                      caps to capture buyers right at checkout.
                    </p>
                  </div>

                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8C2D19] block mb-1.5">
                      Category Placement
                    </span>
                    <h4 className="text-sm font-bold font-serif-heading mb-2">Bestseller Rank (BSR) Optimization</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Deep category research and backend indexing to secure the Number One New Release and
                      Bestseller orange flags on Amazon.
                    </p>
                  </div>

                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8C2D19] block mb-1.5">
                      Reader Social Proof
                    </span>
                    <h4 className="text-sm font-bold font-serif-heading mb-2">Goodreads and Kindle Deals</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Targeted giveaways and Kindle Price Promotions coordinated to spark intense 72-hour
                      download surges that awaken organic search ranks.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "editorial" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19]">
                    DISCRIMINATING AUDIENCES
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#1f1f1f] mt-2 mb-4">
                    Direct Reader Sponsorships and Newsletters
                  </h3>
                  <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-7 mb-5">
                    Introduce your titles to readers who regularly invest in
                    hardcover editions, signed publications, and new literary voices.
                  </p>
                  <div className="p-4 sm:p-5 bg-[#f5f5f5] border-l-2 border-[#8C2D19] text-xs font-serif-body text-[#404040] leading-relaxed">
                    Placements are matched to your genre and target readership in each campaign proposal.
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <h4 className="text-sm font-bold font-serif-heading mb-2">Solo Dedicated Newsletter Blast</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      A standalone email feature dedicated exclusively to your title, complete with cover artwork,
                      chapter excerpt, and direct Amazon buy links.
                    </p>
                  </div>
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <h4 className="text-sm font-bold font-serif-heading mb-2">Category Archive Sponsorship</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Exclusive editorial header banners across relevant subject archives for 14 or 30 days.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "social" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19]">
                    ORGANIC VIRALITY
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#1f1f1f] mt-2 mb-4">
                    BookTok, Bookstagram, and Creator Seeding
                  </h3>
                  <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-7">
                    We seed physical advance reader copies to genuine literary commentators whose reviews
                    spark mass bookstore backorders and sudden Amazon sales velocity.
                  </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <h4 className="text-sm font-bold font-serif-heading mb-2">ARC Box Experiences</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Custom unboxing presentation, personalized notes, and reading guides that demand video coverage.
                    </p>
                  </div>
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <h4 className="text-sm font-bold font-serif-heading mb-2">Paid Social Amplification</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Retargeting top-performing creator reviews straight into the feeds of proven book buyers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pr" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19]">
                    LITERARY PRESTIGE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#1f1f1f] mt-2 mb-4">
                    Literary PR, Essays, and Reviews
                  </h3>
                  <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-7">
                    Securing authoritative coverage in respected cultural journals, literary columns,
                    and podcasts that establish your long-term literary reputation.
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <h4 className="text-sm font-bold font-serif-heading mb-1.5">Author Q and A Profiles</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Thoughtfully crafted long-form interviews distributed through curated digital channels.
                    </p>
                  </div>
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <h4 className="text-sm font-bold font-serif-heading mb-1.5">Review Placement Outreach</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Direct pitches to independent book reviewers, trade outlets, and niche literary publications.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "backlist" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-[#8C2D19]">
                    LONG-TAIL VALUE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#1f1f1f] mt-2 mb-4">
                    Backlist Awakening and Catalog Audits
                  </h3>
                  <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] leading-relaxed sm:leading-7">
                    Older titles often stagnate on Amazon due to obsolete keywords and forgotten ad setups.
                    We overhaul backend metadata and launch automated ad filters to revive sales.
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <h4 className="text-sm font-bold font-serif-heading mb-1.5">Search Term Modernization</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Rewriting subtitles and backend 250-byte search fields to match current reader queries.
                    </p>
                  </div>
                  <div className="bg-[#f5f5f5] p-5 sm:p-6">
                    <h4 className="text-sm font-bold font-serif-heading mb-1.5">Defensive Amazon Ad Protection</h4>
                    <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                      Targeted low-cost bid campaigns preventing competing titles from advertising on your books.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          THE 90-DAY VELOCITY BLUEPRINT
      ========================================================= */}
      <section className="bg-[#ffffff] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-3">
              THE METHODOLOGY
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold font-serif-heading text-[#1f1f1f]">
              The 90-Day Publisher Blueprint
            </h2>
            <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] mt-3 leading-relaxed sm:leading-6">
              We replace chaotic guessing with a systematic sequence designed to maximize algorithmic momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 relative">
              <span className="text-3xl font-bold font-serif-heading text-[#d4d4d4] absolute top-6 right-6">
                01
              </span>
              <span className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] block mb-2.5">
                WEEKS 1 TO 3
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif-heading mb-3 text-[#1f1f1f]">
                Foundation and Architecture
              </h3>
              <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                ASIN optimization, competitor keyword research, negative phrase harvesting, and production
                of custom Amazon A+ Content modules to prepare for high-volume conversion.
              </p>
            </div>

            <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 relative">
              <span className="text-3xl font-bold font-serif-heading text-[#d4d4d4] absolute top-6 right-6">
                02
              </span>
              <span className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] block mb-2.5">
                WEEKS 4 TO 7
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif-heading mb-3 text-[#1f1f1f]">
                Launch Velocity and Surge
              </h3>
              <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                Simultaneous activation of Amazon Sponsored Products, newsletter features, and creator unboxings
                to trigger Amazon's organic recommendation carousels.
              </p>
            </div>

            <div className="bg-[#ffffff] border border-[#e5e5e5] p-7 relative">
              <span className="text-3xl font-bold font-serif-heading text-[#d4d4d4] absolute top-6 right-6">
                03
              </span>
              <span className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] block mb-2.5">
                WEEKS 8 TO 12
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif-heading mb-3 text-[#1f1f1f]">
                Evergreen Stabilization
              </h3>
              <p className="font-serif-body text-[13px] text-[#595959] leading-relaxed sm:leading-6">
                Fine-tuning target ACoS, pruning low-converting bids, maintaining Bestseller category rank,
                and setting up automated cross-title funnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CAMPAIGN INQUIRY CONSOLE (CONNECTED WITH EMAIL DISPATCH)
      ========================================================= */}
      <section id="inquiry-desk" className="bg-[#f5f5f5] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            
            <div className="lg:col-span-5">
              <p className="text-[12px] uppercase tracking-wide font-semibold text-[#8C2D19] mb-3">
                CONSULTATION INTAKE
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold font-serif-heading text-[#1f1f1f] leading-tight">
                Begin Your Book’s Campaign.
              </h2>

              <p className="font-serif-body text-sm sm:text-[15px] text-[#595959] mt-5 leading-relaxed sm:leading-7">
                Every title possesses unique commercial potential. Share your ASIN, current Amazon rank,
                and campaign objectives. Our marketing strategists will review your listing and reply with next steps.
              </p>

              <div className="mt-9 border-t border-[#e5e5e5] pt-6 space-y-3.5 text-xs font-serif-body">
                <div>
                  <span className="block font-bold text-[#1f1f1f]">Campaign Strategy:</span>
                  <span className="text-[#595959] mt-0.5 block">Contact us through the inquiry form below.</span>
                </div>
                <div>
                  <span className="block font-bold text-[#1f1f1f]">Amazon A+ and Advertising Services:</span>
                  <span className="text-[#595959] mt-0.5 block">Contact us through the inquiry form below.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded p-7 sm:p-9">
              <form onSubmit={handleFormSubmit} noValidate aria-busy={isSubmitting}>
                {/* Honeypot: hidden from people and assistive tech; bots that fill it are discarded on the server. */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                  <label>
                    Website
                    <input
                      type="text"
                      name={HONEYPOT_FIELD}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="inquiry-authorOrPublisher" className="block text-[13px] font-semibold text-[#404040] mb-1.5">
                      Author or Press Name *
                    </label>
                    <input
                      id="inquiry-authorOrPublisher"
                      type="text"
                      name="authorOrPublisher"
                      value={form.authorOrPublisher}
                      onChange={update}
                      placeholder="e.g. Oxford Literary Press"
                      className={fieldClass("authorOrPublisher")}
                      aria-invalid={Boolean(invalidFields.authorOrPublisher)}
                      maxLength={150}
                      autoComplete="organization"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-contactName" className="block text-[13px] font-semibold text-[#404040] mb-1.5">
                      Lead Contact Name *
                    </label>
                    <input
                      id="inquiry-contactName"
                      type="text"
                      name="contactName"
                      value={form.contactName}
                      onChange={update}
                      placeholder="Your full name"
                      className={fieldClass("contactName")}
                      aria-invalid={Boolean(invalidFields.contactName)}
                      maxLength={100}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className="block text-[13px] font-semibold text-[#404040] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={update}
                      placeholder="editor@press.com"
                      className={fieldClass("email")}
                      aria-invalid={Boolean(invalidFields.email)}
                      maxLength={254}
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* FIELD 1: EXPLICITLY OPTIONAL */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="inquiry-amazonLinkOrAsin" className="block text-[13px] font-semibold text-[#404040]">
                        Amazon ASIN, ISBN, or Book URL
                      </label>
                      <span className="text-[10px] text-[#8C2D19] font-serif-body font-semibold italic">
                        (Optional)
                      </span>
                    </div>
                    <input
                      id="inquiry-amazonLinkOrAsin"
                      type="text"
                      name="amazonLinkOrAsin"
                      value={form.amazonLinkOrAsin}
                      onChange={update}
                      placeholder="B0XXXXXXXX or Amazon URL (Leave blank if unpublished)"
                      className={fieldClass("amazonLinkOrAsin")}
                      aria-invalid={Boolean(invalidFields.amazonLinkOrAsin)}
                      maxLength={500}
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-targetMarket" className="block text-[13px] font-semibold text-[#404040] mb-1.5">
                      Target Marketplace
                    </label>
                    <select
                      id="inquiry-targetMarket"
                      name="targetMarket"
                      value={form.targetMarket}
                      onChange={update}
                      className={fieldClass("targetMarket")}
                      aria-invalid={Boolean(invalidFields.targetMarket)}
                    >
                      <option value="">Select…</option>
                      {TARGET_MARKETS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* FIELD 2: COMPREHENSIVE DROPDOWN WITH ALL SERVICES */}
                  <div>
                    <label htmlFor="inquiry-primaryService" className="block text-[13px] font-semibold text-[#404040] mb-1.5">
                      Primary Service Requirement
                    </label>
                    <select
                      id="inquiry-primaryService"
                      name="primaryService"
                      value={form.primaryService}
                      onChange={update}
                      className={fieldClass("primaryService")}
                      aria-invalid={Boolean(invalidFields.primaryService)}
                    >
                      <option value="">Select…</option>
                      {PRIMARY_SERVICES.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="inquiry-monthlyBudget" className="block text-[13px] font-semibold text-[#404040] mb-1.5">
                      Estimated Monthly Promotion Budget
                    </label>
                    <select
                      id="inquiry-monthlyBudget"
                      name="monthlyBudget"
                      value={form.monthlyBudget}
                      onChange={update}
                      className={fieldClass("monthlyBudget")}
                      aria-invalid={Boolean(invalidFields.monthlyBudget)}
                    >
                      <option value="">Select…</option>
                      {MONTHLY_BUDGETS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="inquiry-campaignNotes" className="block text-[13px] font-semibold text-[#404040] mb-1.5">
                      Book Details and Campaign Objectives *
                    </label>
                    <textarea
                      id="inquiry-campaignNotes"
                      rows={3}
                      name="campaignNotes"
                      value={form.campaignNotes}
                      onChange={update}
                      placeholder="Specify your book genre, publishing requirements, current Amazon BSR or ACoS targets, and upcoming launch timeline..."
                      className={fieldClass("campaignNotes")}
                      aria-invalid={Boolean(invalidFields.campaignNotes)}
                      maxLength={5000}
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={form.termsAccepted}
                      onChange={update}
                      className="accent-[#8C2D19] mt-0.5 w-4 h-4 shrink-0"
                      aria-invalid={Boolean(invalidFields.termsAccepted)}
                      required
                    />
                    <span className="text-[13px] font-serif-body text-[#595959] leading-relaxed">
                      I confirm that I represent this title or publishing catalog and request a formal
                      campaign audit and strategic proposal from the publishing team. I have read the{" "}
                      <Link to="/terms" target="_blank" className="text-[#8C2D19] underline hover:text-[#6e2312]">Terms of Use</Link>{" "}
                      and{" "}
                      <Link to="/privacy" target="_blank" className="text-[#8C2D19] underline hover:text-[#6e2312]">Privacy Policy</Link>. *
                    </span>
                  </label>
                </div>

                <div aria-live="polite">
                  {errors.length > 0 && (
                    <div role="alert" className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs">
                      {errors.length === 1 ? (
                        errors[0]
                      ) : (
                        <ul className="list-disc pl-4 space-y-1">
                          {errors.map((message) => (
                            <li key={message}>{message}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {submitted && (
                    <div className="mt-4 p-4 bg-[#EDF3E8] border border-[#B3C9A7] text-[#2F4A24]">
                      <h4 className="font-bold text-xs">Campaign Brief Received</h4>
                      <p className="text-xs mt-1 font-serif-body leading-relaxed">
                        Thank you. Your proposal has been delivered to the Longstreet Press marketing desk.
                        We will review your details and reply to the email address you provided.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 rounded bg-[#8c2d19] enabled:hover:bg-[#6e2312] enabled:active:bg-[#5a1c0f] text-white text-[14px] font-semibold px-6 py-3 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  {isSubmitting ? "Submitting..." : "Submit Campaign Details"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

