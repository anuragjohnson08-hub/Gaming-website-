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
              "text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2",
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};
