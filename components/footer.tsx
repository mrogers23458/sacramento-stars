import Link from "next/link";
import { contact } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <p className="display text-4xl">Sacramento Stars</p>
          <p className="mt-3 text-sm text-muted">North Natomas, Sacramento</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/#interest" className="nav-link w-fit">
            Interest list
          </Link>
          <Link href="/about" className="nav-link w-fit">
            About
          </Link>
          <Link href="/sponsors" className="nav-link w-fit">
            Sponsors
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={contact.instagram} className="nav-link w-fit" target="_blank" rel="noreferrer">
            {contact.instagramHandle}
          </a>
          <a href={contact.facebook} className="nav-link w-fit" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={`mailto:${contact.email}`} className="text-foreground hover:text-signal">
            {contact.email}
          </a>
        </div>
      </div>
      <div className="border-t border-line px-5 py-4 text-center text-xs tracking-[0.14em] text-muted uppercase">
        © 2026 Sacramento Stars
      </div>
    </footer>
  );
}
