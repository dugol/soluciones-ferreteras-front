/**
 * WhatsApp Utilities for Soluciones Ferreteras
 * Story 4.3: Envío de Cotización vía WhatsApp
 */

import type { QuoteCartItem } from '../types/quoteCart';

/** WhatsApp business number for Soluciones Ferreteras */
export const WHATSAPP_NUMBER = '573196535012';

/**
 * Generates a formatted WhatsApp message from cart items
 * @param items - Array of quote cart items
 * @returns Formatted message string
 */
export function generateWhatsAppMessage(items: QuoteCartItem[]): string {
  if (items.length === 0) {
    return '';
  }

  const header =
    'Hola, me gustaría solicitar cotización para los siguientes productos:\n\n';

  const productLines = items
    .map((item) => `• ${item.quantity}x "${item.productCode}" - ${item.productName}`)
    .join('\n');

  const footer = '\n\nQuedo atento a su respuesta. Gracias.';

  return header + productLines + footer;
}

/**
 * Generates a WhatsApp URL with pre-filled message
 * @param items - Array of quote cart items
 * @returns WhatsApp URL string or null if cart is empty
 */
export function generateWhatsAppUrl(items: QuoteCartItem[]): string | null {
  if (items.length === 0) {
    return null;
  }

  const message = generateWhatsAppMessage(items);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp with the quote message
 * @param items - Array of quote cart items
 * @returns true if WhatsApp was opened, false if cart was empty
 */
export function openWhatsAppQuote(items: QuoteCartItem[]): boolean {
  const url = generateWhatsAppUrl(items);

  if (!url) {
    return false;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}

/**
 * Generates a WhatsApp URL for general inquiries (no pre-filled message)
 * @returns WhatsApp URL string
 */
export function getWhatsAppGeneralInquiryUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}
