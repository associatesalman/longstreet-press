import { Link } from "react-router-dom";
import InfoPage, { InfoSection } from "./InfoPage";

const linkClass = "text-[#8c2d19] underline";
const LEGAL_LAST_UPDATED = "November 12, 2026";

/** Describes only what this website actually does with information. */
export default function Privacy() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`How the Longstreet Press website handles information. Last updated ${LEGAL_LAST_UPDATED}.`}
    >
      <InfoSection title="Browsing the Website">
        <p>
          You can browse Longstreet Press without creating an account or providing personal information. The website
          does not set its own cookies and does not use analytics or advertising trackers.
        </p>
        <p>
          Like most websites, the servers that host this site may record standard technical information, such as your
          IP address, browser type and the pages requested, as part of normal operation and security.
        </p>
      </InfoSection>

      <InfoSection title="Book Marketing Inquiry Form">
        <p>
          When you submit the inquiry form on the <Link to="/book-marketing" className={linkClass}>Book Marketing</Link>{" "}
          page, we receive the details you enter: author or press name, contact name, email address, any Amazon ASIN,
          ISBN or book URL, your selected marketplace, service and budget, your book details and campaign objectives,
          and your confirmation of the consent statement.
        </p>
        <p>
          These details are sent to our inbox by email through our email delivery provider and are used to review your
          inquiry, prepare a proposal and reply to you. To limit repeated or automated submissions, our server briefly
          uses your IP address to count recent submissions; this count is held in memory and is not stored in a database.
        </p>
      </InfoSection>

      <InfoSection title="Links and Content From Other Services">
        <p>
          Each <strong>View Book</strong> link takes you to Amazon. Once you leave this website, Amazon’s own privacy
          notice applies to anything you do there, including purchases.
        </p>
        <p>
          Some images on this website are loaded from Pexels and Unsplash, and some fonts are loaded from Google Fonts.
          When your browser loads them, those services receive standard technical information such as your IP address.
        </p>
      </InfoSection>

      <InfoSection title="Questions and Requests">
        <p>
          To ask about, correct or remove information you sent through the inquiry form, reply to any email you have
          received from us, or submit a request through the{" "}
          <Link to="/book-marketing#inquiry-desk" className={linkClass}>inquiry form</Link>. See also our{" "}
          <Link to="/terms" className={linkClass}>Terms of Use</Link>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
