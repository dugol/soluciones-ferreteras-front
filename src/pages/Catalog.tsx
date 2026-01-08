import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import type { Product } from '../types/product';
import productsData from '../data/products.json';

/**
 * Catalog page displays all products in a responsive grid layout
 */
function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state (in real app this would be an API call)
    const loadProducts = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProducts(productsData as Product[]);
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Loading state with skeleton loaders
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-16">
        <h1 className="mb-8 text-4xl font-bold text-gray-dark md:text-5xl">
          Nuestros Productos
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-md border border-gray-light bg-white"
            >
              <div className="aspect-square bg-gray-lighter"></div>
              <div className="p-4">
                <div className="mb-2 h-3 w-20 rounded bg-gray-lighter"></div>
                <div className="h-4 w-full rounded bg-gray-lighter"></div>
                <div className="mt-1 h-4 w-3/4 rounded bg-gray-lighter"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-16">
        <h1 className="mb-8 text-4xl font-bold text-gray-dark md:text-5xl">
          Nuestros Productos
        </h1>
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-gray-light bg-gray-lighter p-8 text-center">
          <svg
            className="mb-4 h-16 w-16 text-gray-medium"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h2 className="mb-2 text-xl font-bold text-gray-dark">
            No hay productos disponibles
          </h2>
          <p className="mb-6 text-gray-medium">
            Por favor, vuelve más tarde para ver nuestro catálogo.
          </p>
          <a
            href="/"
            className="rounded-md bg-brand-red px-6 py-3 font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  // Main catalog view with products grid
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-16">
      <SEO
        title="Catálogo de Grifería - Todos Nuestros Productos"
        description="Explora nuestro catálogo completo de productos de grifería profesional. Monocontroles lavamanos, llaves de agua fría, acabados negro mate y satín. Productos de alta calidad para baños y cocinas."
        keywords="catálogo grifería, monocontrol lavamanos, llaves baño, grifos cocina, negro mate, satín, productos ferreteros"
      />
      <h1 className="mb-8 text-4xl font-bold text-gray-dark md:text-5xl">
        Nuestros Productos
      </h1>

      {/* Responsive Product Grid
          - 1 column on mobile (<768px)
          - 2 columns on tablet (768px-1024px)
          - 3 columns on desktop (1024px-1280px)
          - 4 columns on wide screens (>1280px)
      */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
