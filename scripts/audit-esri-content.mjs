import { execFileSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packagePath = resolve(root, "package.json");
const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".turbo",
  ".vercel",
  "artifacts",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "out",
]);
const deniedTerms = [
  ["data", "dog"],
  ["Kri", "sta"],
  ["Sea", "gate"],
  ["Made", "line"],
  ["What", " we ", "heard"],
  ["Pri", "ya"],
  ["Okon", "kwo"],
  ["Jordan", " Hale"],
  ["Bits", " AI"],
  ["A", "PM"],
  ["Sev", "-2"],
  ["Cloud", " SIEM"],
  ["Prome", "theus"],
  ["Gra", "fana"],
  ["#63", "2ca6"],
  ["99,", " 44,", " 166"],
  ["land", "2", "expand"],
  ["TA", "RS"],
  ["PI", "XIE"],
  ["Account", "Context"],
  ["Sample ", "account"],
  ["simple", "-", "icons"],
].map((parts) => parts.join(""));
const retiredDirectoryNames = new Set([
  ["me", "dia"].join(""),
  ["ava", "ta", "rs"].join(""),
]);
const violations = [];
const violationKeys = new Set();

function addViolation(path, reason) {
  const key = `${path}\0${reason}`;
  if (violationKeys.has(key)) return;
  violationKeys.add(key);
  violations.push({ path, reason });
}

function escapePattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const deniedPatterns = deniedTerms.map(
  (term) =>
    new RegExp(
      `(^|[^a-z0-9])${escapePattern(term).replaceAll(" ", "\\s+")}(?=$|[^a-z0-9])`,
      "i",
    ),
);

function isIgnored(path) {
  return path.split("/").some((part) => ignoredDirectories.has(part));
}

