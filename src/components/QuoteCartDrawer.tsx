import { useEffect, useRef, useCallback, useState } from 'react';
import { useQuoteCart } from '../context/QuoteCartContext';
import type { QuoteCartItem } from '../types/quoteCart';
import { openWhatsAppQuote } from '../utils/whatsapp';

interface QuoteCartDrawerProps {
  onClose: () => void;
}

/**
 * QuoteCartDrawer - Story 4.2
 * Displays cart contents with quantity controls
 * Responsive: drawer from right on desktop, full-screen modal on mobile
 */
function QuoteCartDrawer({ onClose }: QuoteCartDrawerProps) {
  const { items, itemCount, removeFromCart, updateQuantity, clearCart } =
    useQuoteCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [clearAfterSend, setClearAfterSend] = useState(false);

  // Handle WhatsApp quote submission
  const handleSendWhatsApp = useCallback(() => {
    const opened = openWhatsAppQuote(items);
    if (opened && clearAfterSend) {
      clearCart();
    }
  }, [items, clearAfterSend, clearCart]);

  // Focus trap and keyboard handling
  useEffect(() => {
    // Focus the close button when drawer opens
    closeButtonRef.current?.focus();

    // Handle escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Handle click outside drawer to close
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Quantity controls
  const handleIncrement = (productCode: string, currentQuantity: number) => {
    if (currentQuantity < 99) {
      updateQuantity(productCode, currentQuantity + 1);
    }
  };

  const handleDecrement = (productCode: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productCode, currentQuantity - 1);
    }
  };

  const handleQuantityChange = (productCode: string, value: string) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      updateQuantity(productCode, Math.min(99, Math.max(1, parsed)));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative flex h-full w-full flex-col bg-white shadow-xl md:max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-light px-4 py-4 md:px-6">
          <h2
            id="cart-title"
            className="text-lg font-bold text-gray-dark md:text-xl"
          >
            Tu Cotización
            {itemCount > 0 && (
              <span className="ml-2 text-base font-normal text-gray-medium">
                ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-md text-gray-medium transition-colors hover:bg-gray-lighter hover:text-gray-dark focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
            aria-label="Cerrar cotización"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
          {items.length === 0 ? (
            <EmptyCartState />
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.productCode}
                  item={item}
                  onRemove={removeFromCart}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="border-t border-gray-light px-4 py-4 md:px-6">
            {/* WhatsApp Send Button */}
            <button
              onClick={handleSendWhatsApp}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 font-medium text-white transition-colors hover:bg-[#1da851] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
              aria-label="Enviar cotización por WhatsApp"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar Cotización por WhatsApp
            </button>

            {/* Clear cart after send checkbox */}
            <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm text-gray-medium">
              <input
                type="checkbox"
                checked={clearAfterSend}
                onChange={(e) => setClearAfterSend(e.target.checked)}
                className="h-4 w-4 rounded border-gray-light text-brand-red focus:ring-brand-red"
              />
              Vaciar cotización después de enviar
            </label>

            {/* Secondary Actions */}
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 rounded-md border-2 border-gray-medium px-4 py-3 font-medium text-gray-dark transition-colors hover:border-brand-red hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
              >
                Vaciar
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-md bg-brand-red px-4 py-3 font-medium text-white transition-colors hover:bg-brand-red-dark focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Empty cart state component
 */
function EmptyCartState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-12 text-center">
      <svg
        className="mb-4 h-16 w-16 text-gray-light"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <p className="text-lg font-medium text-gray-dark">
        Tu cotización está vacía
      </p>
      <p className="mt-1 text-sm text-gray-medium">
        Agrega productos desde el catálogo
      </p>
    </div>
  );
}

/**
 * Individual cart item component
 */
interface CartItemProps {
  item: QuoteCartItem;
  onRemove: (productCode: string) => void;
  onIncrement: (productCode: string, currentQuantity: number) => void;
  onDecrement: (productCode: string, currentQuantity: number) => void;
  onQuantityChange: (productCode: string, value: string) => void;
}

function CartItem({
  item,
  onRemove,
  onIncrement,
  onDecrement,
  onQuantityChange,
}: CartItemProps) {
  return (
    <li className="flex gap-4 rounded-lg border border-gray-light bg-white p-3">
      {/* Product Image */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-lighter">
        <img
          src={item.imageUrl || '/placeholder.png'}
          alt={item.productName}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <p className="text-xs font-mono uppercase text-gray-medium">
              {item.productCode}
            </p>
            <h3 className="mt-0.5 line-clamp-2 text-sm font-medium text-gray-dark">
              {item.productName}
            </h3>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.productCode)}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded text-gray-medium transition-colors hover:bg-gray-lighter hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red"
            aria-label={`Eliminar ${item.productName} de la cotización`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-xs text-gray-medium">Cantidad:</span>
          <div className="flex items-center rounded-md border border-gray-light">
            <button
              onClick={() => onDecrement(item.productCode, item.quantity)}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center text-gray-medium transition-colors hover:bg-gray-lighter hover:text-gray-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Disminuir cantidad"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <input
              type="number"
              min="1"
              max="99"
              value={item.quantity}
              onChange={(e) =>
                onQuantityChange(item.productCode, e.target.value)
              }
              className="h-8 w-12 border-x border-gray-light text-center text-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              aria-label={`Cantidad de ${item.productName}`}
            />
            <button
              onClick={() => onIncrement(item.productCode, item.quantity)}
              disabled={item.quantity >= 99}
              className="flex h-8 w-8 items-center justify-center text-gray-medium transition-colors hover:bg-gray-lighter hover:text-gray-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Aumentar cantidad"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default QuoteCartDrawer;
