import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Layout for the site information pages (About, Contact, Privacy, Terms, Advanced
 * Search, 404). Reuses the breadcrumb and page header of the category pages.
 */
export default function InfoPage({ eyebrow, title, intro, breadcrumb, children, wide = false }) {
  return (
    <div
      className="w-full min-h-screen bg-white text-[#1f1f1f] px-4 sm:px-6 py-7"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#595959] mb-5">
          <Link to="/" className="flex items-center gap-1 text-[#595959] no-underline">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <span>/</span>
          <span className="font-bold text-[#8c2d19]">{breadcrumb ?? title}</span>
        </nav>

        <header className="border-b border-[#e5e5e5] pb-6 mb-8">
          {eyebrow && (
            <p className="text-[#8c2d19] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">{eyebrow}</p>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h1>
          {intro && <p className="text-[14px] text-[#525252] mt-2 max-w-2xl leading-relaxed">{intro}</p>}
        </header>

        <div className={wide ? "" : "max-w-3xl"}>{children}</div>
      </div>
    </div>
  );
}

/** A titled block of body copy inside an InfoPage. */
export function InfoSection({ title, children }) {
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-[18px] font-bold text-[#1f1f1f] mb-3">
          {title}
        </h2>
      )}
      <div className="text-[14px] text-[#404040] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
