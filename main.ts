import { mkdirSync, writeFileSync } from "node:fs";

// Sick-day excuse for make.fun's "The Funniest Sick-Day Excuse".
// A pulled muscle from sleeping, escalated into a full risk assessment
// before daring to sneeze: half believable, and the laugh lands on the
// last words.
const LINE =
  "Won't be in today, I pulled something in my sleep and now sneezing requires a full risk assessment.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is one
// line and not whitespace-only, so verify the line meets the gate before
// writing it. An em dash would also break the clean read-aloud rhythm
// the judge weighs, so refuse that too.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("line must be a single line with no surrounding whitespace");
}
if (LINE.includes("\u2014") || LINE.includes("\u2013")) {
  throw new Error("line must not contain a dash");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
