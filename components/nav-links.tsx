"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "All Platforms", path: "/browse/ios", slug: "ios" },
  { name: "PC & Console", path: "/browse/android", slug: "android" },
  { name: "Handheld & Deck", path: "/browse/web", slug: "web" },
];

export const NavLinks = () => {
  const params = useParams<{ platform?: string; feature?: string }>();
  const activeFeature = params?.feature || "apps";

  return (
    <>
      {links.map((link) => {
        const isActive = params?.platform === link.slug;
        return (
          <Link
            key={link.path}
            href={`${link.path}/${activeFeature}`}
            className={cn(
              "text-xs font-medium transition-colors whitespace-nowrap shrink-0",
              isActive
                ? "text-white font-semibold"
                : "text-white/70 hover:text-white"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};
