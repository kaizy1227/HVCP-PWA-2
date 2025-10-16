const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

const SOURCE_DIR = "./public/images/full/catdrink/Drink_GV_An_webp";
const TARGET_DIR = "./public/images/thumbnails/catdrink/Drink_GV_An_webp";

async function generateThumbnails() {
  await fs.ensureDir(TARGET_DIR);

  const files = await fs.readdir(SOURCE_DIR);
  const imageFiles = files.filter((f) =>
    [".jpg", ".jpeg", ".png", ".webp"].some((ext) => f.endsWith(ext))
  );

  console.log(`🔹 Found ${imageFiles.length} images`);

  for (const file of imageFiles) {
    const inputPath = path.join(SOURCE_DIR, file);
    const outputPath = path.join(TARGET_DIR, file.replace(".webp", ".webp"));

    try {
      await sharp(inputPath)
        .resize(400)
        .webp({ quality: 70 })
        .toFile(outputPath);
      console.log(`✅ Created thumbnail: ${outputPath}`);
    } catch (e) {
      console.warn(`❌ Error processing ${file}:`, e.message);
    }
  }

  console.log("🎉 All thumbnails generated successfully!");
}

generateThumbnails();
