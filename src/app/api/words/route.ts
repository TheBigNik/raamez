import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";


export const runtime = "nodejs"; // prisma requires Node runtime (not Edge)
export const dynamic = "force-dynamic"; // avoid static caching

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/db/big.txt");

    const fileContent = fs.readFileSync(filePath, "utf-8");

    const checkWord = fileContent.split("\n").map((word) => word.trim());

    // Limit payload size and filter at the DB layer to avoid 5MB response errors.
    const rows = await prisma.$queryRaw<
      { word: string; meaning: string }[]
    >`SELECT word, meaning FROM word_list WHERE length(word) = 5 LIMIT 8000`;

    const words = rows
      .map(({ word }) => word.trim())
      .filter((word) => word.length === 5);

    const meanings = rows.map(({ word, meaning }) => ({
      word: word.trim(),
      meaning: meaning.trim(),
    }));

    return NextResponse.json({
      words,
      meanings,
      checkWord,
    });
  } catch (error) {
    console.error("letters GET error", error);
    return NextResponse.json(
      { error: "can't fetch words" },
      { status: 500 },
    );
  }
}
