import { ages, birthYears, type AgeId } from "@/lib/site";

export type InterestState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<InterestField, string>>;
  mailHref?: string;
};

export type InterestField =
  | "parentName"
  | "email"
  | "phone"
  | "playerFirstName"
  | "age"
  | "birthYear"
  | "currentTeam"
  | "position"
  | "note";

export type InterestLead = {
  receivedAt: string;
  parentName: string;
  email: string;
  phone: string;
  playerFirstName: string;
  age: AgeId;
  birthYear: string;
  currentTeam: string;
  position: string;
  note: string;
  page: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

const ageIds = new Set<string>(ages.map((age) => age.id));
const birthYearSet = new Set<string>(birthYears);

function clean(value: FormDataEntryValue | null, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export function parseInterest(formData: FormData):
  | { ok: true; ignored: true }
  | { ok: true; lead: InterestLead }
  | { ok: false; fieldErrors: Partial<Record<InterestField, string>> } {
  if (clean(formData.get("company"), 200)) {
    return { ok: true, ignored: true };
  }

  const parentName = clean(formData.get("parentName"), 80);
  const email = clean(formData.get("email"), 120);
  const phone = clean(formData.get("phone"), 30);
  const playerFirstName = clean(formData.get("playerFirstName"), 40);
  const age = clean(formData.get("age"), 4);
  const birthYear = clean(formData.get("birthYear"), 4);
  const currentTeam = clean(formData.get("currentTeam"), 120);
  const position = clean(formData.get("position"), 60);
  const note = clean(formData.get("note"), 800);
  const fieldErrors: Partial<Record<InterestField, string>> = {};

  if (parentName.length < 2) fieldErrors.parentName = "Enter a parent or guardian name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Enter a valid email.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) fieldErrors.phone = "Enter a phone number.";
  if (playerFirstName.length < 2) fieldErrors.playerFirstName = "Enter the player’s first name.";
  if (!ageIds.has(age)) fieldErrors.age = "Choose 10U, 11U, 12U, or 13U.";
  if (!birthYearSet.has(birthYear)) fieldErrors.birthYear = "Choose a birth year.";
  if (currentTeam.length < 2) fieldErrors.currentTeam = "Enter a current team, or “none”.";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    lead: {
      receivedAt: new Date().toISOString(),
      parentName,
      email,
      phone,
      playerFirstName,
      age: age as AgeId,
      birthYear,
      currentTeam,
      position,
      note,
      page: clean(formData.get("page"), 20) || "home",
      utmSource: clean(formData.get("utm_source"), 120),
      utmMedium: clean(formData.get("utm_medium"), 120),
      utmCampaign: clean(formData.get("utm_campaign"), 160),
      utmContent: clean(formData.get("utm_content"), 160),
      utmTerm: clean(formData.get("utm_term"), 160),
    },
  };
}

export function formatLead(lead: InterestLead) {
  return [
    "Sacramento Stars interest list",
    "",
    `Player: ${lead.playerFirstName}`,
    `Age group: ${lead.age}`,
    `Birth year: ${lead.birthYear}`,
    `Current team: ${lead.currentTeam}`,
    `Position: ${lead.position || "—"}`,
    "",
    `Parent: ${lead.parentName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    "",
    `Note: ${lead.note || "—"}`,
    "",
    `Page: ${lead.page}`,
    `UTM source: ${lead.utmSource || "—"}`,
    `UTM medium: ${lead.utmMedium || "—"}`,
    `UTM campaign: ${lead.utmCampaign || "—"}`,
    `UTM content: ${lead.utmContent || "—"}`,
    `UTM term: ${lead.utmTerm || "—"}`,
    `Received: ${lead.receivedAt}`,
  ].join("\n");
}
