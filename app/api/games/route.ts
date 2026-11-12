import { GAMES_CATALOGUE } from "@/lib/games-data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    games: GAMES_CATALOGUE,
    timestamp: new Date().toISOString(),
  });
}
