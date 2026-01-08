import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-dark text-gray-light">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: Company Info */}
          <div>
            <img
              src="/logo.png"
              alt="Soluciones Ferreteras"
              className="mb-4 h-12 brightness-0 invert"
            />
            <p className="text-sm">Soluciones Ferreteras</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-medium text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm transition-colors hover:text-brand-red"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/griferia"
                  className="text-sm transition-colors hover:text-brand-red"
                >
                  Grifería
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-sm transition-colors hover:text-brand-red"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="mb-4 text-base font-medium text-white">Contacto</h3>
            <p className="text-sm">Información de contacto disponible pronto</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-medium pt-6 text-center">
          <p className="text-sm">
            &copy; {currentYear} Soluciones Ferreteras. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
