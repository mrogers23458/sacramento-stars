import { coaches } from "@/lib/site";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function CoachingStaff() {
  const single = coaches.length === 1;

  return (
    <ul className={single ? "" : "mt-12 grid gap-12 sm:grid-cols-2 xl:grid-cols-3"}>
      {coaches.map((coach) => (
        <li
          key={coach.name}
          className={
            single ? "mt-12 grid items-center gap-8 lg:grid-cols-[minmax(16rem,22rem)_1fr]" : ""
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}${coach.image}`}
            alt={`${coach.name}, ${coach.role}, with a Sacramento Stars player`}
            width={776}
            height={1024}
            className={
              single
                ? "w-full"
                : "aspect-[3/4] w-full object-cover object-top"
            }
          />
          <div>
            <p className="kicker text-blue">{coach.role}</p>
            <h3 className="display mt-3 text-5xl sm:text-6xl">{coach.name}</h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">{coach.bio}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
