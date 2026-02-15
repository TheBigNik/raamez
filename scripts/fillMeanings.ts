import { PrismaClient } from "../src/generated/prisma";

const VAJEHYAB_TOKEN = process.env.VAJEHYAB_TOKEN;

if (!VAJEHYAB_TOKEN) {
  console.error("Set VAJEHYAB_TOKEN in your environment before running this script.");
  process.exit(1);
}

const prisma = new PrismaClient({ log: ["error"] });

type VajeResponse = {
  data?: {
    results?: { text?: string }[];
  };
};

async function fetchMeaning(word: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.vajehyab.com/v3/search?token=${VAJEHYAB_TOKEN}&q=${encodeURIComponent(
        word,
      )}&type=exact&filter=dehkhoda,moein,sareh`,
    );
    if (!res.ok) return null;
    const json = (await res.json()) as VajeResponse;
    const first = json?.data?.results?.[0]?.text;
    if (!first) return null;
    return first.split("\n")[0].slice(0, 240); // keep it short
  } catch {
    return null;
  }
}

async function main() {
  const words = await prisma.word_list.findMany({
    select: { id: true, word: true },
    orderBy: { id: "asc" },
  });

  let done = 0;
  for (const w of words) {
    const exists = await prisma.word_meaning.findFirst({
      where: { wordId: w.id },
    });
    if (exists) {
      done++;
      continue;
    }

    const meaning = await fetchMeaning(w.word);
    if (!meaning) {
      continue; // skip if no meaning found
    }

    await prisma.word_meaning.create({
      data: {
        wordId: w.id,
        meaning,
      },
    });

    done++;
    if (done % 200 === 0) {
      console.log(`Inserted meanings for ${done} words...`);
    }
  }

  console.log("Finished inserting meanings.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
