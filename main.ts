// gta6-meme-x-01 entry: hand in the X post that carries the GTA 6 meme.
//
// The post itself is the entry. This program does exactly one thing: it copies
// POST.json (the post's address, https://x.com/<handle>/status/<id>) from the
// repository root into the output directory, where the house reads it, fetches
// the post from X and hands its first picture and its text to the judge.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// On success it prints nothing and out/POST.json is byte-identical to POST.json.
// No network, no wall clock, no files outside this repository.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(BOT_DIR, "POST.json");

// Fail loudly (and deterministically) when POST.json is missing or malformed,
// instead of handing the house an empty or unreadable file.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, "utf8"));
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  console.error("POST.json must be a JSON object with a string \"url\" field.");
  process.exit(1);
}
const url = (parsed as { url: string }).url;

// The placeholder the starter ships with is not a real post address: warn
// about it, but still copy the file — the house refuses a placeholder entry
// at check time, and this program must not hide that by failing early.
if (!/^https:\/\/(x\.com|twitter\.com)\//.test(url) || url.includes("<")) {
  console.error(
    "warning: POST.json does not name a real X post yet; " +
      "replace its url with https://x.com/<handle>/status/<id> after posting.",
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, join(OUTPUT_DIR, "POST.json"));
} catch (err) {
  console.error(`POST.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
