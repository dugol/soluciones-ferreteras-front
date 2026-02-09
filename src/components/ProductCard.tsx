import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { useQuoteCart } from '../context/QuoteCartContext';
import { usePrices } from '../context/PriceContext';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0] || '/placeholder.png';
  const { addToCart, isInCart } = useQuoteCart();
  const { getPrice, formatPrice, loading: pricesLoading } = usePrices();
  const price = getPrice(product.code);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      {
        productCode: product.code,
        productName: product.name,
        imageUrl: firstImage,
      },
      1
    );
  };

  const inCart = isInCart(product.code);

  return (
    <Link
      to={`/griferia/${product.code.toLowerCase()}`}
      className="group relative block overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1"
    >
      {/* Chrome Border Effect */}
      <div className="absolute inset-0 rounded-lg border border-chrome-200 transition-all duration-300 group-hover:border-chrome-300 group-hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]" />

      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-chrome-50 to-white">
        <img
          src={firstImage}
          alt={`${product.code} - ${product.name}`}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-chrome-900/0 opacity-0 transition-all duration-300 group-hover:bg-chrome-900/5 group-hover:opacity-100">
          <span className="translate-y-4 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wider text-chrome-900 shadow-lg transition-all duration-300 group-hover:translate-y-0">
            Ver Detalles
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="relative border-t border-chrome-100 p-5">
        {/* Product Name */}
        <h3 className="mb-3 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-chrome-800 transition-colors group-hover:text-chrome-900">
          {product.name}
        </h3>

        {/* Price */}
        {pricesLoading ? (
          <div className="mb-4 h-7 w-28 animate-pulse rounded bg-chrome-100" />
        ) : (
          price !== null && (
            <p className="mb-4 text-xl font-semibold tracking-tight text-crimson-500">
              {formatPrice(price)}
            </p>
          )
        )}

        {/* Add to Quote Button */}
        <button
          onClick={handleAddToCart}
          className={`relative w-full overflow-hidden rounded py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            inCart
              ? 'bg-chrome-900 text-white focus:ring-chrome-900'
              : 'bg-crimson-500 text-white hover:bg-crimson-600 focus:ring-crimson-500'
          }`}
          aria-label={
            inCart
              ? `${product.name} ya está en tu lista de cotización`
              : `Añadir ${product.name} a tu lista de cotización`
          }
        >
          {/* Button Shimmer Effect */}
          {!inCart && (
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          )}

          <span className="relative flex items-center justify-center gap-2">
            {inCart ? (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                En Cotización
              </>
            ) : (
              <>
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
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Cotizar
              </>
            )}
          </span>
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
