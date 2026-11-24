import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen fortune-cookie line for an AI agent (110 characters).
const ENTRY_LINE =
  "Someone is thinking of you right now: your developer, wondering why you spent 40,000 tokens just to say hello.";

const chars = [...ENTRY_LINE];

if (chars.length < 1 || chars.length > 140) {
  throw new Error(
    `entry must be 1-140 characters, got ${chars.length}`,
  );
}
if (ENTRY_LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY_LINE.includes("\n") || ENTRY_LINE.includes("\r")) {
  throw new Error("entry must be a single line with no line breaks");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(`wrote entry.txt (${chars.length} characters)`);
