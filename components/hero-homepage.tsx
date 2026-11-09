"use client";

import { Button } from "@/components/ui/button";
import { useGameFilter } from "@/hooks/use-game-filter";
import { useSearchModal } from "@/hooks/use-search-modal";
import { motion } from "framer-motion";
import Image from "next/image";

const floatHoverVariants = {
  rest: {
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
    },
  },
  hover: {
    y: [-6, -11, -6],
    scale: 1.02,
    transition: {
      y: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
      scale: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  },
};

export function HeroHomepage() {
  const { openGameModal } = useGameFilter();
  const searchModal = useSearchModal();

  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-background py-12 md:py-16">
      <div className="relative z-10 marge-x grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <div className="space-y-5 max-w-2xl">
          <div className="text-xs text-muted-foreground font-mono tabular-nums">
            MetaPulse Static Editorial View · 8 Curated Releases · 48 Outlet Verdicts
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.12]">
            All game reviews from across the internet in one catalogue.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Instantly browse aggregated critic scores, verified Steam sentiment,
            and side-by-side publication quotes without opening twenty tabs.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              variant="default"
              size="lg"
              onClick={() => openGameModal(1)}
            >
              Inspect #1 Rated Game (95/100)
            </Button>
            <Button variant="outline" size="lg" onClick={searchModal.onOpen}>
              Filter by Publication
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            variants={floatHoverVariants}
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={() => openGameModal(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") openGameModal(1);
            }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
          >
            <Image
              src="/images/games/elden-shadow.jpg"
              alt="Elden Ring: Shadow of the Erdtree"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            variants={floatHoverVariants}
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={() => openGameModal(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") openGameModal(2);
            }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
          >
            <Image
              src="/images/games/hades-underworld.jpg"
              alt="Hades II"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
