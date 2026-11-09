"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameFilter } from "@/hooks/use-game-filter";
import { getScoreTier } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ExternalLink,
  MessageSquarePlus,
  MinusCircle,
  Sparkles,
} from "lucide-react";

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
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden border border-border bg-background text-foreground rounded-2xl">
        <ScrollArea className="max-h-[88vh]">
          <div className="p-6 md:p-8 space-y-8">
            {/* Header & Cover Split */}
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
              <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
                <Image
                  src={activeGame.coverImage}
                  alt={activeGame.title}
                  fill
                  sizes="(max-width: 768px) 95vw, 260px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{activeGame.genre}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeGame.developer}</span>
                  <span aria-hidden="true">·</span>
                  <span>Released {activeGame.releaseDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeGame.platformLabels.join(", ")}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">
                  {activeGame.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeGame.consensusSummary}
                </p>

                {/* Aggregated Score Strip */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      MetaPulse Critic Score
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span
                        className={cn(
                          "font-mono text-2xl font-bold tabular-nums",
                          activeGame.metaScore >= 90
                            ? "text-emerald-600 dark:text-emerald-400"
                            : activeGame.metaScore >= 75
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-rose-600 dark:text-rose-400"
                        )}
                      >
                        {activeGame.metaScore}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / 100 ({tierInfo.label})
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">
                      Player Consensus
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                        {activeGame.userScore}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono tabular-nums">
                        / 100 ({activeGame.totalUserRatings.toLocaleString()}{" "}
                        ratings)
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">
                      Internet Outlets Indexed
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold tabular-nums">
                        {activeGame.totalCriticReviews}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        verified publications
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pros & Cons Consensus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>Why Critics Praise It</span>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {activeGame.pros.map((pro, idx) => (
                    <li key={idx} className="leading-relaxed">
                      • {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <MinusCircle className="size-4 shrink-0" />
                  <span>Common Criticisms</span>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {activeGame.cons.map((con, idx) => (
                    <li key={idx} className="leading-relaxed">
                      • {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* All Internet Reviews List */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Aggregated Reviews Across the Internet (
                  {activeGame.outletReviews.length})
                </h3>
                <span className="text-xs text-muted-foreground">
                  Normalized to 100-point scale
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeGame.outletReviews.map((review) => (
                  <article
                    key={review.id}
                    className="flex flex-col justify-between p-4 rounded-xl border border-border bg-card/50 space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-semibold text-sm">
                            {review.outlet}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {review.reviewer} · {review.date}
                          </div>
                        </div>
                        <div className="text-right font-mono tabular-nums">
                          <div
                            className={cn(
                              "text-lg font-bold",
                              review.score >= 90
                                ? "text-emerald-600 dark:text-emerald-400"
                                : review.score >= 75
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-rose-600 dark:text-rose-400"
                            )}
                          >
                            {review.score}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            ({review.originalScoreDisplay})
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/90 leading-relaxed">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60">
                      <span>
                        Verdict:{" "}
                        {review.sentiment === "acclaim"
                          ? "Universal Acclaim"
                          : review.sentiment === "positive"
                          ? "Positive"
                          : "Mixed"}
                      </span>
                      <a
                        href={review.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                      >
                        <span>Read Source</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Submit Player Review Form */}
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="size-4 text-primary" />
                <h3 className="text-base font-semibold">
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
                    className="block text-xs text-muted-foreground mb-1"
                  >
                    Your Name or Handle
                  </label>
                  <input
                    id="reviewer-name-input"
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Alex Vance"
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reviewer-outlet-input"
                    className="block text-xs text-muted-foreground mb-1"
                  >
                    Platform / Publication
                  </label>
                  <input
                    id="reviewer-outlet-input"
                    type="text"
                    value={outletName}
                    onChange={(e) => setOutletName(e.target.value)}
                    placeholder="e.g. Steam Verified / Personal Blog"
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reviewer-score-input"
                    className="block text-xs text-muted-foreground mb-1"
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
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="reviewer-quote-input"
                    className="block text-xs text-muted-foreground mb-1"
                  >
                    Review Summary
                  </label>
                  <textarea
                    id="reviewer-quote-input"
                    rows={2}
                    value={reviewQuote}
                    onChange={(e) => setReviewQuote(e.target.value)}
                    placeholder="Share your verdict on gameplay, performance, and story..."
                    className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {formError && (
                  <p className="md:col-span-3 text-xs text-rose-500">
                    {formError}
                  </p>
                )}

                {submittedNotice && (
                  <p className="md:col-span-3 text-xs text-emerald-500 flex items-center gap-1.5">
                    <Sparkles className="size-3.5" />
                    <span>
                      Your review has been added and the consensus score updated!
                    </span>
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
