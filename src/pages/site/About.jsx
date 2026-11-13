import { Link } from "react-router-dom";
import InfoPage, { InfoSection } from "./InfoPage";

const linkClass = "text-[#8c2d19] underline hover:text-[#6e2312]";

export default function About() {
  return (
    <InfoPage
      eyebrow="Our Purpose"
      title="About Longstreet Press"
      breadcrumb="About"
      intro="Longstreet Press celebrates the beauty of literature, the value of knowledge, and the lasting legacy of the written word."
    >
      <InfoSection title="What We Do">
        <p>
          Longstreet Press presents a curated collection of books, from literary classics and memoirs to history,
          the arts, rare and antiquarian subjects, and manuscripts. Each title is shown with its cover and author,
          organized into collector-style categories so readers can explore by interest.
        </p>
        <p>
          Every <strong>View Book</strong> link opens that title on Amazon. Purchases, pricing, payment, shipping and
          returns are handled by Amazon under its own policies; Longstreet Press does not sell or ship books directly.
        </p>
      </InfoSection>

      <InfoSection title="For Readers">
        <p>
          Browse the categories from the menu, explore the full catalogue on the{" "}
          <Link to="/bookstores" className={linkClass}>Bookstores</Link> page, or find a specific title with{" "}
          <Link to="/advanced-search" className={linkClass}>Advanced Search</Link>.
        </p>
      </InfoSection>

      <InfoSection title="For Authors and Publishers">
        <p>
          Longstreet Press also offers publishing and book marketing services, including ISBN and barcode setup,
          print-on-demand distribution, editorial and design work, Amazon advertising and A+ Content, and launch
          campaigns. Details are on the <Link to="/book-marketing" className={linkClass}>Book Marketing</Link> page,
          where you can request a proposal through the inquiry form.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
