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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_4px_20px_-4px_rgba(0,0,0,0.1)]'
          : 'bg-white'
      }`}
    >
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-chrome-400 via-crimson-500 to-chrome-400" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-18 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Soluciones Ferreteras"
              className="h-11 transition-transform duration-300 group-hover:scale-105 md:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  isActiveLink(link.path)
                    ? 'text-crimson-500'
                    : 'text-chrome-700 hover:text-chrome-900'
                }`}
              >
                {link.label}
                {isActiveLink(link.path) && (
                  <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-crimson-500" />
                )}
              </Link>
            ))}

            {/* Divider */}
            <div className="mx-3 h-6 w-px bg-chrome-200" />

            {/* Quote Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center gap-2 rounded-full bg-chrome-50 px-4 py-2 transition-all duration-200 hover:bg-chrome-100"
              aria-label={`Ver cotización (${itemCount} productos)`}
            >
              <svg
                className="h-5 w-5 text-chrome-600 transition-colors group-hover:text-chrome-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-xs font-medium text-chrome-600 group-hover:text-chrome-900">
                Cotización
              </span>
              {itemCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-crimson-500 text-[10px] font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Quote Icon + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Quote Icon - Mobile */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-chrome-100"
              aria-label={`Ver cotización (${itemCount} productos)`}
            >
              <svg
                className="h-5 w-5 text-chrome-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-crimson-500 text-[10px] font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full transition-colors hover:bg-chrome-100"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`h-[2px] w-5 bg-chrome-700 transition-all duration-300 ${
                  isMenuOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-chrome-700 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-chrome-700 transition-all duration-300 ${
                  isMenuOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-chrome-100 bg-white transition-all duration-300 md:hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMobileMenu}
              className={`block rounded-lg px-4 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
                isActiveLink(link.path)
                  ? 'bg-chrome-50 text-crimson-500'
                  : 'text-chrome-700 hover:bg-chrome-50 hover:text-chrome-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

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
