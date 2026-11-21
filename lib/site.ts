export const ages = [
  { id: "10U", slug: "10u", label: "10U" },
  { id: "11U", slug: "11u", label: "11U" },
  { id: "12U", slug: "12u", label: "12U" },
  { id: "13U", slug: "13u", label: "13U" },
] as const;

export type AgeId = (typeof ages)[number]["id"];
export type AgeSlug = (typeof ages)[number]["slug"];

export const contact = {
  email: "sacramentostars10u@gmail.com",
  instagram: "https://www.instagram.com/dugout.stars",
  instagramHandle: "@dugout.stars",
  facebook: "https://www.facebook.com/profile.php?id=61591228059035",
};

export const standard = [
  {
    number: "01",
    title: "Tournaments",
    body: "Weekend tournament baseball for players who want higher-level competition.",
  },
  {
    number: "02",
    title: "On and off the field",
    body: "Roster spots are for players who train when the game is over, not only between the lines.",
  },
  {
    number: "03",
    title: "Private evaluations",
    body: "The interest list leads to a private evaluation. Roster decisions start there.",
  },
  {
    number: "04",
    title: "North Natomas",
    body: "Based in North Natomas, Sacramento, so families can compete close to home.",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Join the list",
    body: "Send a parent contact, the player’s first name, and an age group. It takes a minute.",
  },
  {
    number: "02",
    title: "Private evaluation",
    body: "The team follows up to schedule an evaluation. A form does not hold a roster spot.",
  },
  {
    number: "03",
    title: "Roster spot",
    body: "Players who make a team commit to tournament baseball and to training on and off the field.",
  },
] as const;

export const faqs = [
  {
    question: "Which age groups are open?",
    answer:
      "Interest lists are open for 10U, 11U, 12U, and 13U. Pick the age group on the form and the team will follow up.",
  },
  {
    question: "Where do the teams play?",
    answer:
      "Home base is North Natomas, Sacramento. Games and tournaments are played around the Sacramento region.",
  },
  {
    question: "What is the commitment?",
    answer:
      "Sacramento Stars is higher-level travel baseball. Players are expected to train on and off the field and to play a tournament schedule.",
  },
  {
    question: "What happens after the form?",
    answer:
      "The form opens an email with the details filled in. Send it, and a coach or director follows up by email or phone to set a private evaluation. Roster spots are decided after that evaluation.",
  },
  {
    question: "What does it cost?",
    answer:
      "Dues are confirmed in the follow-up after a player joins the interest list.",
  },
] as const;

export const sponsorLevels = [
  {
    name: "Grand Slam",
    price: "$1,000 and up",
    benefits: [
      "Banner at ALL games and tournaments",
      "Logo on player jerseys",
      "Named Official Team Sponsor",
      "Dedicated social media shoutouts",
      "Featured on sponsor page",
    ],
  },
  {
    name: "Home Run",
    price: "$500 – $999",
    benefits: [
      "Banner at home games",
      "Logo on team gear bags",
      "Social media recognition",
      "Listed on sponsor page",
    ],
  },
  {
    name: "Triple",
    price: "$250 – $499",
    benefits: [
      "Logo on warm-up shirts",
      "Name on website and roster",
      "Social media thank-you post",
      "Listed on sponsor page",
    ],
  },
] as const;

export const birthYears = [
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
] as const;

export function ageFromSlug(slug: string): AgeId | undefined {
  return ages.find((age) => age.slug === slug)?.id;
}
