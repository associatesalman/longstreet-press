/**
 * Bookstores catalogue: the book collection, Amazon link builder and search logic
 * used by the Bookstores page and the Advanced Search page (one shared source).
 */

// =====================================================
// UPDATED BOOK COLLECTION
// All images are local files inside public/
// =====================================================

export const books = [
  // =============== ANCIENT PHILOSOPHY ===============
  {
    title: "Hellenistic Philosophies for the Modern Man",
    author: "George Smeader",
    category: "Ancient Philosophy",
    image: "/ancient/ancient1.jpg",
    asin: "B0CHL9N3JG",
    description:
      "Explore the ideas of Hellenistic philosophy and their relevance to modern life, including timeless approaches to virtue, purpose, and personal reflection.",
  },
  {
    title: "Pensie: A Path of Virtue, Wisdom, and Reflection",
    author: "",
    category: "Ancient Philosophy",
    image: "/ancient/ancient2.jpg",
    asin: "B0FDDC6JS3",
    description:
      "A thoughtful work centered on wisdom, virtue, education, and the importance of reflection in understanding human experience.",
  },
  {
    title: "G.R.'s Bizarre, Vol. 1: The Good, the Bad & the Math",
    author: "Greg Ricker",
    category: "Ancient Philosophy",
    image: "/ancient/ancient3.jpg",
    asin: "B07T2WL21B",
    description:
      "An unusual exploration of mathematics and curious ideas, bringing together intellectual puzzles and unconventional perspectives.",
  },
  {
    title: "Vesta and Her Children: A Tale of the Fall of Rome",
    author: "Marcia J. H. Twain",
    category: "Ancient Philosophy",
    image: "/ancient/ancient4.jpg",
    asin: "B0DKTKBY8N",
    description:
      "Historical fiction exploring family, resilience, and cultural change against the backdrop of ancient Rome's decline.",
  },
  {
    title: "The Polite Apocalypse: Manners and the Death of Discourse",
    author: "C. R. Beaumont",
    category: "Ancient Philosophy",
    image: "/ancient/ancient5.jpg",
    asin: "B0G36ZW438",
    description:
      "A reflection on manners, contemporary society, communication, and the changing nature of public discourse.",
  },

  // =============== CRIME & MYSTERY ===============
  {
    title: "The Mother",
    author: "J. E. Clarkson",
    category: "Crime & Mystery",
    image: "/crime/crime1.jpg",
    asin: "B09X2G1446",
    description:
      "A detective mystery featuring suspense, investigation, and the search for answers behind troubling events.",
  },
  {
    title: "Storm Surge",
    author: "B. D. Toms",
    category: "Crime & Mystery",
    image: "/crime/crime2.jpg",
    asin: "B0HHB65DRG",
    description:
      "A crime and mystery thriller that draws readers into a story of mounting tension and uncertainty.",
  },
  {
    title: "Dead Man's Tiles",
    author: "Mary Stowell & Walter A. Cook",
    category: "Crime & Mystery",
    image: "/crime/crime3.jpg",
    asin: "B0FXR9X3P5",
    description:
      "A mahjong-themed murder mystery combining crime investigation, intriguing clues, and suspense.",
  },
  {
    title: "Whitewashed Tombs",
    author: "Russell Jones",
    category: "Crime & Mystery",
    image: "/crime/crime4.jpg",
    asin: "B0GTW2536D",
    description:
      "A psychological crime thriller exploring conspiracy, concealed motives, and unsettling mysteries.",
  },
  {
    title: "The Lamb",
    author: "J. E. Clarkson",
    category: "Crime & Mystery",
    image: "/crime/crime5.jpg",
    asin: "B09LGY94SK",
    description:
      "A detective crime thriller centered on a serial killer investigation and the darker side of human behavior.",
  },

  // =============== HUMANITIES & SOCIETY ===============
  {
    title:
      "What's Your Frequency?: Introducing the Four Frequencies of Humanity",
    author: "Dr. Philippe SHOCK Matthews",
    category: "Humanities & Society",
    image: "/humanities/humanities1.jpg",
    asin: "B0HC4DLY8H",
    description:
      "An examination of human experience through the concept of four frequencies of humanity, encouraging reflection on identity and behavior.",
  },
  {
    title:
      "Humanity in the Age of AI: What It Means to Be Human When Machines Can Think",
    author: "Dr. Sean Tobin",
    category: "Humanities & Society",
    image: "/humanities/humanities2.jpg",
    asin: "B0HK2KQ8HM",
    description:
      "Explore questions about human identity, artificial intelligence, technology, and the future of society.",
  },
  {
    title:
      "The Peopling of the World: A Journey from African Origins to Global Humanity",
    author: "Mario Arland",
    category: "Humanities & Society",
    image: "/humanities/humanities3.jpg",
    asin: "B0FP12JWKV",
    description:
      "A journey through humanity's origins, migrations, and the historical processes that shaped populations around the world.",
  },
  {
    title:
      "The Secret Power of Humanity: A New World Model for Human Transformation, Unity, Peaceful Prosperity and Sustainable Development",
    author: "Ijigban Daniel Oketa",
    category: "Humanities & Society",
    image: "/humanities/humanities4.jpg",
    asin: "B0CTHR59Q4",
    description:
      "An exploration of human development, social transformation, unity, and sustainable progress.",
  },
  {
    title: "Intelligence Evolved: The Algorithm Upgraded",
    author: "Glenn Anthony Vaags",
    category: "Humanities & Society",
    image: "/humanities/humanities5.jpg",
    asin: "B0DTGQCQXX",
    description:
      "A work examining artificial intelligence, technological evolution, and the implications of intelligent systems for society.",
  },

  // =============== ACADEMIC & SCHOLARLY ===============
  {
    title:
      "The Office of the Bishop: From the Book of Acts to the Azusa Street Revival & Beyond",
    author: "Bishop Andy C. Lewter, D. Min.",
    category: "Academic & Scholarly",
    image: "/scholarly/scholarly1.jpg",
    asin: "B0FPQQDCWK",
    description:
      "An examination of religious leadership and the historical development of the office of bishop within Christianity.",
  },
  {
    title: "WAG Your Work: Writing Accountability Groups",
    author: "Kimberly A. Skarupski, PhD, MPH",
    category: "Academic & Scholarly",
    image: "/scholarly/scholarly2.jpg",
    asin: "1979668485",
    description:
      "A practical guide to writing accountability groups, academic productivity, and structured scholarly writing.",
  },
  {
    title:
      "The Staff and the Scepter: Exploring the Struggle That Led to the Separation of Church and State",
    author: "Bishop Andy C. Lewter, D. Min.",
    category: "Academic & Scholarly",
    image: "/scholarly/scholarly3.jpg",
    asin: "B0G4JH4C14",
    description:
      "A historical exploration of the relationship between religious institutions, political authority, and the separation of church and state.",
  },
  {
    title:
      "From Apostles to Bishops: A Review of the Early Church's Leadership Positions",
    author: "Bishop Andy C. Lewter, D. Min.",
    category: "Academic & Scholarly",
    image: "/scholarly/scholarly4.jpg",
    asin: "B0FNX6XF13",
    description:
      "A scholarly examination of early Christian leadership structures and their historical development.",
  },
  {
    title:
      "Being a Scholar: Reflections on Doctoral Study, Scholarly Writing, and Academic Life",
    author: "David Labaree",
    category: "Academic & Scholarly",
    image: "/scholarly/scholarly5.jpg",
    asin: "B0BYRC28MH",
    description:
      "Reflections on doctoral education, academic research, scholarly writing, and professional intellectual life.",
  },

  // =============== HISTORICAL FICTION ===============
  {
    title: "Tender Rot",
    subtitle: "Volume One",
    author: "Morenike Honteuse",
    category: "Historical Fiction",
    image: "/history/history1.jpg",
    asin: "B0GX32KLFB",
    description:
      "A work of historical Gothic and dark fiction exploring atmosphere, mystery, and unsettling themes.",
  },
  {
    title: "Anne Black: Seed of Scotland",
    author: "Rosanne Vaughan",
    category: "Historical Fiction",
    image: "/history/history2.jpg",
    asin: "B0FSQWQMC4",
    description:
      "A Scottish Gothic story combining historical influences, fantasy, and romance.",
  },
  {
    title: "Christmas in '45",
    subtitle: "A Novel",
    author: "Mark W. Sasse",
    category: "Historical Fiction",
    image: "/history/history3.jpg",
    asin: "B0B6RWCN6B",
    description:
      "Historical fiction set around the closing period of World War II, exploring lives shaped by conflict and change.",
  },
  {
    title: "The Mummy's Vengeance",
    subtitle: "Case Files from the Nightfall Detective Agency",
    author: "David Alyn Gordon",
    category: "Historical Fiction",
    image: "/history/history4.jpg",
    asin: "B0CKLKLK6G",
    description:
      "A historical mystery and horror adventure from the Nightfall Detective Agency case files.",
  },
  {
    title: "Beneath the Angels of Mons",
    subtitle: "Tales of the Supernatural and Psychological",
    author: "Gregg F. Bartley",
    category: "Historical Fiction",
    image: "/history/history5.jpg",
    asin: "B0DJY557WN",
    description:
      "A collection bringing together wartime influences, supernatural themes, and psychological storytelling.",
  },

  // =============== LITERARY & CLASSIC FICTION ===============
  {
    title: "Vesta and Her Children",
    subtitle: "A Tale of the Fall of Rome",
    author: "Marcia Twain",
    category: "Literary & Classic Fiction",
    image: "/fiction/fiction1.webp",
    asin: "B0DKTKBY8N",
    description:
      "Journey into ancient Rome through a historical novel exploring family bonds, resilience, and the decline of an empire.",
  },
  {
    title: "The Illustrated Catholic Bible Companion",
    subtitle: "All 73 Books — One Story of Salvation",
    author: "Brendan Mulcahy",
    category: "Literary & Classic Fiction",
    image: "/Theology, Bibles/Theology, Bibles5.jpg",
    asin: "B0HKD8QN1T",
    description:
      "An illustrated companion introducing readers to the 73 books of the Catholic Bible and the overarching story of salvation.",
  },
  {
    title: "Mansfield Park",
    subtitle: "A Classic Novel",
    author: "Jane Austen",
    category: "Literary & Classic Fiction",
    image: "/fiction/fiction3.jpg",
    asin: "0996947833",
    description:
      "Jane Austen's classic exploration of family relationships, social expectations, morality, and personal integrity.",
  },
  {
    title: "The Tenth Symphony",
    author: "Dean Evans",
    category: "Literary & Classic Fiction",
    image: "/fiction/fiction4.jpg",
    asin: "B0CF8BL7PW",
    description:
      "Contemporary literary fiction exploring themes connected with music and storytelling.",
  },
  {
    title: "El collar de diamantes / The Diamond Necklace",
    subtitle: "Spanish Translation",
    author: "Guy de Maupassant",
    category: "Literary & Classic Fiction",
    image: "/fiction/fiction5.jpg",
    asin: "B009Z1FBJU",
    description:
      "A Spanish translation of Maupassant's classic short story about ambition, appearances, and the consequences of deception.",
  },

  // =============== GRAPHIC NOVELS & MANGA ===============
  {
    title: "Emmanuel Just Wants to Die",
    author: "Talhí Briones & Karina Briones",
    category: "Graphic Novels & Manga",
    image: "/comics/comic1.jpg",
    asin: "B087WXM5T9",
    description:
      "An independent graphic novel by Talhí Briones and Karina Briones.",
  },
  {
    title: "Cyber Fighter",
    author: "William Joseph Hill",
    category: "Graphic Novels & Manga",
    image: "/comics/comic2.jpg",
    asin: "B08ZL6X6W6",
    description:
      "A science-fiction action graphic novel featuring futuristic themes and illustrated storytelling.",
  },
  {
    title: "1Y1 Son 10",
    author: "Tech Books for Kids",
    category: "Graphic Novels & Manga",
    image: "/comics/comic3.jpg",
    asin: "1974615286",
    description:
      "An illustrated title aimed at young readers and featuring accessible visual storytelling.",
  },
  {
    title: "Lilwickidz Book 2",
    author: "Lilwickidz",
    category: "Graphic Novels & Manga",
    image: "/comics/comic4.jpg",
    asin: "B07LFNZ54S",
    description:
      "The second installment in the colorful Lilwickidz children's comic series.",
  },
  {
    title: "The Demons of Angels: A Graphic Novel",
    author: "H.C. Gislason & Nick Romario",
    category: "Graphic Novels & Manga",
    image: "/comics/comic5.jpg",
    asin: "B07BCXKMRZ",
    description:
      "A dark graphic novel blending dramatic illustration, fantasy elements, and visual storytelling.",
  },

  // =============== BIOGRAPHY & MEMOIR ===============
  {
    title: "Better Late Than Never: Transitioning Late in Life",
    subtitle: "A Transgender Autobiography",
    author: "Kristy McClellan",
    category: "Biography & Memoir",
    image: "/biography/biography1.jpg",
    asin: "B085LV28RK",
    description:
      "An autobiography exploring personal identity, transition later in life, and the experience of profound personal change.",
  },
  {
    title: "Love Me",
    subtitle:
      "A Memoir of Online Dating, Mental Illness and Redemption",
    author: "Oshun Reed",
    category: "Biography & Memoir",
    image: "/biography/biography2.jpg",
    asin: "B0DG655JHW",
    description:
      "A personal memoir examining online dating, mental illness, relationships, and redemption.",
  },
  {
    title: "The Corfu Diaries: One Way Ticket to Paradise",
    subtitle: "A Travel Memoir",
    author: "Mike O'Toole",
    category: "Biography & Memoir",
    image: "/biography/biography3.jpg",
    asin: "B0GX2YQT2W",
    description:
      "A travel memoir exploring new beginnings, personal experiences, and the adventure of life in Corfu.",
  },
  {
    title: "Good Trouble on the High Seas",
    subtitle: "A Memoir",
    author: "",
    category: "Biography & Memoir",
    image: "/biography/biography4.jpg",
    asin: "B0F6BNP924",
    description:
      "A maritime memoir recounting adventures, experiences, and personal discoveries connected with life at sea.",
  },
  {
    title: "Strange Tribe",
    subtitle: "A Family Memoir",
    author: "John Hemingway",
    category: "Biography & Memoir",
    image: "/biography/biography5.jpg",
    asin: "B081ZL8YDJ",
    description:
      "A family memoir reflecting on ancestry, family relationships, identity, and inherited personal histories.",
  },
];

// =====================================================
// GENERATE AMAZON LINKS
// =====================================================

export const getAmazonUrl = (book) => {
  return `https://www.amazon.com/dp/${book.asin}`;
};

// =====================================================
// SEARCH NORMALIZATION
// =====================================================

export const normalizeText = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// =====================================================
// SEARCH (title, subtitle, author and category; every word must match)
// =====================================================

export function bookMatchesSearch(book, search) {
  const queryWords = normalizeText(search).split(" ").filter(Boolean);
  const searchableText = normalizeText(
    [book.title, book.subtitle, book.author, book.category].filter(Boolean).join(" ")
  );
  return queryWords.every((word) => searchableText.includes(word));
}

/** Every word of `query` appears in `value` (empty query matches everything). */
export function fieldMatches(value, query) {
  const words = normalizeText(query).split(" ").filter(Boolean);
  const text = normalizeText(value);
  return words.every((word) => text.includes(word));
}
