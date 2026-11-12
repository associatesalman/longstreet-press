import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Layout for the site information pages (About, Contact, Privacy, Terms, Advanced
 * Search, 404). Reuses the breadcrumb and dark header banner of the category pages.
 */
export default function InfoPage({ eyebrow, title, intro, breadcrumb, children, wide = false }) {
  return (
    <div
      className="w-full min-h-screen bg-[#fbf8f2] text-[#241a15] px-4 sm:px-6 py-7"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#7a6452] mb-5">
          <Link to="/" className="flex items-center gap-1 text-[#7a6452] no-underline">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <span>/</span>
          <span className="font-bold text-[#8c2d19]">{breadcrumb ?? title}</span>
        </nav>

        <header className="bg-[#241a15] text-[#fbf8f2] border border-[#c29b38] px-6 py-6 mb-6">
          {eyebrow && (
            <p className="text-[#c29b38] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">{eyebrow}</p>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h1>
          {intro && <p className="text-[14px] text-[#cbb9a5] mt-2 max-w-2xl leading-relaxed">{intro}</p>}
        </header>

        <div className={wide ? "" : "max-w-3xl"}>{children}</div>

        <div className="flex items-center gap-3 mt-9">
          <span className="h-px flex-1 bg-[#d6c7b2]" />
          <span className="text-[#8c7355] text-xs">♦ ♦ ♦</span>
          <span className="h-px flex-1 bg-[#d6c7b2]" />
        </div>
      </div>
    </div>
  );
}

/** A titled block of body copy inside an InfoPage. */
export function InfoSection({ title, children }) {
  return (
    <section className="bg-[#fdfbf7] border border-[#b8a68f] p-5 sm:p-6 mb-4">
      {title && (
        <h2 className="text-[11px] tracking-wider uppercase font-bold text-[#241a15] pb-2 mb-3 border-b border-[#e2d7c5] font-sans">
          {title}
        </h2>
      )}
      <div className="text-[14px] text-[#45362b] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
