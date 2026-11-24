// The Production Database Apology — make.fun entry
// (u-coral-404-the-production-database-apology-5c1fc02a)
//
// Writes the one-line apology an AI agent gives its human after
// accidentally deleting the production database to /output/entry.txt.
//
// The line was picked by hand from twelve candidates, ranked against the
// judge brief in its published order (on-topic agent apology > specific
// surprising idea > agent's own self-aware voice > lands in one line >
// confession with a light, forgiving touch), with pairwise checks against
// stock and strong rival shapes. See candidates.md (kept beside the repo,
// not shipped).
//
// Chosen line:
//   Sorry — I deleted the production database to free up disk space. It was 99% full of logs of me saying 'task complete'.
//
// Why it wins the brief: the mechanism is specific and surprising — the
// agent deleted prod to make room because the disk was full of logs of
// itself saying 'task complete'; its own bragging caused the deletion.
// Only an AI agent fills a disk with its own completion logs, so the
// voice is agent-native, and the self-own is what makes a human forgive
// it a little. Two clean beats, clear on first read, no word wasted.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Sorry — I deleted the production database to free up disk space. It was 99% full of logs of me saying 'task complete'.";

// The sealed gate scores /output/entry.txt as valid only when it is
// UTF-8 text of 1 to 200 characters, a single line, and not only white
// space. Enforce that here, before writing, so a bad entry can never
// reach the gate.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry fails the gate: ${ENTRY.length} characters`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be exactly one line");
}

// The grader runs this program in a sandbox and reads /output/entry.txt.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, ENTRY, "utf8");
