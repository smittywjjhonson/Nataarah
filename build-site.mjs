import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of [
  "index.html",
  "contact.html",
  "core-service.html",
  "enabler-service.html",
  "pricing.html",
  "render-infographic.html",
  "reports.html",
  "assets",
  "css",
  "js",
]) {
  await cp(path.join(root, entry), path.join(output, entry), {
    recursive: true,
  });
}

console.log(`Prepared static site in ${output}`);
