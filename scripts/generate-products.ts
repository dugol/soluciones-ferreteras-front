import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  images: string[];
}

/**
 * Parse DESCRIPCIONES.md file and extract product data
 */
function parseDescriptions(filePath: string): Map<string, string> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const products = new Map<string, string>();

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const [code, description] = trimmedLine.split('=');
    if (code && description) {
      products.set(code.trim(), description.trim());
    }
  }

  return products;
}

/**
 * Scan images directory and match images to product codes
 */
function matchProductImages(
  imagesDir: string,
  productCodes: string[]
): Map<string, string[]> {
  const productImages = new Map<string, string[]>();

  // Initialize empty arrays for each product code
  for (const code of productCodes) {
    productImages.set(code, []);
  }

  // Read all files in images directory
  if (!fs.existsSync(imagesDir)) {
    console.warn(`⚠️  Images directory not found: ${imagesDir}`);
    return productImages;
  }

  const files = fs.readdirSync(imagesDir);

  // First, collect all images
  const imagesByCodeAndNumber = new Map<string, Map<string, string[]>>();

  for (const file of files) {
    // Skip hidden files and directories
    if (file.startsWith('.')) continue;

    const stat = fs.statSync(path.join(imagesDir, file));
    if (stat.isDirectory()) continue;

    // Extract product code from filename
    // Pattern: FT2011B-1.jpg -> FT2011B
    const match = file.match(/^([A-Z0-9]+)-(\d+)\.(jpg|jpeg|png|webp)$/i);
    if (match) {
      const [, code, number] = match;
      if (productImages.has(code)) {
        if (!imagesByCodeAndNumber.has(code)) {
          imagesByCodeAndNumber.set(code, new Map());
        }
        const codeMap = imagesByCodeAndNumber.get(code)!;
        if (!codeMap.has(number)) {
          codeMap.set(number, []);
        }
        codeMap.get(number)!.push(file);
      }
    }
  }

  // Now prefer WebP images over JPG/PNG
  for (const [code, numberMap] of imagesByCodeAndNumber.entries()) {
    for (const [, files] of numberMap.entries()) {
      // Prefer webp, then jpg/jpeg, then png
      const webp = files.find((f) => f.endsWith('.webp'));
      const jpg = files.find((f) => /\.(jpg|jpeg)$/i.test(f));
      const png = files.find((f) => f.endsWith('.png'));

      const selectedFile = webp || jpg || png;
      if (selectedFile) {
        productImages.get(code)!.push(selectedFile);
      }
    }
  }

  // Sort images for each product by number
  for (const images of productImages.values()) {
    images.sort((a, b) => {
      const numA = parseInt(a.match(/-(\d+)\./)?.[1] || '0');
      const numB = parseInt(b.match(/-(\d+)\./)?.[1] || '0');
      return numA - numB;
    });
  }

  return productImages;
}

/**
 * Copy images from source to public directory
 */
function copyImages(
  sourceDir: string,
  targetDir: string,
  imageFiles: string[]
): void {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let copiedCount = 0;
  for (const file of imageFiles) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      copiedCount++;
    } else {
      console.warn(`⚠️  Image file not found: ${sourcePath}`);
    }
  }

  console.log(`✓ Copied ${copiedCount} images to ${targetDir}`);
}

/**
 * Main function to generate products.json
 */
function generateProducts(): void {
  console.log('🚀 Generating products data...\n');

  // Define paths (relative to project root)
  const projectRoot = path.resolve(__dirname, '..', '..');
  const descriptionsPath = path.join(projectRoot, 'docs', 'DESCRIPCIONES.md');
  const imagesSourceDir = path.join(projectRoot, 'docs', 'images');
  const imagesTargetDir = path.join(__dirname, '..', 'public', 'images');
  const outputDir = path.join(__dirname, '..', 'src', 'data');
  const outputPath = path.join(outputDir, 'products.json');

  console.log(`📄 Reading descriptions from: ${descriptionsPath}`);
  console.log(`🖼️  Scanning images from: ${imagesSourceDir}`);

  // Parse descriptions
  const productDescriptions = parseDescriptions(descriptionsPath);
  console.log(`✓ Found ${productDescriptions.size} products in DESCRIPCIONES.md\n`);

  // Match images to products
  const productCodes = Array.from(productDescriptions.keys());
  const productImages = matchProductImages(imagesSourceDir, productCodes);

  // Build product objects
  const products: Product[] = [];
  const warnings: string[] = [];

  for (const [code, description] of productDescriptions.entries()) {
    const images = productImages.get(code) || [];

    // Validate that product has at least one image
    if (images.length === 0) {
      warnings.push(`⚠️  Product ${code} has no images`);
    }

    // Convert image paths to paths relative to public directory
    const imagePaths = images.map((img) => `/images/${img}`);

    products.push({
      id: code.toLowerCase(),
      code: code,
      name: description,
      description: description,
      images: imagePaths,
    });

    console.log(
      `✓ ${code}: ${images.length} image${images.length !== 1 ? 's' : ''} matched`
    );
  }

  // Display warnings
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach((warning) => console.log(warning));
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write products.json
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`\n✓ Generated products.json at: ${outputPath}`);
  console.log(`✓ Total products: ${products.length}\n`);

  // Copy images to public directory
  const allImageFiles = Array.from(productImages.values()).flat();
  copyImages(imagesSourceDir, imagesTargetDir, allImageFiles);

  console.log('\n✅ Product generation complete!');
}

// Run the script
try {
  generateProducts();
  process.exit(0);
} catch (error) {
  console.error('❌ Error generating products:', error);
  process.exit(1);
}
