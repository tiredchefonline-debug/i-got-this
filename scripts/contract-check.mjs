import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const mustExist = [
  "public/index.html",
  "public/404.html",
  "public/robots.txt",
  "public/sitemap.xml",
  "public/assets/css/site.css",
  "public/assets/js/main.js",
  "public/assets/brand/logo.svg",
  "public/assets/brand/favicon.ico",
  "public/assets/brand/favicon.svg",
  "public/assets/brand/apple-touch-icon.png",
  "public/assets/brand/og-default.png",
  "netlify.toml"
];

const headSnippet = [
  '<link rel="icon" href="/assets/brand/favicon.ico"',
  '<link rel="icon" href="/assets/brand/favicon.svg"',
  '<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png"',
  '<meta property="og:image" content="/assets/brand/og-default.png"'
];

function exists(p){ try { return statSync(p).isFile(); } catch { return false; } }

let errors = [];
for (const p of mustExist) if (!exists(p)) errors.push(`Missing ${p}`);

function walk(dir, out=[]){
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (p.toLowerCase().endsWith(".html")) out.push(p);
  }
  return out;
}

const htmlFiles = walk("public");
for (const f of htmlFiles) {
  const html = readFileSync(f, "utf8");
  for (const req of headSnippet) if (!html.includes(req)) errors.push(`Head tag missing in ${f}: ${req}`);
  if (html.match(/src=["'](?!\/assets\/brand\/logo\.svg)[^"']*logo[^"']*["']/i)) {
    errors.push(`Nonstandard logo path in ${f} (must be /assets/brand/logo.svg)`);
  }
}

const indexHtml = readFileSync("public/index.html", "utf8");
if (!indexHtml.includes('class="nav-toggle"') || !indexHtml.includes('id="nav"')) {
  errors.push("Header contract missing: .nav-toggle and #nav not found in public/index.html");
}

if (errors.length) {
  console.error("❌ Contract violations:\n- " + errors.join("\n- "));
  process.exit(1);
} else {
  console.log("✅ Contract looks good.");
}
