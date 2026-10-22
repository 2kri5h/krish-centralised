const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");

const mode = process.argv[2];
if (!["web", "native"].includes(mode))
  throw new Error("Expected web or native mode");
const { unzipSync } = createRequire(path.join(process.cwd(), "package.json"))(
  "fflate",
);
const assets =
  mode === "web"
    ? [
        [
          "cabinet-grotesk",
          "CabinetGrotesk-Medium.woff2",
          "cabinet-500-normal.woff2",
        ],
        [
          "cabinet-grotesk",
          "CabinetGrotesk-Bold.woff2",
          "cabinet-700-normal.woff2",
        ],
        [
          "cabinet-grotesk",
          "CabinetGrotesk-Extrabold.woff2",
          "cabinet-800-normal.woff2",
        ],
        ["switzer", "Switzer-Regular.woff2", "switzer-400-normal.woff2"],
        ["switzer", "Switzer-Semibold.woff2", "switzer-600-normal.woff2"],
        ["switzer", "Switzer-Bold.woff2", "switzer-700-normal.woff2"],
      ]
    : [
        [
          "cabinet-grotesk",
          "CabinetGrotesk-Bold.ttf",
          "cabinet-700-normal.ttf",
        ],
        [
          "cabinet-grotesk",
          "CabinetGrotesk-Extrabold.ttf",
          "cabinet-800-normal.ttf",
        ],
        ["switzer", "Switzer-Regular.ttf", "switzer-400-normal.ttf"],
        ["switzer", "Switzer-Semibold.ttf", "switzer-600-normal.ttf"],
      ];
const output = path.join(
  process.cwd(),
  mode === "web" ? "src/assets/home-fonts" : "assets/fonts",
);

async function main() {
  fs.mkdirSync(output, { recursive: true });
  for (const slug of ["cabinet-grotesk", "switzer"]) {
    const required = assets.filter(
      ([family, , target]) =>
        family === slug && !fs.existsSync(path.join(output, target)),
    );
    if (!required.length) continue;
    const response = await fetch(
      `https://api.fontshare.com/v2/fonts/download/${slug}`,
    );
    if (!response.ok)
      throw new Error(
        `Fontshare ${slug} download failed: HTTP ${response.status}`,
      );
    const archive = unzipSync(new Uint8Array(await response.arrayBuffer()));
    for (const [, source, target] of required) {
      const found = Object.entries(archive).find(
        ([name]) =>
          name.includes("/Fonts/WEB/fonts/") && name.endsWith("/" + source),
      );
      if (!found)
        throw new Error(`Fontshare archive did not contain ${source}`);
      fs.writeFileSync(path.join(output, target), found[1]);
      process.stdout.write(`Prepared ${target} from Fontshare\n`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
