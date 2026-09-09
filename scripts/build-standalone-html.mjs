import { readFile, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const distRoot = join(projectRoot, "dist", "client");
const outputPath = join(projectRoot, "POS-Maju-Website.html");

const html = await readFile(join(distRoot, "index.html"), "utf8");
const scriptPath = html.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/)?.[1];
const stylePath = html.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/)?.[1];

if (!scriptPath || !stylePath) {
  throw new Error("Could not find the generated JavaScript or CSS bundle.");
}

let script = await readFile(join(distRoot, scriptPath.replace(/^\//, "")), "utf8");
const style = await readFile(join(distRoot, stylePath.replace(/^\//, "")), "utf8");
const assetMatches = [...script.matchAll(/\/assets\/[A-Za-z0-9._-]+/g)].map((match) => match[0]);
const assets = [...new Set(assetMatches)];

for (const assetUrl of assets) {
  const assetName = basename(assetUrl);
  const extension = assetName.split(".").pop().toLowerCase();
  const mime = extension === "jpg" || extension === "jpeg" ? "image/jpeg" : `image/${extension}`;
  const bytes = await readFile(join(distRoot, "assets", assetName));
  const dataUrl = `data:${mime};base64,${bytes.toString("base64")}`;
  script = script.split(assetUrl).join(dataUrl);
}

// A data URL keeps bundle contents out of the HTML parser. This is safer than
// inserting minified JavaScript directly because a string containing a closing
// script tag would otherwise end the element early.
const scriptDataUrl = `data:text/javascript;base64,${Buffer.from(script, "utf8").toString("base64")}`;

const standalone = html
  .replace(
    /<script[^>]+src="[^"]+"[^>]*><\/script>/,
    `<script type="module" src="${scriptDataUrl}"></script>`,
  )
  .replace(/<link[^>]+href="[^"]+\.css"[^>]*>/, `<style>${style}</style>`);

await writeFile(outputPath, standalone, "utf8");
console.log(`Standalone HTML created: ${outputPath}`);
