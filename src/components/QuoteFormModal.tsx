import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuoteCart } from '../context/QuoteCartContext';
import { usePrices } from '../context/PriceContext';
import type { QuoteClientData, QuoteData } from '../types/quote';
import { calculateLineItem, generateQuotePDF } from '../utils/pdfQuoteGenerator';
import { canShareFiles, downloadPDF, sharePDF } from '../utils/quoteSharing';

interface QuoteFormModalProps {
  onClose: () => void;
}

function QuoteFormModal({ onClose }: QuoteFormModalProps) {
  const { items } = useQuoteCart();
  const { getPrice } = usePrices();
  const modalRef = useRef<HTMLDivElement>(null);

  const [clientData, setClientData] = useState<QuoteClientData>({});
  const [emailError, setEmailError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [shareSupported] = useState(() => canShareFiles());

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleFieldChange = useCallback(
    (field: keyof QuoteClientData, value: string) => {
      setClientData((prev) => ({ ...prev, [field]: value || undefined }));
      if (field === 'email') {
        setEmailError('');
      }
    },
    []
  );

  const validateEmail = useCallback((): boolean => {
    const email = clientData.email;
    if (!email) return true;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) setEmailError('Formato de email inválido');
    return valid;
  }, [clientData.email]);

  const buildQuoteData = useCallback((): QuoteData => {
    const lineItems = items.map((item) => {
      const price = getPrice(item.productCode);
      const calc = calculateLineItem(item.productCode, item.productName, item.quantity, price);
      return {
        productCode: calc.productCode,
        productName: calc.productName,
        quantity: calc.quantity,
        unitPriceWithTax: calc.unitPriceWithTax,
        unitPriceBase: calc.unitPriceBase,
        unitPriceTax: calc.unitPriceTax,
        lineTotalWithTax: calc.lineTotalWithTax,
      };
    });

    const pricedItems = lineItems.filter((i) => i.unitPriceWithTax > 0);
    const totalWithTax = pricedItems.reduce((sum, i) => sum + i.lineTotalWithTax, 0);
    const subtotalBase = pricedItems.reduce((sum, i) => sum + i.unitPriceBase * i.quantity, 0);
    const totalTax = totalWithTax - subtotalBase;

    return {
      client: clientData,
      items: lineItems,
      date: new Date(),
      subtotalBase,
      totalTax,
      totalWithTax,
    };
  }, [items, getPrice, clientData]);

  const handleDownload = useCallback(async () => {
    if (!validateEmail()) return;
    setGenerating(true);
    try {
      const quoteData = buildQuoteData();
      const blob = await generateQuotePDF(quoteData);
      downloadPDF(blob);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGenerating(false);
    }
  }, [validateEmail, buildQuoteData]);

  const handleShare = useCallback(async () => {
    if (!validateEmail()) return;
    setGenerating(true);
    try {
      const quoteData = buildQuoteData();
      const blob = await generateQuotePDF(quoteData);
      await sharePDF(blob);
    } catch (error) {
      console.error('Error sharing PDF:', error);
    } finally {
      setGenerating(false);
    }
  }, [validateEmail, buildQuoteData]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex h-screen w-screen items-center justify-center"
      style={{ height: '100dvh' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Modal Panel - Full screen on mobile, centered modal on desktop */}
      <div
        ref={modalRef}
        className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl md:h-auto md:max-h-[85vh] md:max-w-lg md:rounded-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-light px-4 py-4 md:px-6">
          <h2 id="quote-modal-title" className="text-lg font-bold text-gray-dark">
            Generar Cotización PDF
          </h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-md text-gray-medium transition-colors hover:bg-gray-lighter hover:text-gray-dark focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
            aria-label="Cerrar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
          {/* Client Form */}
          <p className="mb-3 text-sm text-gray-medium">
            Datos del cliente (opcionales) — se incluirán en el PDF.
          </p>

          <div className="space-y-3">
            <FormField
              label="Nombre completo"
              value={clientData.name ?? ''}
              onChange={(v) => handleFieldChange('name', v)}
            />
            <FormField
              label="Empresa"
              value={clientData.company ?? ''}
              onChange={(v) => handleFieldChange('company', v)}
            />
            <FormField
              label="NIT"
              value={clientData.nit ?? ''}
              onChange={(v) => handleFieldChange('nit', v)}
            />
            <FormField
              label="Dirección"
              value={clientData.address ?? ''}
              onChange={(v) => handleFieldChange('address', v)}
            />
            <FormField
              label="Teléfono"
              type="tel"
              value={clientData.phone ?? ''}
              onChange={(v) => handleFieldChange('phone', v)}
            />
            <FormField
              label="Email"
              type="email"
              value={clientData.email ?? ''}
              onChange={(v) => handleFieldChange('email', v)}
              error={emailError}
            />
          </div>

          {/* Cart Summary */}
          <div className="mt-6 border-t border-gray-light pt-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-dark">
              Productos en la cotización ({items.length})
            </h3>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.productCode} className="flex justify-between text-sm text-gray-medium">
                  <span className="truncate pr-2">{item.productName}</span>
                  <span className="flex-shrink-0 font-medium">x{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-light px-4 py-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={handleDownload}
              disabled={generating}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-brand-red px-4 py-3 font-medium text-white transition-colors hover:bg-brand-red-dark focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 disabled:opacity-60"
            >
              {generating ? (
                <LoadingSpinner />
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {generating ? 'Generando...' : 'Descargar PDF'}
            </button>

            {shareSupported && (
              <button
                onClick={handleShare}
                disabled={generating}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-brand-red px-4 py-3 font-medium text-brand-red transition-colors hover:bg-brand-red hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 disabled:opacity-60"
              >
                {generating ? (
                  <LoadingSpinner />
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                )}
                {generating ? 'Generando...' : 'Compartir'}
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-2 w-full rounded-md px-4 py-2 text-sm text-gray-medium transition-colors hover:text-gray-dark focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
}

function FormField({ label, value, onChange, type = 'text', error }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-dark">
        {label}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-1 ${
            error ? 'border-red-400' : 'border-gray-light'
          }`}
        />
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

export default QuoteFormModal;
