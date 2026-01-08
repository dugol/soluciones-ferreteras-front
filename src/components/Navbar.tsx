import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuoteCart } from '../context/QuoteCartContext';

const QuoteCartDrawer = lazy(() => import('./QuoteCartDrawer'));

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useQuoteCart();

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/griferia', label: 'Grifería' },
    { path: '/contacto', label: 'Contacto' },
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Soluciones Ferreteras"
              className="h-12 md:h-15"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-base font-medium transition-colors hover:text-brand-red ${
                  isActiveLink(link.path)
                    ? 'text-brand-red'
                    : 'text-gray-dark'
                }`}
              >
                {link.label}
                {isActiveLink(link.path) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-brand-red" />
                )}
              </Link>
            ))}

            {/* Cart Icon - Desktop */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative ml-2 flex h-11 w-11 items-center justify-center rounded-md text-gray-dark transition-colors hover:bg-gray-lighter hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
              aria-label={`Ver cotización (${itemCount} productos)`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart Icon + Hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            {/* Cart Icon - Mobile */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-md text-gray-dark transition-colors hover:bg-gray-lighter hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
              aria-label={`Ver cotización (${itemCount} productos)`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`h-0.5 w-6 bg-gray-dark transition-all duration-200 ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-gray-dark transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-gray-dark transition-all duration-200 ${
                  isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-light bg-white md:hidden">
          <div className="space-y-1 px-6 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActiveLink(link.path)
                    ? 'bg-gray-lighter text-brand-red'
                    : 'text-gray-dark hover:bg-gray-lighter hover:text-brand-red'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quote Cart Drawer */}
      {isCartOpen && (
        <Suspense fallback={null}>
          <QuoteCartDrawer onClose={() => setIsCartOpen(false)} />
        </Suspense>
      )}
    </nav>
  );
}

export default Navbar;
