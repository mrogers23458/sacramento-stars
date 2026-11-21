import type { Metadata } from "next";
import { Landing } from "@/components/landing";

export const metadata: Metadata = {
  title: "12U interest list",
  description:
    "Join the Sacramento Stars 12U interest list. Higher-level travel baseball in North Natomas, with a private evaluation to follow.",
};

export default function Page() {
  return <Landing age="12U" />;
}
