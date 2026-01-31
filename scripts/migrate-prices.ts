import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse precios.csv and return a Map of productCode -> price (integer COP)
 */
function parsePricesCSV(filePath: string): Map<string, number> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const prices = new Map<string, number>();

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [code, priceStr] = line.split(',');
    if (code && priceStr) {
      // Remove dots (thousands separator) and parse as integer
      const price = parseInt(priceStr.trim().replace(/\./g, ''), 10);
      if (!isNaN(price)) {
        prices.set(code.trim(), price);
      } else {
        console.warn(`  Warning: Could not parse price for ${code}: "${priceStr}"`);
      }
    }
  }

  return prices;
}

/**
 * Upload prices to Firestore
 */
async function migratePrices(): Promise<void> {
  console.log('Starting price migration to Firestore...\n');

  // Check for required environment variables
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID',
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      console.error(`Error: Missing environment variable ${varName}`);
      console.error('Set Firebase env vars before running this script.');
      console.error('Example: source .env && npm run migrate:prices');
      process.exit(1);
    }
  }

  // Initialize Firebase
  const app = initializeApp({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  });

  const db = getFirestore(app);

  // Parse CSV
  const projectRoot = path.resolve(__dirname, '..', '..');
  const csvPath = path.join(projectRoot, 'docs', 'precios.csv');

  console.log(`Reading prices from: ${csvPath}`);
  const prices = parsePricesCSV(csvPath);
  console.log(`Found ${prices.size} prices in CSV\n`);

  // Upload to Firestore
  let uploaded = 0;
  let errors = 0;

  for (const [code, price] of prices.entries()) {
    try {
      await setDoc(doc(db, 'precios', code), { precio: price });
      console.log(`  ${code}: $${price.toLocaleString('es-CO')} -> OK`);
      uploaded++;
    } catch (error) {
      console.error(`  ${code}: FAILED -`, error);
      errors++;
    }
  }

  console.log(`\nMigration complete: ${uploaded} uploaded, ${errors} errors`);
}

migratePrices()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