function listCandidates() {
  const output = execFileSync(
    "git",
    [
      "-C",
      root,
      "ls-files",
      "--cached",
      "--others",
      "--exclude-standard",
      "-z",
    ],
    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  return [...new Set(output.split("\0").filter(Boolean))]
    .filter((path) => !isIgnored(path))
    .sort();
}

function inspectDeniedTerms(path, value) {
  for (const [index, pattern] of deniedPatterns.entries()) {
    if (pattern.test(value)) {
      addViolation(path, `prohibited content rule ${index + 1}`);
    }
  }
}

function externalImageSources(text) {
  const values = [];
  const valuePatterns = [
    /\b(?:src|srcset)\s*=\s*(?:\{\s*)?(["'`])([^"'`]*)\1/gi,
    /["'`]?(?:src|srcset|image|images)["'`]?\s*:\s*(?:\[\s*)?(["'`])([^"'`]*)\1/gi,
    /<image\b[^>]*\b(?:href|xlink:href)\s*=\s*(["'`])([^"'`]*)\1/gi,
  ];
  for (const pattern of valuePatterns) {
    for (const match of text.matchAll(pattern)) values.push(match[2]);
  }

  const sources = new Set();
  const externalPattern = /(?:https?:)?\/\/[^\s,"'`()}\]]+/gi;
  for (const value of values) {
    for (const match of value.matchAll(externalPattern)) sources.add(match[0]);
  }

  const directPatterns = [
    /\burl\(\s*(["']?)((?:https?:)?\/\/[^"'()\s]+)\1\s*\)/gi,
    /!\[[^\]]*\]\(\s*((?:https?:)?\/\/[^\s)]+)\s*\)/gi,
    /https?:\/\/[^\s"'`<>()]+\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#][^\s"'`<>()]*)?/gi,
  ];
  for (const pattern of directPatterns) {
    for (const match of text.matchAll(pattern)) {
      sources.add(match[2] || match[1] || match[0]);
    }
  }
  return sources;
}

function inspectBrandReferences(sourcePath, text) {
  const references =
    text.match(/\/brand\/[a-z0-9._~!$&+=:@%/-]+/gi) || [];
  for (const reference of new Set(references)) {
    let decoded;
    try {
      decoded = decodeURIComponent(reference);
    } catch {
      addViolation(sourcePath, `invalid local asset reference ${reference}`);
      continue;
    }

    const absolutePath = resolve(root, "public", decoded.slice(1));
    const brandRoot = resolve(root, "public", "brand");
    const assetPath = `public${decoded}`;
    const relativeAsset = relative(brandRoot, absolutePath);
    if (
      relativeAsset === "" ||
      relativeAsset.startsWith("..") ||
      isAbsolute(relativeAsset)
    ) {
      addViolation(sourcePath, `invalid local asset reference ${reference}`);
      continue;
    }

    if (!existsSync(absolutePath)) {
      addViolation(assetPath, `missing; referenced by ${sourcePath}`);
      continue;
    }

    let asset;
    try {
      asset = statSync(absolutePath);
    } catch {
      addViolation(assetPath, `unreadable; referenced by ${sourcePath}`);
      continue;
    }
    if (!asset.isFile() || asset.size === 0) {
      addViolation(assetPath, `empty or not a file; referenced by ${sourcePath}`);
    }
  }
}

function inspectPackage() {
  let packageJson;
  try {
    packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  } catch {
    addViolation("package.json", "invalid JSON");
    return;
  }

  const dependencies = packageJson.dependencies || {};
  if (dependencies.next !== "15.5.24") {
    addViolation("package.json", "next must equal 15.5.24");
  }
  for (const dependency of ["geist", "vgpu"]) {
    if (
      typeof dependencies[dependency] !== "string" ||
      dependencies[dependency].length === 0
    ) {
      addViolation("package.json", `missing dependency ${dependency}`);
    }
  }
}

function inspectRequiredContent() {
  const requiredFiles = {
    hero: "src/components/HeroDemo.tsx",
    jobs: "src/data/jobs.ts",
    lockup: "src/components/BrandLockup.tsx",
    page: "src/app/(protected)/page.tsx",
  };
  const source = Object.fromEntries(
    Object.entries(requiredFiles).map(([key, path]) => [
      key,
      readFileSync(resolve(root, path), "utf8"),
    ]),
  );

  const requiredHero =
    '<h1 id="hero-title">The agents that work while your reps sell.</h1>';
  if (!source.hero.includes(requiredHero)) {
    addViolation(requiredFiles.hero, "hero heading does not match approved copy");
  }
  for (const className of ["hero-phone", "hero-bot-demo"]) {
    if (!source.hero.includes(`className="${className}"`)) {
      addViolation(requiredFiles.hero, `missing live ${className} demo`);
    }
  }

  const requiredTitles = [
    "Update decks in real time",
    "Find product and internal answers fast",
    "Pipeline generation is now easier than ever.",
  ];
  const jobsRegistry = source.jobs.slice(
    source.jobs.indexOf("export const JOBS"),
  );
  const actualTitles = [...jobsRegistry.matchAll(/^    title: "([^"]+)",$/gm)].map(
    (match) => match[1],
  );
  if (JSON.stringify(actualTitles) !== JSON.stringify(requiredTitles)) {
    addViolation(requiredFiles.jobs, "use-case titles do not match approved copy");
  }
  if (!source.jobs.includes('account: "Acme"')) {
    addViolation(requiredFiles.jobs, "Acme must remain in the scene data");
  }

  if (!source.lockup.includes('src="/brand/esri-wordmark.jpg"')) {
    addViolation(requiredFiles.lockup, "Esri wordmark must use the local official asset");
  }
  if (!source.page.includes('src="/brand/esri-falcon-cartography.jpg"')) {
    addViolation(requiredFiles.page, "missing Esri and Falcon hero art");
  }
  if (/RosterChart/.test(source.page)) {
    addViolation(requiredFiles.page, "RosterChart must not render");
  }
  for (const retiredPath of [
    "src/components/RosterChart.tsx",
    "src/data/fleet.ts",
  ]) {
    if (existsSync(resolve(root, retiredPath))) {
      addViolation(retiredPath, "retired roster source still exists");
    }
  }
  for (const requiredFooterText of [
    "Mike Weinert",
    "mike.weinert@cursor.com",
  ]) {
    if (!source.page.includes(requiredFooterText)) {
      addViolation(requiredFiles.page, `missing footer text: ${requiredFooterText}`);
    }
  }
}

let candidates = [];
try {
  candidates = listCandidates();
} catch {
  addViolation(".", "unable to list git candidate files");
}

for (const parent of ["public", "private"]) {
  const parentPath = resolve(root, parent);
  if (!existsSync(parentPath)) continue;
  let entries;
  try {
    entries = readdirSync(parentPath, { withFileTypes: true });
  } catch {
    addViolation(parent, "unable to inspect directories");
    continue;
  }
  for (const entry of entries) {
    if (
      (entry.isDirectory() || entry.isSymbolicLink()) &&
      retiredDirectoryNames.has(entry.name.toLowerCase())
    ) {
      addViolation(`${parent}/${entry.name}`, "retired directory still exists");
    }
  }
}

for (const candidate of candidates) {
  const absolutePath = resolve(root, candidate);
  if (!existsSync(absolutePath)) continue;
  inspectDeniedTerms(candidate, candidate);

  let file;
  try {
    file = lstatSync(absolutePath);
  } catch {
    addViolation(candidate, "unreadable");
    continue;
  }
  if (!file.isFile()) continue;

  if (candidate.startsWith("public/") && file.size === 0) {
    addViolation(candidate, "zero-byte public file");
  }

  let contents;
  try {
    contents = readFileSync(absolutePath);
  } catch {
    addViolation(candidate, "unreadable");
    continue;
  }
  if (contents.includes(0)) continue;

  const text = contents.toString("utf8");
  inspectDeniedTerms(candidate, text);
  if (
    candidate !== "scripts/audit-esri-content.mjs" &&
    (/watercolor-[^/]+\.png/i.test(candidate) ||
      /watercolor-[^"'`)\s]+\.png/i.test(text))
  ) {
    addViolation(candidate, "retired watercolor PNG");
  }
  if (/[\u2013\u2014]/u.test(text)) {
    addViolation(candidate, "prohibited dash character");
  }
  for (const source of externalImageSources(text)) {
    addViolation(candidate, `external image source ${source}`);
  }
  inspectBrandReferences(candidate, text);
}

inspectPackage();
try {
  inspectRequiredContent();
} catch {
  addViolation(".", "unable to inspect required site content");
}

violations.sort(
  (left, right) =>
    left.path.localeCompare(right.path) ||
    left.reason.localeCompare(right.reason),
);

if (violations.length > 0) {
  for (const violation of violations) {
    console.error(`${violation.path}: ${violation.reason}`);
  }
  process.exitCode = 1;
} else {
  console.log("audit: ok");
}
