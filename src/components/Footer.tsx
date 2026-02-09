import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    productos: [
      { label: 'Catálogo Completo', path: '/griferia' },
      { label: 'Monocontroles', path: '/griferia' },
      { label: 'Accesorios', path: '/griferia' },
    ],
    empresa: [
      { label: 'Sobre Nosotros', path: '/contacto' },
      { label: 'Contacto', path: '/contacto' },
    ],
  };

  return (
    <footer className="bg-chrome-900">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6 inline-block rounded-lg bg-white p-3">
              <img
                src="/logo.png"
                alt="Soluciones Ferreteras"
                className="h-10"
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-chrome-400">
              Líderes en grifería profesional de alta calidad en Colombia.
              Soluciones duraderas para proyectos que exigen excelencia.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a
                href="https://wa.me/573000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-chrome-400 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chrome-800 transition-colors group-hover:bg-crimson-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </span>
                WhatsApp: +57 300 000 0000
              </a>
              <a
                href="mailto:info@solucionesferreteras.com"
                className="group flex items-center gap-3 text-sm text-chrome-400 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chrome-800 transition-colors group-hover:bg-crimson-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                info@solucionesferreteras.com
              </a>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white">
              Productos
            </h3>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-chrome-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white">
              Empresa
            </h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-chrome-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-chrome-800">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-chrome-500">
              &copy; {currentYear} Soluciones Ferreteras. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-1 text-xs text-chrome-500">
              <span>Hecho con</span>
              <svg className="h-3.5 w-3.5 text-crimson-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>en Colombia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
