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
        <p className="break-all font-mono text-[13px] text-[#595959]">{pathname}</p>
      </InfoSection>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold py-2.5 px-5 inline-flex items-center gap-2 no-underline"
        >
          <Home size={15} />
          Return Home
        </Link>
        <Link
          to="/bookstores"
          className="rounded border border-[#d4d4d4] bg-white hover:bg-[#f5f5f5] active:bg-[#e5e5e5] text-[#1f1f1f] text-[14px] font-semibold py-2.5 px-5 inline-flex items-center gap-2 no-underline"
        >
          <LibraryBig size={15} />
          Visit Bookstores
        </Link>
        <Link
          to="/advanced-search"
          className="rounded border border-[#d4d4d4] bg-white hover:bg-[#f5f5f5] active:bg-[#e5e5e5] text-[#1f1f1f] text-[14px] font-semibold py-2.5 px-5 inline-flex items-center gap-2 no-underline"
        >
          <Search size={15} />
          Search Books
        </Link>
      </div>
    </InfoPage>
  );
}
