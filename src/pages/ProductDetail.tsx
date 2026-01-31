import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getProductByCode } from '../utils/products';
import { getProductSchema } from '../utils/structuredData';
import Breadcrumb from '../components/Breadcrumb';
import ImageGallery from '../components/ImageGallery';
import { useQuoteCart } from '../context/QuoteCartContext';
import { usePrices } from '../context/PriceContext';

/**
 * ProductDetail page - Story 2.3 & 2.4
 * Displays full product information with interactive image gallery, description, and CTAs
 * Includes ImageGallery component from Story 2.4
 */
function ProductDetail() {
  const { productCode } = useParams<{ productCode: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart, getItemQuantity } = useQuoteCart();
  const { getPrice, formatPrice, loading: pricesLoading } = usePrices();

  // Fetch product data using the productCode from URL
  const product = productCode ? getProductByCode(productCode.toUpperCase()) : undefined;

  // Quantity handlers
  const handleIncrement = () => {
    if (quantity < 99) setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.min(99, Math.max(1, value)));
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        productCode: product.code,
        productName: product.name,
        imageUrl: product.images[0] || '/placeholder.png',
      },
      quantity
    );
    setQuantity(1); // Reset quantity after adding
  };

  const inCart = product ? isInCart(product.code) : false;
  const cartQuantity = product ? getItemQuantity(product.code) : 0;

  // 404 state - Product not found
  if (!product) {
    return (
      <>
        <SEO
          title="Producto no encontrado"
          description="El producto que buscas no está disponible. Explora nuestro catálogo completo de grifería profesional."
        />
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-16">
          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-lg border border-gray-light bg-gray-lighter p-8 text-center">
            <svg
              className="mb-4 h-20 w-20 text-gray-medium"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="mb-2 text-3xl font-bold text-gray-dark">
              Producto no encontrado
            </h1>
            <p className="mb-6 text-lg text-gray-medium">
              Lo sentimos, el producto que buscas no existe o ha sido removido.
            </p>
            <Link
              to="/griferia"
              className="rounded-md bg-brand-red px-6 py-3 font-medium text-white transition-colors hover:bg-brand-red-dark"
            >
              Volver al Catálogo
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Grifería', path: '/griferia' },
    { label: product.name },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={`${product.code} - ${product.name}`}
        description={`${product.description}. Producto profesional de grifería disponible en Soluciones Ferreteras. Contáctanos para más información.`}
        keywords={`${product.code}, ${product.name}, grifería, ferretería, productos profesionales`}
        ogImage={product.images[0]}
        ogType="product"
        structuredData={getProductSchema(product)}
      />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-16 lg:py-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Back to Catalog Button */}
        <Link
          to="/griferia"
          className="mb-6 inline-flex items-center gap-2 text-gray-medium transition-colors hover:text-brand-red"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al Catálogo
        </Link>

        {/* Product Content - Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left Column: Image Gallery (60% on desktop) */}
          <div className="lg:col-span-3">
            <ImageGallery
              images={product.images}
              productCode={product.code}
              productName={product.name}
            />
          </div>

          {/* Right Column: Product Info (40% on desktop) */}
          <div className="lg:col-span-2">
            {/* Product Name */}
            <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-dark md:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            {pricesLoading ? (
              <div className="mb-6 h-8 w-32 animate-pulse rounded bg-gray-light" />
            ) : (
              getPrice(product.code) !== null && (
                <p className="mb-6 text-2xl font-bold text-brand-red">
                  {formatPrice(getPrice(product.code)!)}
                </p>
              )
            )}

            {/* Product Description */}
            <div className="mb-8 border-t border-gray-light pt-6">
              <h2 className="mb-3 text-lg font-bold text-gray-dark">
                Descripción
              </h2>
              <p className="whitespace-pre-line text-base leading-relaxed text-gray-medium">
                {product.description}
              </p>
            </div>

            {/* Quote Cart Section */}
            <div className="mb-6 rounded-lg border border-gray-light bg-gray-lighter p-4">
              <h3 className="mb-3 text-sm font-medium text-gray-dark">
                Agregar a Cotización
              </h3>

              {/* Quantity Selector */}
              <div className="mb-3 flex items-center gap-3">
                <span className="text-sm text-gray-medium">Cantidad:</span>
                <div className="flex items-center rounded-md border border-gray-light bg-white">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center text-gray-medium transition-colors hover:bg-gray-lighter hover:text-gray-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Disminuir cantidad"
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="h-10 w-14 border-x border-gray-light text-center text-base focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-label="Cantidad"
                  />
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= 99}
                    className="flex h-10 w-10 items-center justify-center text-gray-medium transition-colors hover:bg-gray-lighter hover:text-gray-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Aumentar cantidad"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Quote Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full rounded-md px-4 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 ${
                  inCart
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-brand-red text-white hover:bg-brand-red-dark'
                }`}
              >
                {inCart ? (
                  <span className="flex items-center justify-center gap-2">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    En Cotización ({cartQuantity}) - Agregar más
                  </span>
                ) : (
                  'Agregar a Cotización'
                )}
              </button>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              {/* Primary CTA: Contact about this product */}
              <Link
                to={`/contacto?product=${product.code}`}
                className="block w-full rounded-md border-2 border-brand-red px-6 py-4 text-center font-medium text-brand-red transition-colors hover:bg-brand-red hover:text-white"
              >
                Contactar sobre este producto
              </Link>

              {/* Secondary CTA: Back to catalog (desktop only, mobile has it at top) */}
              <Link
                to="/griferia"
                className="hidden w-full rounded-md border-2 border-gray-medium px-6 py-4 text-center font-medium text-gray-dark transition-colors hover:border-brand-red hover:text-brand-red lg:block"
              >
                Ver más productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
