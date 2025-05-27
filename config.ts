export const uiSourceDir = "ui";
export const uiEntrypoints = [
	"index.html",
	"index.ts",
	"index.css",
	"people.ts",
	"people.html",
];
export const uiOutDir = "ui-dist";
export const importMapFile = "./deno.json";

export const port = Number(Deno.env.get("PORT")) || 8080;
export const hostname = "0.0.0.0";

// based on cli arg (--watch-ui) decide to transpile or serve prod (dist files)
import { watchUI } from "jsr:@invisement/husk@^0.4.62/transpile-ui";
const isDev = Deno.args.includes("--watch-ui");
export const uiDir = isDev
	? await watchUI(uiSourceDir, uiEntrypoints, importMapFile)
	: uiOutDir;
console.log("UI OUt Directory is", uiDir);
