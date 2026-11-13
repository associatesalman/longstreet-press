import { Link } from "react-router-dom";
import InfoPage, { InfoSection } from "./InfoPage";

const linkClass = "text-[#8c2d19] underline hover:text-[#6e2312]";
const LAST_UPDATED = "November 12, 2026";

/** Terms limited to how this website actually works. */
export default function Terms() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms of Use"
      intro={`The terms for using the Longstreet Press website. Last updated ${LAST_UPDATED}.`}
    >
      <InfoSection title="About This Website">
        <p>
          Longstreet Press showcases books and links each title to its listing on Amazon. By using this website you
          agree to these terms.
        </p>
      </InfoSection>

      <InfoSection title="Purchases Are Made on Amazon">
        <p>
          Longstreet Press does not sell, process payments for, ship or accept returns of the books shown on this
          website. Purchases are made on Amazon and are governed by Amazon’s terms and policies. Prices, editions and
          availability are set by Amazon and its sellers and may change at any time.
        </p>
      </InfoSection>

      <InfoSection title="Book Information and Images">
        <p>
          Book titles, cover images and descriptions are shown to help readers identify each book. They remain the
          property of their respective authors, publishers and rights holders. We aim to keep listings accurate, but an
          Amazon listing may change or become unavailable without notice.
        </p>
      </InfoSection>

      <InfoSection title="Book Marketing Inquiries">
        <p>
          Submitting the inquiry form on the <Link to="/book-marketing" className={linkClass}>Book Marketing</Link>{" "}
          page is a request for a proposal. It does not create an agreement or an obligation for either party. Any
          services would be provided only under a separate written agreement.
        </p>
        <p>
          By submitting the form you confirm that you represent the title or publishing catalog described and that the
          information you provide is accurate. How we handle that information is described in our{" "}
          <Link to="/privacy" className={linkClass}>Privacy Policy</Link>.
        </p>
      </InfoSection>

      <InfoSection title="Acceptable Use">
        <p>
          Please do not misuse the website, including by sending automated, misleading or unsolicited submissions
          through the inquiry form or attempting to interfere with the site’s operation.
        </p>
      </InfoSection>

      <InfoSection title="External Websites">
        <p>
          Links to Amazon and other external websites are provided for convenience. Those websites are operated by third
          parties under their own terms and privacy policies.
        </p>
      </InfoSection>

      <InfoSection title="Changes to These Terms">
        <p>We may update these terms from time to time. The date above shows when they were last revised.</p>
      </InfoSection>
    </InfoPage>
  );
}
