/**
 * Product data model for Soluciones Ferreteras
 */
export interface Product {
  /** Unique identifier for the product */
  id: string;

  /** Product code (e.g., FT2011B) */
  code: string;

  /** Product name/description */
  name: string;

  /** Full product description */
  description: string;

  /** Array of image paths relative to public directory */
  images: string[];
}
