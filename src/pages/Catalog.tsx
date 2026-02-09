import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import type { Product } from '../types/product';
import productsData from '../data/products.json';

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProducts(productsData as Product[]);
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Loading state with skeleton loaders
  if (loading) {
    return (
      <div className="min-h-screen bg-chrome-50">
        {/* Header Skeleton */}
        <div className="border-b border-chrome-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
            <div className="h-12 w-64 animate-pulse rounded bg-chrome-100" />
            <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-chrome-100" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-lg border border-chrome-200 bg-white"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square bg-chrome-100" />
                <div className="border-t border-chrome-100 p-5">
                  <div className="mb-2 h-3 w-16 rounded bg-chrome-100" />
                  <div className="mb-3 h-4 w-full rounded bg-chrome-100" />
                  <div className="mb-4 h-6 w-24 rounded bg-chrome-100" />
                  <div className="h-10 w-full rounded bg-chrome-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-chrome-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-chrome-200 bg-white p-12 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-chrome-100">
              <svg
                className="h-10 w-10 text-chrome-400"
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
            </div>
            <h2 className="mb-3 font-display text-2xl text-chrome-900">
              NO HAY PRODUCTOS DISPONIBLES
            </h2>
            <p className="mb-8 max-w-sm text-sm text-chrome-500">
              Por favor, vuelve más tarde para ver nuestro catálogo de grifería profesional.
            </p>
            <a
              href="/"
              className="btn-primary inline-flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main catalog view
  return (
    <div className="min-h-screen bg-chrome-50">
      <SEO
        title="Catálogo de Grifería Profesional | Soluciones Ferreteras"
        description="Explora nuestro catálogo completo de productos de grifería profesional. Monocontroles lavamanos, llaves de agua fría, acabados negro mate y satín. Productos de alta calidad para baños y cocinas."
        keywords="catálogo grifería, monocontrol lavamanos, llaves baño, grifos cocina, negro mate, satín, productos ferreteros"
      />

      {/* Page Header */}
      <div className="border-b border-chrome-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-crimson-500">
                Catálogo Completo
              </span>
              <h1 className="font-display text-4xl tracking-tight text-chrome-900 md:text-5xl">
                NUESTRA GRIFERÍA
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-chrome-500">
                Descubre nuestra selección de grifería profesional de alta calidad.
                Productos diseñados para proyectos que exigen excelencia y durabilidad.
              </p>
            </div>

            {/* Product Count */}
            <div className="flex items-center gap-2 text-sm text-chrome-500">
              <span className="font-semibold text-chrome-900">{products.length}</span>
              <span>productos disponibles</span>
            </div>
          </div>

          {/* Quote Info Banner */}
          <div className="mt-8 flex items-start gap-4 rounded-lg border border-chrome-200 bg-gradient-to-r from-chrome-50 to-white p-4 md:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson-500/10">
              <svg className="h-5 w-5 text-crimson-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-chrome-800">
                Sistema de Cotización
              </p>
              <p className="mt-0.5 text-xs text-chrome-500">
                Agrega productos a tu lista y genera una cotización personalizada y envíasela a nuestro equipo de ventas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-chrome-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-6 rounded-lg bg-chrome-900 p-8 md:flex-row md:p-10">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl text-white md:text-3xl">
                ¿NECESITAS ASESORÍA?
              </h3>
              <p className="mt-2 text-sm text-chrome-400">
                Nuestro equipo de expertos está listo para ayudarte con tu proyecto.
              </p>
            </div>
            <a
              href="/contacto"
              className="inline-flex shrink-0 items-center gap-2 rounded bg-crimson-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-crimson-600"
            >
              Contactar Ahora
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
