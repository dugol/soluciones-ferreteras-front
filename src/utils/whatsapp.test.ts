/**
 * Tests for WhatsApp utilities
 * Story 4.3: Envío de Cotización vía WhatsApp
 *
 * To run: Install Vitest and run `npm test`
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  WHATSAPP_NUMBER,
  generateWhatsAppMessage,
  generateWhatsAppUrl,
  openWhatsAppQuote,
  getWhatsAppGeneralInquiryUrl,
} from './whatsapp';
import type { QuoteCartItem } from '../types/quoteCart';

describe('whatsapp utilities', () => {
  const mockItems: QuoteCartItem[] = [
    {
      productCode: 'LE-002',
      productName: 'Llave de Empotrar Doble',
      quantity: 2,
      imageUrl: '/images/le-002.jpg',
    },
    {
      productCode: 'LE-004',
      productName: 'Llave de Empotrar Individual',
      quantity: 1,
      imageUrl: '/images/le-004.jpg',
    },
    {
      productCode: 'LE-006',
      productName: 'Mezclador de Cocina',
      quantity: 3,
      imageUrl: '/images/le-006.jpg',
    },
  ];

  describe('WHATSAPP_NUMBER', () => {
    it('should be the correct business number', () => {
      expect(WHATSAPP_NUMBER).toBe('573196535012');
    });
  });

  describe('generateWhatsAppMessage', () => {
    it('should return empty string for empty cart', () => {
      const message = generateWhatsAppMessage([]);
      expect(message).toBe('');
    });

    it('should generate correctly formatted message', () => {
      const message = generateWhatsAppMessage(mockItems);

      expect(message).toContain(
        'Hola, me gustaría solicitar cotización para los siguientes productos:'
      );
      expect(message).toContain('• 2x "LE-002" - Llave de Empotrar Doble');
      expect(message).toContain('• 1x "LE-004" - Llave de Empotrar Individual');
      expect(message).toContain('• 3x "LE-006" - Mezclador de Cocina');
      expect(message).toContain('Quedo atento a su respuesta. Gracias.');
    });

    it('should handle single item', () => {
      const message = generateWhatsAppMessage([mockItems[0]]);

      expect(message).toContain('• 2x "LE-002" - Llave de Empotrar Doble');
      expect(message).not.toContain('LE-004');
    });

    it('should handle special characters in product names', () => {
      const itemWithSpecialChars: QuoteCartItem = {
        productCode: 'TEST-001',
        productName: 'Producto con "comillas" y acentos: áéíóú',
        quantity: 1,
        imageUrl: '/test.jpg',
      };

      const message = generateWhatsAppMessage([itemWithSpecialChars]);

      expect(message).toContain(
        '• 1x "TEST-001" - Producto con "comillas" y acentos: áéíóú'
      );
    });
  });

  describe('generateWhatsAppUrl', () => {
    it('should return null for empty cart', () => {
      const url = generateWhatsAppUrl([]);
      expect(url).toBeNull();
    });

    it('should generate correct WhatsApp URL format', () => {
      const url = generateWhatsAppUrl(mockItems);

      expect(url).not.toBeNull();
      expect(url).toContain(`https://wa.me/${WHATSAPP_NUMBER}?text=`);
    });

    it('should URL encode the message', () => {
      const url = generateWhatsAppUrl(mockItems);

      expect(url).not.toBeNull();
      // Check that the URL is properly encoded (no raw newlines or special chars)
      expect(url).not.toContain('\n');
      expect(url).toContain('%0A'); // URL-encoded newline
    });

    it('should properly encode special characters', () => {
      const itemWithSpecialChars: QuoteCartItem = {
        productCode: 'TEST-001',
        productName: 'Test & Product <with> "quotes"',
        quantity: 1,
        imageUrl: '/test.jpg',
      };

      const url = generateWhatsAppUrl([itemWithSpecialChars]);

      expect(url).not.toBeNull();
      expect(url).toContain('%26'); // URL-encoded &
      expect(url).toContain('%22'); // URL-encoded "
    });
  });

  describe('openWhatsAppQuote', () => {
    beforeEach(() => {
      vi.stubGlobal('window', {
        open: vi.fn(),
      });
    });

    it('should return false for empty cart', () => {
      const result = openWhatsAppQuote([]);
      expect(result).toBe(false);
      expect(window.open).not.toHaveBeenCalled();
    });

    it('should open WhatsApp URL and return true for non-empty cart', () => {
      const result = openWhatsAppQuote(mockItems);

      expect(result).toBe(true);
      expect(window.open).toHaveBeenCalledTimes(1);
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining(`https://wa.me/${WHATSAPP_NUMBER}`),
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('getWhatsAppGeneralInquiryUrl', () => {
    it('should return correct URL without message', () => {
      const url = getWhatsAppGeneralInquiryUrl();
      expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
    });
  });
});
