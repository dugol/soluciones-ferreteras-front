import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  QuoteCartItem,
  QuoteCartState,
  QuoteCartAction,
} from '../types/quoteCart';

const STORAGE_KEY = 'soluciones-ferreteras-quote-cart';

/**
 * Initial state for the quote cart
 */
const initialState: QuoteCartState = {
  items: [],
};

/**
 * Reducer for quote cart state management
 */
function quoteCartReducer(
  state: QuoteCartState,
  action: QuoteCartAction
): QuoteCartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.productCode === product.productCode
      );

      if (existingIndex >= 0) {
        // Update existing item quantity
        const newItems = [...state.items];
        const newQuantity = Math.min(
          99,
          newItems[existingIndex].quantity + quantity
        );
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newQuantity,
        };
        return { ...state, items: newItems };
      }

      // Add new item
      const newItem: QuoteCartItem = {
        ...product,
        quantity: Math.min(99, Math.max(1, quantity)),
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productCode !== action.payload.productCode
        ),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productCode, quantity } = action.payload;
      // Ensure quantity is within bounds
      const validQuantity = Math.min(99, Math.max(1, quantity));

      return {
        ...state,
        items: state.items.map((item) =>
          item.productCode === productCode
            ? { ...item, quantity: validQuantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    case 'HYDRATE': {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
}

/**
 * Context value interface
 */
interface QuoteCartContextValue {
  items: QuoteCartItem[];
  itemCount: number;
  addToCart: (
    product: Omit<QuoteCartItem, 'quantity'>,
    quantity?: number
  ) => void;
  removeFromCart: (productCode: string) => void;
  updateQuantity: (productCode: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productCode: string) => boolean;
  getItemQuantity: (productCode: string) => number;
}

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);

/**
 * Provider component for quote cart context
 */
export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteCartReducer, initialState);

  // Rehydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as QuoteCartItem[];
        // Validate the data structure
        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(
            (item) =>
              typeof item.productCode === 'string' &&
              typeof item.productName === 'string' &&
              typeof item.quantity === 'number' &&
              typeof item.imageUrl === 'string'
          );
          dispatch({ type: 'HYDRATE', payload: validItems });
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Persist cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state.items]);

  // Memoized callbacks to prevent unnecessary re-renders
  const addToCart = useCallback(
    (product: Omit<QuoteCartItem, 'quantity'>, quantity = 1) => {
      dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    },
    []
  );

  const removeFromCart = useCallback((productCode: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productCode } });
  }, []);

  const updateQuantity = useCallback(
    (productCode: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productCode, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback(
    (productCode: string) => {
      return state.items.some((item) => item.productCode === productCode);
    },
    [state.items]
  );

  const getItemQuantity = useCallback(
    (productCode: string) => {
      const item = state.items.find((i) => i.productCode === productCode);
      return item?.quantity ?? 0;
    },
    [state.items]
  );

  // Memoized context value
  const value = useMemo<QuoteCartContextValue>(
    () => ({
      items: state.items,
      itemCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    }),
    [
      state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    ]
  );

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
    </QuoteCartContext.Provider>
  );
}

/**
 * Custom hook to use the quote cart context
 * @throws Error if used outside of QuoteCartProvider
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useQuoteCart(): QuoteCartContextValue {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error('useQuoteCart must be used within a QuoteCartProvider');
  }
  return context;
}
