import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sacramento Stars is a travel baseball program in North Natomas for committed players from 10U through 13U.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <p className="kicker">About</p>
      <h1 className="display mt-4 max-w-4xl text-[clamp(4rem,10vw,7.5rem)]">
        Born in
        <span className="pop block w-fit">North Natomas.</span>
      </h1>
      <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed">
        <p>
          Sacramento Stars is a travel baseball program in North Natomas. Players here can compete
          at a higher level without leaving the neighborhood to find a team.
        </p>
        <p>
          The program is for families who want tournament baseball, and for players who train on
          and off the field. Private evaluations decide roster spots. Interest lists are open for
          10U, 11U, 12U, and 13U.
        </p>
      </div>
      <Link href="/#interest" className="btn mt-10 inline-flex">
        Join the interest list
      </Link>
    </main>
  );
}
