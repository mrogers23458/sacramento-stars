"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { contact, photos } from "@/lib/site";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function PhotoCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(2);
  const [step, setStep] = useState(0);
  const startX = useRef(0);

  useLayoutEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const apply = () => {
      const nextPerView = query.matches ? 2 : 1;
      setPerView(nextPerView);
      setIndex((current) => Math.min(current, Math.max(0, photos.length - nextPerView)));
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    const track = viewport.current?.querySelector("ul");
    const slide = track?.querySelector("li");
    if (!track || !slide) return;
    const measure = () => {
      const gapPx = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const next = slide.getBoundingClientRect().width + gapPx;
      if (next > 0) setStep((current) => (Math.abs(current - next) < 0.5 ? current : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(slide);
    return () => observer.disconnect();
  }, [perView]);

  function measuredStep() {
    const track = viewport.current?.querySelector("ul");
    const slide = track?.querySelector("li");
    if (!track || !slide) return 0;
    const gapPx = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    return slide.getBoundingClientRect().width + gapPx;
  }

  function go(delta: number) {
    const nextStep = measuredStep();
    if (nextStep > 0) setStep(nextStep);
    setIndex((current) => {
      const limit = Math.max(0, photos.length - perView);
      let next = current + delta;
      if (next > limit) next = 0;
      if (next < 0) next = limit;
      return next;
    });
  }

  const shift = `translateX(-${index * step}px)`;

  const label = `${String(index + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

  return (
    <div
      className="mt-10"
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        go(event.key === "ArrowRight" ? 1 : -1);
      }}
    >
      <div
        ref={viewport}
        className="overflow-hidden"
        onPointerDown={(event) => {
          startX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          const delta = event.clientX - startX.current;
          if (delta <= -48) go(1);
          if (delta >= 48) go(-1);
        }}
      >
        <ul
          className="flex gap-5 transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: shift }}
          aria-label="This season"
        >
          {photos.map((photo, photoIndex) => (
            <li
              key={photo.src}
              className="w-full shrink-0 sm:w-[calc((100%-1.25rem)/2)]"
              aria-label={`${photoIndex + 1} of ${photos.length}`}
            >
              <a href={photo.href} target="_blank" rel="noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${base}${photo.src}`}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="aspect-[4/5] w-full object-cover transition duration-300 hover:brightness-110"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          From this season. More on {contact.instagramHandle}.
        </p>
        <div className="flex items-center gap-3">
          <p className="kicker tabular-nums">{label}</p>
          <button type="button" className="carousel-btn" onClick={() => go(-1)}>
            Prev
          </button>
          <button type="button" className="carousel-btn" onClick={() => go(1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
