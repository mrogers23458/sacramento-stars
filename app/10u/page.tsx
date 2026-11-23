import type { Metadata } from "next";
import { Landing } from "@/components/landing";

export const metadata: Metadata = {
  title: "10U interest list",
  description:
    "Join the Sacramento Stars 10U interest list. Higher-level travel baseball in North Natomas. A tryout, workout, or private evaluation follows.",
};

export default function Page() {
  return <Landing age="10U" />;
}
