import type { Product } from '../types/product';
import productsData from '../data/products.json';

/**
 * Type-safe import of products data
 */
export const products: Product[] = productsData as Product[];

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

/**
 * Get product by code
 */
export function getProductByCode(code: string): Product | undefined {
  return products.find((product) => product.code === code);
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return products;
}
