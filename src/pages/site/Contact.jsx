import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Search } from "lucide-react";
import InfoPage, { InfoSection } from "./InfoPage";

const linkClass = "text-[#8c2d19] underline hover:text-[#6e2312]";
const buttonClass =
  "rounded bg-[#8c2d19] hover:bg-[#6e2312] active:bg-[#5a1c0f] text-white text-[14px] font-semibold py-2.5 px-5 inline-flex items-center gap-2 no-underline";

/** Contact and collector support. The Book Marketing form remains the only contact form on the site. */
export default function Contact() {
  return (
    <InfoPage
      eyebrow="Collector Support"
      title="Contact Longstreet Press"
      breadcrumb="Contact"
      intro="Find the right place for your question, whether it concerns a book you found here or our publishing and marketing services."
    >
      <InfoSection title="Publishing and Book Marketing Inquiries">
        <p>
          Authors, publishers and presses can reach our marketing desk through the inquiry form on the Book Marketing
          page. Share your title details and goals, and we will reply to the email address you provide.
        </p>
        <p>
          <Link to="/book-marketing#inquiry-desk" className={buttonClass}>
            <Mail size={15} />
            Open the Inquiry Form
          </Link>
        </p>
      </InfoSection>

      <InfoSection title="Orders, Shipping and Returns">
        <p>
          Books featured on Longstreet Press are purchased on Amazon. For questions about an order, delivery, a
          return or a refund, please contact Amazon customer service through your Amazon account, as Longstreet Press
          does not process or ship orders.
        </p>
        <p>
          <a
            href="https://www.amazon.com/gp/help/customer/display.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} inline-flex items-center gap-1`}
          >
            Amazon Help &amp; Customer Service
            <ArrowUpRight size={14} />
          </a>
        </p>
      </InfoSection>

      <InfoSection title="Finding a Book">
        <p>
          Search the catalogue by title, author or category with{" "}
          <Link to="/advanced-search" className={linkClass}>Advanced Search</Link>, or browse everything on the{" "}
          <Link to="/bookstores" className={linkClass}>Bookstores</Link> page.
        </p>
        <p>
          <Link to="/advanced-search" className={buttonClass}>
            <Search size={15} />
            Search the Catalogue
          </Link>
        </p>
      </InfoSection>

      <InfoSection title="Address">
        <p className="flex items-start gap-2">
          <MapPin size={16} className="text-[#8c2d19] mt-0.5 shrink-0" />
          <span>
            2974 Hardman Ct NE
            <br />
            Atlanta, GA 30305-3425
          </span>
        </p>
      </InfoSection>
    </InfoPage>
  );
}
