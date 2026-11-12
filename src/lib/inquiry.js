/**
 * Book Marketing inquiry: field options, defaults and validation, shared by the
 * browser form (src/bookmarketing/bookmarketing.jsx) and the server endpoint
 * (server/inquiry.js) so both apply exactly the same rules.
 *
 * No imports and no browser/Node APIs: this file runs unchanged in both places.
 * It contains no addresses or credentials; those live only in server env vars.
 */

export const TARGET_MARKETS = [
  "Amazon US and Canada",
  "Amazon UK and Europe",
  "Global Worldwide Rollout",
  "Direct Author Store and Amazon",
];

export const PRIMARY_SERVICES = [
  "Full-Service Book Publishing and Print Production",
  "Official ISBN Assignment and Barcode Generation",
  "Print-on-Demand (POD) Setup and Global Distribution",
  "Editorial Development and Manuscript Proofreading",
  "Interior Typesetting and Book Architecture",
  "Cover Design and Print Finishes",
  "Global Distribution (IngramSpark, B&N, Waterstones)",
  "Amazon Book Marketing and Backend SEO",
  "Amazon Advertising (PPC, Video, and DSP)",
  "Amazon A+ Content and Brand Story Architecture",
  "Structured Launch Campaigns (Pre-Order to Bestseller Surge)",
  "Social Media Marketing (BookTok, Bookstagram, and Meta)",
  "Full-Service Advertising Account Management",
  "Backlist Catalog Revival and Metadata Modernization",
  "Editorial ARC Seeding and Advance Review Distribution",
  "Direct Bibliophile Newsletter and Category Takeovers",
  "Complete 360 Publisher Flight (All Marketing Channels)",
];

export const MONTHLY_BUDGETS = [
  "Initial Test Phase ($750 to $1,500)",
  "Standard Growth Phase ($1,500 to $3,500)",
  "Bestseller Push ($3,500 to $7,500)",
  "Full Publisher Catalog Strategy ($7,500+)",
];

/** Name of the hidden anti-spam field. People never see it; bots tend to fill it. */
export const HONEYPOT_FIELD = "website";

/** The consent statement shown beside the checkbox, repeated in the email. */
export const CONSENT_STATEMENT =
  "I confirm that I represent this title or publishing catalog and request a formal campaign audit and strategic proposal from the publishing team. I have read the Terms of Use and Privacy Policy.";

/** Every select starts empty ("Select…"), so nothing is submitted that the visitor did not choose. */
export const emptyInquiry = {
  authorOrPublisher: "",
  contactName: "",
  email: "",
  amazonLinkOrAsin: "",
  targetMarket: "",
  primaryService: "",
  monthlyBudget: "",
  campaignNotes: "",
  termsAccepted: false,
};

export const fieldLimits = {
  authorOrPublisher: 150,
  contactName: 100,
  email: 254,
  amazonLinkOrAsin: 500,
  campaignNotes: 5000,
};

const selectOptions = {
  targetMarket: TARGET_MARKETS,
  primaryService: PRIMARY_SERVICES,
  monthlyBudget: MONTHLY_BUDGETS,
};

const selectLabels = {
  targetMarket: "Target Marketplace",
  primaryService: "Primary Service Requirement",
  monthlyBudget: "Estimated Monthly Promotion Budget",
};

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:".]+(\.[^\s@<>()[\]\\,;:".]+)+$/;
// Control characters (including CR and LF) are never valid in single-line fields;
// stripping them also rules out email header injection through the subject or Reply-To.
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u001f\u007f]/g;
// Multi-line notes keep line breaks but lose every other control character.
// eslint-disable-next-line no-control-regex
const CONTROL_EXCEPT_NEWLINE = /[\u0000-\u0009\u000b-\u001f\u007f]/g;

const text = (value) => (typeof value === "string" ? value : "");

/**
 * Normalizes untrusted input and returns the cleaned values plus any field errors
 * (an object keyed by field name; empty when the inquiry is valid).
 */
export function validateInquiry(input) {
  const raw = input && typeof input === "object" ? input : {};
  const line = (key) => text(raw[key]).replace(CONTROL, " ").replace(/\s+/g, " ").trim();

  const values = {
    authorOrPublisher: line("authorOrPublisher"),
    contactName: line("contactName"),
    email: line("email"),
    amazonLinkOrAsin: line("amazonLinkOrAsin"),
    targetMarket: line("targetMarket"),
    primaryService: line("primaryService"),
    monthlyBudget: line("monthlyBudget"),
    campaignNotes: text(raw.campaignNotes)
      .replace(/\r\n?/g, "\n")
      .replace(CONTROL_EXCEPT_NEWLINE, "")
      .trim(),
    termsAccepted: raw.termsAccepted === true,
  };

  const errors = {};
  const tooLong = (key) => values[key].length > fieldLimits[key];

  if (!values.authorOrPublisher) errors.authorOrPublisher = "Please enter the author or press name.";
  else if (tooLong("authorOrPublisher"))
    errors.authorOrPublisher = `Please keep the author or press name under ${fieldLimits.authorOrPublisher} characters.`;

  if (!values.contactName) errors.contactName = "Please enter the lead contact name.";
  else if (tooLong("contactName"))
    errors.contactName = `Please keep the contact name under ${fieldLimits.contactName} characters.`;

  if (!values.email) errors.email = "Please enter your email address.";
  else if (tooLong("email") || !EMAIL.test(values.email))
    errors.email = "Please provide a valid email address, like editor@press.com.";

  if (tooLong("amazonLinkOrAsin"))
    errors.amazonLinkOrAsin = `Please keep the ASIN, ISBN or URL under ${fieldLimits.amazonLinkOrAsin} characters.`;

  for (const [key, options] of Object.entries(selectOptions)) {
    if (values[key] && !options.includes(values[key])) {
      errors[key] = `Please choose one of the listed options for ${selectLabels[key]}.`;
    }
  }

  if (!values.campaignNotes) errors.campaignNotes = "Please describe your book details and campaign objectives.";
  else if (tooLong("campaignNotes"))
    errors.campaignNotes = `Please keep the book details under ${fieldLimits.campaignNotes} characters.`;

  if (!values.termsAccepted)
    errors.termsAccepted = "Please confirm the statement and acknowledge the Terms of Use and Privacy Policy.";

  return { values, errors };
}
