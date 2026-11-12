"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameFilter } from "@/hooks/use-game-filter";
import { getOutletMonogram, getScoreTier } from "@/lib/games-data";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export function GameReviewModal() {
  const { games, activeGameId, closeGameModal, addPlayerReview } =
    useGameFilter();
  const activeGame = games.find((g) => g.id === activeGameId) || null;

  const [reviewerName, setReviewerName] = useState("");
  const [outletName, setOutletName] = useState("Player Review");
  const [reviewScore, setReviewScore] = useState("92");
  const [reviewQuote, setReviewQuote] = useState("");
  const [formError, setFormError] = useState("");
  const [submittedNotice, setSubmittedNotice] = useState(false);

  if (!activeGame) {
    return null;
  }

  const tierInfo = getScoreTier(activeGame.metaScore);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const numericScore = Number(reviewScore);
    if (!reviewerName.trim()) {
      setFormError("Please enter your name or handle.");
      return;
    }
    if (
      Number.isNaN(numericScore) ||
      numericScore < 1 ||
      numericScore > 100
    ) {
      setFormError("Please enter a score between 1 and 100.");
      return;
    }
    if (reviewQuote.trim().length < 10) {
      setFormError("Please write a review verdict of at least 10 characters.");
      return;
    }

    setFormError("");
    addPlayerReview(activeGame.id, {
      reviewer: reviewerName,
      outlet: outletName,
      score: numericScore,
      quote: reviewQuote,
    });
    setReviewerName("");
    setReviewQuote("");
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 3000);
  };

  return (
    <Dialog
      open={Boolean(activeGame)}
      onOpenChange={(open) => {
        if (!open) closeGameModal();
      }}
    >
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden border border-white/[0.1] bg-[#090a0f] text-zinc-100 rounded-lg">
        <ScrollArea className="max-h-[88vh]">
          <div className="p-6 md:p-8 space-y-8">
            {/* Full-Bleed Key Art Header Banner with Dark Scrim */}
            <div className="relative rounded-lg border border-white/[0.08] overflow-hidden min-h-[220px] flex flex-col justify-end p-5 sm:p-6">
              <Image
                src={activeGame.coverImage}
                alt={activeGame.title}
                fill
                sizes="(max-width: 768px) 95vw, 840px"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/80 to-[#090a0f]/25"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#090a0f]/90 via-[#090a0f]/55 to-transparent"
              />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300 tabular-nums">
                  <span className="px-1.5 py-0.5 rounded-sm border border-white/[0.12] bg-[#090a0f] text-white font-semibold">
                    REL-0{activeGame.id}
                  </span>
                  <span>{activeGame.genre}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeGame.developer}</span>
                  <span aria-hidden="true">·</span>
                  <span>Released {activeGame.releaseDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeGame.platformLabels.join(" / ")}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance text-white">
                  {activeGame.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                  {activeGame.consensusSummary}
                </p>

                {/* Aggregated Score Strip */}
                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/[0.12]">
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      CRITIC METASCORE
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold tabular-nums text-white">
                        {activeGame.metaScore}
                      </span>
                      <span className="text-xs font-mono text-zinc-300">
                        / 100 ({tierInfo.label})
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      PLAYER CONSENSUS
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold tabular-nums text-white">
                        {activeGame.userScore}
                      </span>
                      <span className="text-xs text-zinc-300 font-mono tabular-nums">
                        / 100 ({activeGame.totalUserRatings.toLocaleString()}{" "}
                        ratings)
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      OUTLETS INDEXED
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold tabular-nums text-white">
                        {activeGame.totalCriticReviews}
                      </span>
                      <span className="text-xs font-mono text-zinc-300">
                        publications
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 01 / Consensus Synthesis (Typographic Ledger without generic Checkmark Icons) */}
            <div className="space-y-3 pt-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-white font-semibold">01 /</span>
                <span>CRITICAL CONSENSUS SYNTHESIS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] rounded-lg overflow-hidden">
                <div className="bg-[#12151e] p-5 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white">
                    Consensus Strengths
                  </h3>
                  <ul className="divide-y divide-white/[0.06] text-xs sm:text-sm text-zinc-300">
                    {activeGame.pros.map((pro, idx) => (
                      <li
                        key={idx}
                        className="py-2 flex items-baseline gap-2.5 leading-relaxed"
                      >
                        <span className="font-mono text-xs text-zinc-500 shrink-0">
                          +
                        </span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#12151e] p-5 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Noted Caveats
                  </h3>
                  <ul className="divide-y divide-white/[0.06] text-xs sm:text-sm text-zinc-400">
                    {activeGame.cons.map((con, idx) => (
                      <li
                        key={idx}
                        className="py-2 flex items-baseline gap-2.5 leading-relaxed"
                      >
                        <span className="font-mono text-xs text-zinc-500 shrink-0">
                          —
                        </span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 02 / Aggregated Internet Reviews in Exposed 1px Seam Matrix */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-white font-semibold">02 /</span>
                  <span>
                    AGGREGATED PUBLICATION VERDICTS (
                    {activeGame.outletReviews.length})
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  0–100 NORMALIZED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] rounded-lg overflow-hidden">
                {activeGame.outletReviews.map((review) => {
                  const monogram = getOutletMonogram(review.outlet);
                  return (
                    <article
                      key={review.id}
                      className="flex flex-col justify-between p-5 bg-[#12151e] space-y-3.5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="inline-flex items-center justify-center size-7 rounded-sm border border-white/[0.1] bg-[#090a0f] font-mono text-xs font-bold text-zinc-200 shrink-0">
                              {monogram.code}
                            </span>
                            <div>
                              <div className="font-semibold text-sm text-white">
                                {review.outlet}
                              </div>
                              <div className="text-xs font-mono text-zinc-400">
                                {review.reviewer} · {review.date}
                              </div>
                            </div>
                          </div>
                          <div className="text-right font-mono tabular-nums">
                            <div className="text-lg font-bold text-white">
                              {review.score}
                              <span className="text-[11px] font-normal text-zinc-500">
                                /100
                              </span>
                            </div>
                            <div className="text-[11px] text-zinc-400">
                              ({review.originalScoreDisplay})
                            </div>
                          </div>
                        </div>

                        {/* Precision 0-100 Meter with 80-pt Acclaim Tick */}
                        <div className="relative h-1 w-full rounded-sm bg-white/[0.08] overflow-hidden">
                          <div
                            className="h-full bg-zinc-200"
                            style={{ width: `${review.score}%` }}
                          />
                          <span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 left-[80%] w-px bg-[#090a0f]"
                          />
                        </div>

                        <p className="font-serif italic text-sm text-zinc-200 leading-relaxed">
                          &ldquo;{review.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-2.5 flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-white/[0.06]">
                        <span>
                          {review.sentiment === "acclaim"
                            ? "UNIVERSAL ACCLAIM"
                            : review.sentiment === "positive"
                            ? "FAVORABLE"
                            : "MIXED"}
                        </span>
                        <a
                          href={review.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-zinc-200 hover:text-white hover:underline font-medium"
                        >
                          <span>Source</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* 03 / Submit Player Review Form */}
            <div className="pt-4 border-t border-white/[0.08] space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-white font-semibold">03 /</span>
                  <span>COMMUNITY VERDICT SUBMISSION</span>
                </div>
                <h3 className="text-base font-semibold text-white">
                  Contribute Your Review to the Index
                </h3>
              </div>

              <form
                onSubmit={handleSubmitReview}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <label
                    htmlFor="reviewer-name-input"
                    className="block text-xs font-mono text-zinc-400 mb-1"
                  >
                    Your Name or Handle
                  </label>
                  <input
                    id="reviewer-name-input"
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Alex Vance"
                    className="w-full h-9 px-3 rounded-md border border-white/[0.1] bg-[#12151e] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reviewer-outlet-input"
                    className="block text-xs font-mono text-zinc-400 mb-1"
                  >
                    Platform / Publication
                  </label>
                  <input
                    id="reviewer-outlet-input"
                    type="text"
                    value={outletName}
                    onChange={(e) => setOutletName(e.target.value)}
                    placeholder="e.g. Steam Verified / Personal Blog"
                    className="w-full h-9 px-3 rounded-md border border-white/[0.1] bg-[#12151e] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reviewer-score-input"
                    className="block text-xs font-mono text-zinc-400 mb-1"
                  >
                    Score (1–100)
                  </label>
                  <input
                    id="reviewer-score-input"
                    type="number"
                    min={1}
                    max={100}
                    value={reviewScore}
                    onChange={(e) => setReviewScore(e.target.value)}
                    className="w-full h-9 px-3 rounded-md border border-white/[0.1] bg-[#12151e] text-sm text-white font-mono tabular-nums focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="reviewer-quote-input"
                    className="block text-xs font-mono text-zinc-400 mb-1"
                  >
                    Review Summary
                  </label>
                  <textarea
                    id="reviewer-quote-input"
                    rows={2}
                    value={reviewQuote}
                    onChange={(e) => setReviewQuote(e.target.value)}
                    placeholder="Share your verdict on gameplay, performance, and story..."
                    className="w-full p-3 rounded-md border border-white/[0.1] bg-[#12151e] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                {formError && (
                  <p className="md:col-span-3 text-xs text-rose-400">
                    {formError}
                  </p>
                )}

                {submittedNotice && (
                  <p className="md:col-span-3 text-xs font-mono text-zinc-200">
                    ✓ Your review has been added and the consensus score
                    updated!
                  </p>
                )}

                <div className="md:col-span-3 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeGameModal}
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="default">
                    Publish Review
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
