import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const projectDirectory = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = join(projectDirectory, "dist");
const siteUrlValue = loadEnv(
  "production",
  projectDirectory,
  "VITE_SITE_URL",
).VITE_SITE_URL?.trim();

function publicOrigin(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("VITE_SITE_URL must be an absolute public HTTPS origin.");
  }
  if (
    parsed.protocol !== "https:" ||
    parsed.username ||
    parsed.password ||
    parsed.port ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash ||
    !parsed.hostname.includes(".") ||
    parsed.hostname.includes(":") ||
    /^\d{1,3}(?:\.\d{1,3}){3}$/.test(parsed.hostname) ||
    /(?:^|\.)(?:localhost|local|test|example|invalid|internal)$/.test(
      parsed.hostname,
    )
  ) {
    throw new Error(
      "VITE_SITE_URL must be a public HTTPS origin without credentials, ports, paths, query parameters or fragments.",
    );
  }
  return `${parsed.origin}/`;
}

function escapeAttribute(value) {
  return value.replace(/[&<>"']/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[character];
  });
}

const siteUrl = siteUrlValue ? publicOrigin(siteUrlValue) : undefined;
const indexPath = join(outputDirectory, "index.html");
let html = await readFile(indexPath, "utf8");
html = html.replace(
  /\s*<!-- deployment-metadata:start -->[\s\S]*?<!-- deployment-metadata:end -->\s*/g,
  "\n",
);

if (!/<\/head>/i.test(html)) {
  throw new Error("Built index.html is missing its closing head tag.");
}

let robots = "User-agent: *\nAllow: /\n";
if (siteUrl) {
  const escapedUrl = escapeAttribute(siteUrl);
  const socialImage = escapeAttribute(`${siteUrl}social-card.png`);
  const alt = "LukoDevelops portfolio: Ideas into interfaces. And beyond.";
  const metadata = `
    <!-- deployment-metadata:start -->
    <link rel="canonical" href="${escapedUrl}" />
    <meta property="og:url" content="${escapedUrl}" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:secure_url" content="${socialImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${alt}" />
    <meta name="twitter:image" content="${socialImage}" />
    <meta name="twitter:image:alt" content="${alt}" />
    <!-- deployment-metadata:end -->
  </head>`;
  html = html.replace(/\s*<\/head>/i, metadata);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${escapedUrl}</loc></url>
</urlset>
`;
  await writeFile(join(outputDirectory, "sitemap.xml"), sitemap, "utf8");
  robots += `\nSitemap: ${siteUrl}sitemap.xml\n`;
  console.log(`Production metadata prepared for ${siteUrl}`);
} else {
  await rm(join(outputDirectory, "sitemap.xml"), { force: true });
  console.log(
    "VITE_SITE_URL is unset: URL-specific metadata and sitemap omitted for this local build.",
  );
}

await writeFile(indexPath, html, "utf8");
await writeFile(join(outputDirectory, "robots.txt"), robots, "utf8");
