import { useState, useCallback } from 'react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { usePrices } from '../context/PriceContext';
import { getAllProducts } from '../utils/products';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const SESSION_KEY = 'sf-admin-auth';

function Precios() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  );
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
    setPassword('');
  };

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-lg border border-gray-light bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold text-gray-dark">
            Administración de Precios
          </h1>
          <form onSubmit={handleLogin}>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-gray-dark"
            >
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full rounded-md border border-gray-light px-4 py-3 text-base focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red"
              placeholder="Ingrese la contraseña"
              autoFocus
            />
            {passwordError && (
              <p className="mb-4 text-sm text-red-600">{passwordError}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-brand-red px-4 py-3 font-medium text-white transition-colors hover:bg-brand-red-dark"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminPanel onLogout={handleLogout} />;
}

// --- Admin Panel (post-auth) ---

interface AdminPanelProps {
  onLogout: () => void;
}

function AdminPanel({ onLogout }: AdminPanelProps) {
  const { prices, loading, formatPrice, refreshPrices } = usePrices();
  const allProducts = getAllProducts();
  const productCodes = new Set(allProducts.map((p) => p.code));

  const [filter, setFilter] = useState('');
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    code: string;
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // New price form
  const [newCode, setNewCode] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newError, setNewError] = useState('');

  const showFeedback = useCallback(
    (code: string, type: 'success' | 'error', message: string) => {
      setFeedback({ code, type, message });
      setTimeout(() => setFeedback(null), 3000);
    },
    []
  );

  // Build list: all prices + filter
  const priceEntries = Array.from(prices.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([code]) =>
      filter ? code.toLowerCase().includes(filter.toLowerCase()) : true
    );

  const handleEdit = (code: string, currentPrice: number) => {
    setEditingCode(code);
    setEditValue(currentPrice.toString());
  };

  const handleSaveEdit = async (code: string) => {
    const parsed = parseInt(editValue, 10);
    if (isNaN(parsed) || parsed < 0) return;

    setSaving(code);
    try {
      await setDoc(doc(db, 'precios', code), { precio: parsed });
      await refreshPrices();
      showFeedback(code, 'success', 'Guardado');
    } catch (error) {
      console.error('Error saving price:', error);
      showFeedback(code, 'error', 'Error al guardar');
    } finally {
      setSaving(null);
      setEditingCode(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCode(null);
    setEditValue('');
  };

  const handleDelete = async (code: string) => {
    if (!confirm(`Eliminar precio de ${code}?`)) return;

    setSaving(code);
    try {
      await deleteDoc(doc(db, 'precios', code));
      await refreshPrices();
      showFeedback(code, 'success', 'Eliminado');
    } catch (error) {
      console.error('Error deleting price:', error);
      showFeedback(code, 'error', 'Error al eliminar');
    } finally {
      setSaving(null);
    }
  };

  const handleAddPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewError('');

    const code = newCode.trim().toUpperCase();
    if (!code) {
      setNewError('Ingrese un código de producto');
      return;
    }
    if (!productCodes.has(code)) {
      setNewError(`El código "${code}" no existe en products.json`);
      return;
    }
    const parsed = parseInt(newPrice, 10);
    if (isNaN(parsed) || parsed < 0) {
      setNewError('Ingrese un precio válido (número entero)');
      return;
    }

    setSaving(code);
    try {
      await setDoc(doc(db, 'precios', code), { precio: parsed });
      await refreshPrices();
      setNewCode('');
      setNewPrice('');
      showFeedback(code, 'success', 'Agregado');
    } catch (error) {
      console.error('Error adding price:', error);
      setNewError('Error al guardar en Firestore');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center text-gray-medium">Cargando precios...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 lg:px-16">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-dark">
          Administración de Precios
        </h1>
        <button
          onClick={onLogout}
          className="rounded-md border border-gray-light px-4 py-2 text-sm text-gray-medium transition-colors hover:border-brand-red hover:text-brand-red"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Add New Price */}
      <div className="mb-8 rounded-lg border border-gray-light bg-gray-lighter p-4">
        <h2 className="mb-3 text-sm font-medium text-gray-dark">
          Agregar Precio
        </h2>
        <form
          onSubmit={handleAddPrice}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label
              htmlFor="new-code"
              className="mb-1 block text-xs text-gray-medium"
            >
              Código de producto
            </label>
            <input
              id="new-code"
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="FT6840"
              className="w-full rounded-md border border-gray-light px-3 py-2 text-sm uppercase focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="new-price"
              className="mb-1 block text-xs text-gray-medium"
            >
              Precio (COP, entero)
            </label>
            <input
              id="new-price"
              type="number"
              min="0"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="34000"
              className="w-full rounded-md border border-gray-light px-3 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            Agregar
          </button>
        </form>
        {newError && (
          <p className="mt-2 text-sm text-red-600">{newError}</p>
        )}
      </div>

      {/* Filter */}
      <div className="mb-4">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar por código..."
          className="w-full rounded-md border border-gray-light px-4 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red sm:max-w-xs"
        />
      </div>

      {/* Summary */}
      <p className="mb-4 text-sm text-gray-medium">
        {priceEntries.length} precio{priceEntries.length !== 1 ? 's' : ''}{' '}
        {filter ? 'encontrados' : 'total'}
      </p>

      {/* Price Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-light">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-light bg-gray-lighter">
              <th className="px-4 py-3 text-left font-medium text-gray-dark">
                Código
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-dark">
                Precio
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-dark">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {priceEntries.map(([code, price]) => (
              <tr
                key={code}
                className="border-b border-gray-light last:border-b-0"
              >
                <td className="px-4 py-3 font-mono text-xs uppercase">
                  {code}
                </td>
                <td className="px-4 py-3">
                  {editingCode === code ? (
                    <input
                      type="number"
                      min="0"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(code);
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                      className="w-32 rounded border border-gray-light px-2 py-1 text-sm focus:border-brand-red focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <span className="font-medium">{formatPrice(price)}</span>
                  )}
                  {feedback?.code === code && (
                    <span
                      className={`ml-2 text-xs ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {feedback.message}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {saving === code ? (
                    <span className="text-xs text-gray-medium">
                      Guardando...
                    </span>
                  ) : editingCode === code ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleSaveEdit(code)}
                        className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="rounded border border-gray-light px-3 py-1 text-xs text-gray-medium hover:text-gray-dark"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(code, price)}
                        className="rounded border border-gray-light px-3 py-1 text-xs text-gray-medium hover:border-brand-red hover:text-brand-red"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(code)}
                        className="rounded border border-gray-light px-3 py-1 text-xs text-gray-medium hover:border-red-600 hover:text-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {priceEntries.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-8 text-center text-gray-medium"
                >
                  {filter
                    ? 'No se encontraron precios con ese código'
                    : 'No hay precios registrados'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Precios;
