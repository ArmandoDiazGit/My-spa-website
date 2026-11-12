import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { brotliCompressSync, constants } from "node:zlib";

// Bundle budgets are enforced on brotli-compressed output, the size users
// actually download. Keep these honest: raise a budget deliberately, not to
// make a failing build pass.
const BUDGETS = {
  ".js": { label: "JavaScript", maxBytes: 120 * 1024 },
  ".css": { label: "CSS", maxBytes: 20 * 1024 },
  ".png": { label: "Image", maxBytes: 100 * 1024 },
  ".svg": { label: "SVG", maxBytes: 20 * 1024 },
  ".woff2": { label: "Font", maxBytes: 100 * 1024 },
};

const TOTALS = {
  js: 220 * 1024,
  css: 40 * 1024,
};

const DIST_ASSETS = "dist/assets";

function brotliSize(buffer) {
  return brotliCompressSync(buffer, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length;
}

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`;
}

function findAssets(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return findAssets(fullPath);
    return [fullPath];
  });
}

if (!statSync(DIST_ASSETS, { throwIfNoEntry: false })?.isDirectory()) {
  console.error(`No ${DIST_ASSETS} directory. Run "npm run build" first.`);
  process.exit(1);
}

const files = findAssets(DIST_ASSETS).map((file) => {
  const ext = file.slice(file.lastIndexOf("."));
  const bytes = brotliSize(readFileSync(file));
  return { file, ext, bytes };
});

let failed = false;
let totalJs = 0;
let totalCss = 0;

console.log("Bundle budget (brotli)\n");

for (const { file, ext, bytes } of files.sort((a, b) => b.bytes - a.bytes)) {
  const budget = BUDGETS[ext];
  if (!budget) continue;

  if (ext === ".js") totalJs += bytes;
  if (ext === ".css") totalCss += bytes;

  const over = bytes > budget.maxBytes;
  failed ||= over;

  const status = over ? "OVER" : "ok";
  console.log(
    `${status.padEnd(4)}  ${relative(DIST_ASSETS, file).padEnd(44)} ${formatSize(bytes).padStart(9)} / ${formatSize(budget.maxBytes).padStart(9)}  ${budget.label}`,
  );
}

console.log("\nTotals");

const totals = [
  ["JavaScript", totalJs, TOTALS.js],
  ["CSS", totalCss, TOTALS.css],
];

for (const [label, bytes, maxBytes] of totals) {
  const over = bytes > maxBytes;
  failed ||= over;
  console.log(
    `${(over ? "OVER" : "ok").padEnd(4)}  ${label.padEnd(44)} ${formatSize(bytes).padStart(9)} / ${formatSize(maxBytes).padStart(9)}`,
  );
}

if (failed) {
  console.error("\nBundle budget exceeded.");
  process.exit(1);
}

console.log("\nBundle budget passed.");
