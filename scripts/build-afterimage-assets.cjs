const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");

async function build() {
  const root = path.join(__dirname, "..", "public", "brand");
  await sharp(path.join(root, "afterimage-icon.svg"))
    .resize(180, 180)
    .png()
    .toFile(path.join(root, "afterimage-apple.png"));
  const wordmark = await sharp(path.join(root, "afterimage-wordmark.svg"))
    .resize(1080)
    .png()
    .toBuffer();
  const sculpture = await sharp(path.join(root, "afterimage-sculpture.webp"))
    .resize({ height: 560 })
    .png()
    .toBuffer();
  const copy = Buffer.from(
    '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><g font-family="Arial,sans-serif" fill="#f1f0e9"><text x="60" y="405" font-size="42">Independent mind.</text><text x="60" y="459" font-size="42">Useful digital things.</text><text x="60" y="570" fill="#dfff00" font-size="18">YAER.DEV / TORONTO</text></g></svg>',
  );
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: "#101113" },
  })
    .composite([
      { input: wordmark, left: 60, top: 65 },
      { input: sculpture, left: 650, top: 30 },
      { input: copy },
    ])
    .png()
    .toFile(path.join(root, "afterimage-social.png"));
  const stat = await fs.stat(path.join(root, "afterimage-sculpture.webp"));
  console.log(
    `Afterimage assets ready. Hero: ${(stat.size / 1024).toFixed(0)} KB.`,
  );
}
build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
