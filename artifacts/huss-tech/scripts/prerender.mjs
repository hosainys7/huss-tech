import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_PAGES, render } from "../dist/server/entry-server.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist", "public");
const template = await readFile(path.join(outputRoot, "index.html"), "utf8");

function replaceHead(html, head) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${head.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${head.description}" />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${head.canonicalUrl}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${head.canonicalUrl}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${head.title}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${head.description}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${head.title}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${head.description}" />`,
    );
}

for (const page of PUBLIC_PAGES) {
  const { appHtml, head } = render(page.path);
  const html = replaceHead(template, head).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );
  const routeDirectory =
    page.path === "/" ? outputRoot : path.join(outputRoot, page.path.slice(1));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, "index.html"), html);
}

await rm(path.join(projectRoot, "dist", "server"), { recursive: true, force: true });
console.log(`Prerendered ${PUBLIC_PAGES.length} public routes.`);