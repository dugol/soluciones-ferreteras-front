import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { useQuoteCart } from '../context/QuoteCartContext';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component displays a product preview in the catalog grid
 * - Shows first product image with 1:1 aspect ratio
 * - Displays product code and name
 * - Clickable to navigate to product detail page
 * - Hover effects: scale and shadow
 * - Lazy-loaded images
 */
function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0] || '/placeholder.png';
  const { addToCart, isInCart } = useQuoteCart();

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
      className="group block overflow-hidden rounded-md border border-gray-light bg-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
    >
      {/* Product Image - 1:1 aspect ratio */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-lighter">
        <img
          src={firstImage}
          alt={`${product.code} - ${product.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Code */}
        <p className="mb-1 text-xs font-mono uppercase text-gray-medium">
          {product.code}
        </p>

        {/* Product Name - truncated to 2 lines */}
        <h3 className="mb-3 line-clamp-2 text-base font-medium text-gray-dark">
          {product.name}
        </h3>

        {/* Add to Quote Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 ${
            inCart
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-brand-red text-white hover:bg-brand-red-dark'
          }`}
          aria-label={
            inCart
              ? `${product.name} en cotización - agregar más`
              : `Agregar ${product.name} a cotización`
          }
        >
          {inCart ? (
            <span className="flex items-center justify-center gap-1">
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
            </span>
          ) : (
            'Agregar a Cotización'
          )}
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
