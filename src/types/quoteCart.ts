/**
 * Quote Cart Types for Soluciones Ferreteras
 * Story 4.2: Carrito de Cotización
 */

/**
 * Represents an item in the quote cart
 */
export interface QuoteCartItem {
  /** Product code (unique identifier) */
  productCode: string;
  /** Product display name */
  productName: string;
  /** Quantity requested (1-99) */
  quantity: number;
  /** URL to product image */
  imageUrl: string;
}

/**
 * Quote cart state structure
 */
export interface QuoteCartState {
  /** Array of items in the cart */
  items: QuoteCartItem[];
}

/**
 * Actions for the quote cart reducer
 */
export type QuoteCartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Omit<QuoteCartItem, 'quantity'>; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productCode: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productCode: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: QuoteCartItem[] };
