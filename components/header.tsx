"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sitePath } from "@/lib/paths";

const landing = /^\/(10u|11u|12u|13u)$/;

function normalize(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

function hrefFor(pathname: string, id: string) {
  const path = normalize(pathname);
  if (path === "/" || landing.test(path)) return `#${id}`;
  return sitePath(`/#${id}`);
}

export function Header() {
  const pathname = usePathname();
  const interestHref = hrefFor(pathname, "interest");
  const links = [
    { href: hrefFor(pathname, "teams"), label: "Teams" },
    { href: hrefFor(pathname, "standard"), label: "The Standard" },
    { href: hrefFor(pathname, "coaches"), label: "Coaches" },
    { href: hrefFor(pathname, "faq"), label: "FAQ" },
    { href: sitePath("/sponsors"), label: "Sponsors" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* The Pages base path has to be in the URL. next/image left raw files at the domain root. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mark.svg`}
            alt="Sacramento Stars"
            width={34}
            height={44}
            className="h-11 w-auto"
          />
          <span className="display hidden text-[1.7rem] sm:block">Sacramento Stars</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <a href={interestHref} className="btn hidden sm:inline-flex">
          Join the interest list
        </a>
      </div>
      <nav
        className="flex gap-5 overflow-x-auto px-5 pb-3 lg:hidden"
        aria-label="Sections"
      >
        {links.map((link) => (
          <a key={link.label} href={link.href} className="nav-link shrink-0">
            {link.label}
          </a>
        ))}
      </nav>
      <div className="brand-bar" aria-hidden="true" />
    </header>
  );
}
