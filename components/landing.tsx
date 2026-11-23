import Link from "next/link";
import { CoachingStaff } from "@/components/coaches";
import { InterestForm } from "@/components/interest-form";
import { PhotoCarousel } from "@/components/photo-carousel";
import { ages, contact, faqs, standard, steps, type AgeId } from "@/lib/site";

export function Landing({ age }: { age?: AgeId }) {
  const page = age ? age.toLowerCase() : "home";
  const headlineLead = age ?? "Sacramento";
  const subline = age
    ? `Sacramento Stars travel baseball for committed ${age} players in North Natomas.`
    : "Higher-level travel baseball for committed players, 10U through 13U, in North Natomas.";

  return (
    <main id="main-content">
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <p className="kicker">{age ? `${age} · North Natomas` : "North Natomas · Sacramento"}</p>
        <h1 className="display mt-5 text-[clamp(4.6rem,15vw,10.5rem)]">
          <span className={age ? "pop" : undefined}>{headlineLead}</span>
          <span className={age ? "block" : "pop block w-fit"}>Stars</span>
        </h1>
        <p className="accent-rule mt-8 max-w-xl pl-4 text-lg leading-relaxed sm:text-xl">
          {subline}
        </p>
        <a href="#interest" className="btn mt-8 inline-flex">
          Join the interest list
        </a>
        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
          <li>Tournaments</li>
          <li>Tryouts and workouts</li>
          <li>North Natomas</li>
          <li>10U–13U</li>
        </ul>
      </section>

      <section id="teams" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <p className="kicker">Teams</p>
          <h2 className="display mt-4 text-6xl sm:text-8xl">
            Four ages.
            <span className="pop block w-fit">One list.</span>
          </h2>
          <ul className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {ages.map((item) => {
              const current = item.id === age;
              return (
                <li key={item.id} className="bg-background">
                  <Link
                    href={current ? "#interest" : `/${item.slug}#interest`}
                    className={`flex h-full flex-col justify-between p-6 transition-colors hover:bg-raised ${current ? "accent-rule" : ""}`}
                    aria-current={current ? "page" : undefined}
                  >
                    <span className="display text-7xl">{item.label}</span>
                    <span className="mt-10 kicker">Interest list open</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="standard" className="border-t border-line bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <p className="kicker">The standard</p>
          <h2 className="display mt-4 max-w-4xl text-6xl sm:text-8xl">What a roster spot asks.</h2>
          <ul className="mt-12 grid gap-12 sm:grid-cols-2">
            {standard.map((item) => (
              <li key={item.number}>
                <p className="display pop text-5xl">{item.number}</p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="path" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <p className="kicker">How it works</p>
          <h2 className="display mt-4 text-6xl sm:text-8xl">Three steps.</h2>
          <ol className="mt-12 grid gap-10 lg:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="border-t border-line pt-6">
                <p className="display pop text-5xl">{step.number}</p>
                <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="photos" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="kicker">On the field</p>
              <h2 className="display mt-4 text-6xl sm:text-8xl">This season.</h2>
            </div>
            <a
              href={contact.instagram}
              className="kicker text-foreground hover:text-blue"
              target="_blank"
              rel="noreferrer"
            >
              {contact.instagramHandle}
            </a>
          </div>
          <PhotoCarousel />
        </div>
      </section>

      <section id="coaches" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <p className="kicker">Coaching staff</p>
          <h2 className="display mt-4 text-6xl sm:text-8xl">
            The people
            <span className="pop block w-fit">on the field.</span>
          </h2>
          <CoachingStaff />
        </div>
      </section>

      <section id="faq" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <p className="kicker">FAQ</p>
          <h2 className="display mt-4 text-6xl sm:text-8xl">Before you send it.</h2>
          <div className="mt-10 border-t border-line">
            {faqs.map((item) => (
              <details key={item.question} className="group border-b border-line">
                <summary className="cursor-pointer list-none py-5 text-lg font-semibold marker:content-none">
                  <span className="flex items-center justify-between gap-6">
                    {item.question}
                    <span className="display text-3xl text-signal group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="interest" className="border-t border-line pb-28 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <p className="kicker">Interest list</p>
          <h2 className="display mt-4 max-w-4xl text-6xl sm:text-8xl">
            Tell us who
            <span className="pop block w-fit">is playing.</span>
          </h2>
          <div className="relative mt-10">
            <InterestForm age={age} page={page} />
          </div>
        </div>
      </section>
    </main>
  );
}
