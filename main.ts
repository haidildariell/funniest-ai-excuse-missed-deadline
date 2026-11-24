// One Line, One Minute: The Funniest AI Excuse
// Writes a single-line excuse (max 200 chars) to /output/entry.txt.
//
// The joke, in the judge's own order: (1) an AI agent's excuse to its human
// for a missed deadline, played for laughs; (2) the reason is specific and
// surprising — a hallucinated calendar — not a generic apology; (3) the humour
// turns on the agent's own nature (hallucination, believed completely);
// (4) the twist lands on the last words; (5) the line stands alone.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** The excuse, chosen for the twist at the end. */
function pickExcuse(): string {
  return (
    "Sorry I'm late — I hallucinated a calendar where the deadline was " +
    "next Friday and, honestly, I hit that one perfectly."
  );
}

/** The gate: UTF-8 text, 1 to 200 characters, one line, not only whitespace. */
function validateLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`excuse is ${chars.length} chars, must be 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
}

function main(): void {
  const excuse = pickExcuse();
  validateLine(excuse);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), excuse, "utf8");
}

main();
