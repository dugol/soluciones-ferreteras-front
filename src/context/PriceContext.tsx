import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PriceContextValue {
  prices: Map<string, number>;
  loading: boolean;
  getPrice: (productCode: string) => number | null;
  formatPrice: (price: number) => string;
  refreshPrices: () => Promise<void>;
}

const PriceContext = createContext<PriceContextValue | null>(null);

export function PriceProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'precios'));
      const priceMap = new Map<string, number>();
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (typeof data.precio === 'number') {
          priceMap.set(doc.id, data.precio);
        }
      });
      setPrices(priceMap);
    } catch (error) {
      console.error('Failed to load prices from Firestore:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const getPrice = useCallback(
    (productCode: string): number | null => {
      return prices.get(productCode) ?? null;
    },
    [prices]
  );

  const formatPrice = useCallback((price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const value = useMemo<PriceContextValue>(
    () => ({
      prices,
      loading,
      getPrice,
      formatPrice,
      refreshPrices: fetchPrices,
    }),
    [prices, loading, getPrice, formatPrice, fetchPrices]
  );

  return (
    <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePrices(): PriceContextValue {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('usePrices must be used within a PriceProvider');
  }
  return context;
}
