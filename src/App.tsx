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
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-red border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
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
