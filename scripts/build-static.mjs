import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const publicDir = resolve(root, "public");
const buildDir = resolve(root, "build");

if (!existsSync(publicDir)) {
  throw new Error("Expected a public directory for the static site build.");
}

rmSync(buildDir, { recursive: true, force: true });
mkdirSync(buildDir, { recursive: true });
cpSync(publicDir, buildDir, { recursive: true });

console.log("Copied public/ to build/ for static deployment.");
