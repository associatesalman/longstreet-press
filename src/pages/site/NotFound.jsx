import { Link, useLocation } from "react-router-dom";
import { Home, LibraryBig, Search } from "lucide-react";
import InfoPage, { InfoSection } from "./InfoPage";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <InfoPage
      eyebrow="Error 404"
      title="Page Not Found"
      breadcrumb="Page Not Found"
      intro="The page you were looking for isn’t part of the Longstreet Press collection. It may have moved, or the address may be mistyped."
    >
      <InfoSection title="Requested Address">
        <p className="break-all font-mono text-[13px] text-[#7a6452]">{pathname}</p>
      </InfoSection>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/"
          className="bg-[#241a15] text-[#fffaf4] text-[12px] font-bold py-3 px-5 uppercase tracking-wide inline-flex items-center gap-2 no-underline"
        >
          <Home size={15} />
          Return Home
        </Link>
        <Link
          to="/bookstores"
          className="bg-[#fdfbf7] border border-[#b8a68f] text-[#241a15] text-[12px] font-bold py-3 px-5 uppercase tracking-wide inline-flex items-center gap-2 no-underline"
        >
          <LibraryBig size={15} />
          Visit Bookstores
        </Link>
        <Link
          to="/advanced-search"
          className="bg-[#fdfbf7] border border-[#b8a68f] text-[#241a15] text-[12px] font-bold py-3 px-5 uppercase tracking-wide inline-flex items-center gap-2 no-underline"
        >
          <Search size={15} />
          Search Books
        </Link>
      </div>
    </InfoPage>
  );
}
