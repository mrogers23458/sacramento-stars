import type { Metadata } from "next";
import { contact, sponsorLevels } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Sponsor Sacramento Stars. Grand Slam, Home Run, and Triple levels for North Natomas businesses.",
};

export default function SponsorsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-16 pb-28 sm:py-24">
      <p className="kicker">Sponsors</p>
      <h1 className="display mt-4 max-w-4xl text-[clamp(4rem,10vw,7.5rem)]">
        Put your name
        <span className="pop block w-fit">on the Stars.</span>
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed">
        Local businesses can put their name on Sacramento Stars. Support stays with the teams in
        North Natomas.
      </p>
      <ul className="mt-12 grid gap-px bg-line lg:grid-cols-3">
        {sponsorLevels.map((level) => (
          <li key={level.name} className="flex flex-col bg-background p-6 sm:p-8">
            <h2 className="display text-5xl">{level.name}</h2>
            <p className="mt-3 text-signal">{level.price}</p>
            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-muted">
              {level.benefits.map((benefit) => (
                <li key={benefit} className="border-t border-line pt-3">
                  {benefit}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <a
        href={`mailto:${contact.email}?subject=Sacramento%20Stars%20sponsorship`}
        className="btn mt-10 inline-flex"
      >
        Become a sponsor
      </a>
    </main>
  );
}
