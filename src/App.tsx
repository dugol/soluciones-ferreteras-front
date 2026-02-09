import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { QuoteCartProvider } from './context/QuoteCartContext';
import { PriceProvider } from './context/PriceContext';

// Lazy-loaded route components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Precios = lazy(() => import('./pages/Precios'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-chrome-50">
    <div className="text-center">
      <div className="relative mx-auto h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-chrome-200 border-t-crimson-500" />
      </div>
      <p className="mt-6 text-sm font-medium uppercase tracking-widest text-chrome-400">
        Cargando...
      </p>
    </div>
  </div>
);

function App() {
  return (
    <PriceProvider>
      <QuoteCartProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/griferia" element={<Catalog />} />
                <Route path="/griferia/:productCode" element={<ProductDetail />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/precios" element={<Precios />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </QuoteCartProvider>
    </PriceProvider>
  );
}

export default App;
