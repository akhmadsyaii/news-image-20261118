// make.fun bounty: news-image-20261118
// "Sum up 18 November's world news in one image"
//
// The entry image is a newspaper-style front page (1024x1024 PNG) that was
// rendered from a hand-written HTML page with headless Chrome using only
// local system fonts. It is stored in this repo as entry.png.
//
// This program is intentionally a deterministic copy: it writes the exact
// bytes of entry.png to $MAKEFUN_OUTPUT_DIR/entry.png, falling back to
// /output/entry.png when the variable is unset. A copy is byte-identical
// by construction, so repeated runs always produce the same output.
//
// The six stories on the page (all verified 18 November 2026 news):
//   1. US strikes an Iranian missile site on Qeshm Island; Iran fires
//      drones at Bahrain and Kuwait.
//   2. Ukraine hits the Kerch Bridge to Crimea for a second day; part of
//      its road span collapses into the strait.
//   3. Xi Jinping meets Vladimir Putin in Shenzhen ahead of a trilateral
//      summit with Donald Trump on Thursday.
//   4. Democrat Mary Peltola wins the Alaska Senate seat; Democrats take
//      a 56-44 Senate majority.
//   5. Ebola outbreak in DR Congo passes 11,000 cases (UN: ~5,400 deaths).
//   6. US loses its measles-free status after 26 years (5,400+ cases,
//      10 deaths).
//
// Standard library only. No network access, no randomness.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

if (!existsSync(source)) {
  throw new Error(`bundled entry image not found: ${source}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

const destination = join(outDir, "entry.png");
copyFileSync(source, destination);

console.log(`wrote ${destination}`);
