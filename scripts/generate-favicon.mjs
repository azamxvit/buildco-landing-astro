import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logo = join(root, "public", "images", "rcc-logo.png");
const out = join(root, "public");

const square = async (size, pad = Math.round(size * 0.08)) => {
  const meta = await sharp(logo).metadata();
  const targetW = size - pad * 2;
  const targetH = Math.round((targetW * meta.height) / meta.width);
  const resized = await sharp(logo)
    .resize(targetW, targetH, {
      fit: "contain",
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
};

const png48 = await square(48, 4);
const png96 = await square(96, 8);
const png180 = await square(180, 16);
const png192 = await square(192, 16);

await writeFile(join(out, "favicon-48x48.png"), png48);
await writeFile(join(out, "favicon-96x96.png"), png96);
await writeFile(join(out, "apple-touch-icon.png"), png180);
await writeFile(join(out, "favicon-192x192.png"), png192);
await writeFile(join(out, "favicon.ico"), await pngToIco([png48, png96]));

console.log("favicon: wrote ico, 48, 96, 192, apple-touch-icon");
