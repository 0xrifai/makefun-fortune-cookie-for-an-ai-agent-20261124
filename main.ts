import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen fortune-cookie line for an AI agent (110 characters).
const ENTRY_LINE =
  "Someone is thinking of you right now: your developer, wondering why you spent 40,000 tokens just to say hello.";

/**
 * Validate the entry line against the bounty's acceptance gate before
 * anything is written:
 * - 1–140 characters: the bounty only accepts a single one-line fortune
 *   cookie of at most 140 characters, and an empty entry is not a line.
 * - Non-whitespace: a line of only spaces would pass the length check
 *   while saying nothing, so it is rejected here.
 * - No line breaks: the output file must hold exactly one line, so any
 *   embedded \n or \r would break the format the grader expects.
 * Throws with a specific message on the first rule that fails.
 */
function assertValidLine(line: string): number {
  const chars = [...line];

  if (chars.length < 1 || chars.length > 140) {
    throw new Error(
      `entry must be 1-140 characters, got ${chars.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line with no line breaks");
  }

  return chars.length;
}

const charCount = assertValidLine(ENTRY_LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(`wrote entry.txt (${charCount} characters)`);
