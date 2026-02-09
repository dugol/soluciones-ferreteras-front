import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getOrganizationSchema, getWebsiteSchema } from '../utils/structuredData';

function Home() {
  const featuredProducts = [
    {
      code: 'FT2011B',
      name: 'Monocontrol Lavamanos Bajo Cuadrado Negro Mate',
      image: '/images/FT2011B-1.webp',
    },
    {
      code: 'FT2012B',
      name: 'Monocontrol Lavamanos Alto Cuadrado Negro Mate',
      image: '/images/FT2012B-1.webp',
    },
    {
      code: 'FT2020B',
      name: 'Monocontrol Lavamanos Bajo Redondo Negro Mate',
      image: '/images/FT2020B-1.webp',
    },
  ];

  const trustBadges = [
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Garantía de Calidad',
      description: 'Productos certificados con garantía extendida',
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Envío Rápido',
      description: 'Despacho a toda Colombia',
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Asesoría Experta',
      description: 'Equipo especializado a tu disposición',
    },
  ];

  return (
    <div className="overflow-hidden">
      <SEO
        title="La Mejor Grifería de Colombia | Soluciones Ferreteras"
        description="Soluciones Ferreteras: Líderes en grifería profesional de alta calidad en Colombia. Monocontroles, llaves y accesorios premium en acabados negro mate. Calidad garantizada para proyectos de construcción."
        keywords="grifería Colombia, mejor grifería, ferretería profesional, monocontrol, grifos premium, lavamanos, baño, cocina, negro mate, construcción"
        structuredData={[getOrganizationSchema(), getWebsiteSchema()]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] overflow-hidden bg-chrome-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-chrome-900 via-chrome-800 to-chrome-900" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Chrome Accent Line */}
        <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-chrome-400/30 to-transparent" />
        <div className="absolute left-0 top-3/4 h-px w-full bg-gradient-to-r from-transparent via-chrome-400/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-12">
          {/* Badge */}
          <div className="animate-fade-up mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-chrome-600 bg-chrome-800/50 px-4 py-2 text-xs font-medium uppercase tracking-widest text-chrome-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson-500" />
              La Mejor Grifería de Colombia
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up animate-delay-100 font-display text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            PRECISIÓN
            <br />
            <span className="chrome-shimmer text-transparent">PROFESIONAL</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up animate-delay-200 mt-8 max-w-xl text-lg leading-relaxed text-chrome-300 md:text-xl">
            Grifería de alta calidad para proyectos que exigen excelencia.
            Durabilidad y diseño que transforman espacios.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up animate-delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/griferia"
              className="btn-primary inline-flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wider"
            >
              Explorar Catálogo
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded border border-chrome-500 bg-transparent px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 hover:bg-white/10"
            >
              Contactar
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-fade-up animate-delay-500 absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-chrome-500">
              <span className="text-[10px] uppercase tracking-widest">Descubre más</span>
              <div className="h-12 w-px bg-gradient-to-b from-chrome-500 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="relative z-10 -mt-8 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="group rounded-lg border border-chrome-200 bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]"
              >
                <div className="mb-4 inline-flex rounded-lg bg-chrome-50 p-3 text-chrome-600 transition-colors group-hover:bg-crimson-500 group-hover:text-white">
                  {badge.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-chrome-900">
                  {badge.title}
                </h3>
                <p className="text-sm leading-relaxed text-chrome-600">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-crimson-500">
              Colección Premium
            </span>
            <h2 className="font-display text-4xl tracking-tight text-chrome-900 md:text-5xl">
              PRODUCTOS DESTACADOS
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-chrome-300 to-transparent" />
          </div>

          {/* Products Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.code}
                to={`/griferia/${product.code.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg bg-white transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Chrome Border Effect */}
                <div className="absolute inset-0 rounded-lg border border-chrome-200 transition-colors duration-300 group-hover:border-chrome-300" />

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-chrome-50 to-white p-8">
                  <img
                    src={product.image}
                    alt={`${product.code} - ${product.name}`}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-chrome-900/0 opacity-0 transition-all duration-300 group-hover:bg-chrome-900/5 group-hover:opacity-100">
                    <span className="translate-y-4 rounded-full bg-white px-6 py-2 text-xs font-semibold uppercase tracking-wider text-chrome-900 shadow-lg transition-transform duration-300 group-hover:translate-y-0">
                      Ver Detalles
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="border-t border-chrome-100 p-6">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-chrome-400">
                    {product.code}
                  </p>
                  <h3 className="line-clamp-2 text-base font-medium leading-snug text-chrome-800 transition-colors group-hover:text-chrome-900">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="mt-16 text-center">
            <Link
              to="/griferia"
              className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-chrome-600 transition-colors hover:text-crimson-500"
            >
              Ver Catálogo Completo
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-chrome-200 transition-all duration-300 group-hover:border-crimson-500 group-hover:bg-crimson-500 group-hover:text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative overflow-hidden bg-chrome-900 px-6 py-24 lg:px-12">
        {/* Background Elements */}
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 rounded-full bg-crimson-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 rounded-full bg-chrome-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Logo Side */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 scale-150 rounded-full bg-white/10 blur-3xl" />
                <div className="relative z-10 flex max-h-72 items-center justify-center rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
                  <img
                    src="/logo.png"
                    alt="Logo Soluciones Ferreteras"
                    className="max-h-56 w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-crimson-500">
                Nuestra Historia
              </span>
              <h2 className="font-display text-4xl tracking-tight text-white md:text-5xl">
                EXCELENCIA EN CADA DETALLE
              </h2>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-chrome-300">
                <p>
                  <strong className="text-white">Soluciones Ferreteras</strong> es tu aliado de confianza en productos
                  de grifería de alta calidad. Con años de experiencia en el mercado colombiano, nos especializamos
                  en proporcionar soluciones profesionales para proyectos de construcción, remodelación y diseño de interiores.
                </p>
                <p>
                  Nuestro catálogo incluye una selección cuidadosamente elegida de grifería moderna y funcional,
                  con acabados de primera calidad como negro mate, que se adaptan a las tendencias actuales
                  en diseño de baños y cocinas.
                </p>
              </div>

              {/* Values Grid */}
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  { number: '10+', label: 'Años de\nExperiencia' },
                  { number: '500+', label: 'Proyectos\nCompletados' },
                  { number: '100%', label: 'Garantía de\nCalidad' },
                ].map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <div className="font-display text-3xl text-crimson-500 md:text-4xl">
                      {stat.number}
                    </div>
                    <div className="mt-1 whitespace-pre-line text-xs uppercase tracking-wider text-chrome-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:text-crimson-500"
                >
                  Conoce Más Sobre Nosotros
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-crimson-600 to-crimson-500 px-6 py-20 lg:px-12">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="cta-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl tracking-tight text-white md:text-5xl">
            ¿LISTO PARA TU PRÓXIMO PROYECTO?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Contáctanos hoy y recibe asesoría personalizada de nuestro equipo de expertos.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/griferia"
              className="inline-flex items-center justify-center gap-2 rounded bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-crimson-600 transition-all duration-200 hover:bg-chrome-100"
            >
              Ver Productos
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-white/10"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
