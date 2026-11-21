"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sitePath } from "@/lib/paths";

const landing = /^\/(10u|11u|12u|13u)$/;

export function StickyCta() {
  const pathname = usePathname();
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const onLanding = path === "/" || landing.test(path);
  const href = onLanding ? "#interest" : sitePath("/#interest");
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("interest");
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  if (formVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 p-3 backdrop-blur sm:hidden">
      <a href={href} className="btn inline-flex w-full">
        Join the interest list
      </a>
    </div>
  );
}
