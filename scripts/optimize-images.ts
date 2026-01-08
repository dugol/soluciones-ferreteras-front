import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const QUALITY = 85; // WebP quality (0-100)

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    const files = await fs.readdir(IMAGES_DIR);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to optimize\n`);

    for (const file of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      const outputPath = path.join(
        IMAGES_DIR,
        file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      );

      try {
        const stats = await fs.stat(inputPath);
        const originalSize = stats.size;

        await sharp(inputPath)
          .webp({ quality: QUALITY })
          .toFile(outputPath);

        const newStats = await fs.stat(outputPath);
        const newSize = newStats.size;
        const savings = ((originalSize - newSize) / originalSize) * 100;

        console.log(
          `✓ ${file} → ${path.basename(outputPath)} (${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB, -${savings.toFixed(1)}%)`
        );
      } catch (error) {
        console.error(`✗ Failed to optimize ${file}:`, error);
      }
    }

    console.log('\n✅ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

optimizeImages();
