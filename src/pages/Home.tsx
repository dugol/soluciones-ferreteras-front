import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getOrganizationSchema, getWebsiteSchema } from '../utils/structuredData';

function Home() {
  const featuredProducts = [
    {
      code: 'FT2011B',
      name: 'Monocontrol Lavamanos Bajo Cuadrado Negro Mate',
      image: '/FT2011B-1.jpg',
    },
    {
      code: 'FT2012B',
      name: 'Monocontrol Lavamanos Alto Cuadrado Negro Mate',
      image: '/FT2012B-1.jpg',
    },
    {
      code: 'FT2020B',
      name: 'Monocontrol Lavamanos Bajo Redondo Negro Mate',
      image: '/FT2020B-1.png',
    },
  ];

  return (
    <div>
      <SEO
        title="Inicio - Grifería Profesional de Alta Calidad"
        description="Soluciones Ferreteras ofrece productos de grifería profesional de alta calidad. Monocontroles, llaves y accesorios en negro mate para baños y cocinas. Atención profesional para proyectos de construcción."
        keywords="grifería, ferretería, llaves, monocontrol, productos ferreteros, grifos, lavamanos, baño, cocina, negro mate, construcción, remodelación"
        structuredData={[getOrganizationSchema(), getWebsiteSchema()]}
      />
      {/* Hero Section */}
      <section className="relative flex min-h-[400px] items-center justify-center bg-gradient-to-br from-gray-dark via-gray-medium to-gray-dark px-6 py-20 text-white md:min-h-[500px]">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Soluciones de Grifería Profesional
          </h1>
          <p className="mb-8 text-lg text-gray-light md:text-xl">
            Calidad y precisión para tus proyectos de construcción y remodelación
          </p>
          <Link
            to="/griferia"
            className="inline-block rounded-md bg-brand-red px-8 py-4 text-base font-medium text-white transition-all duration-150 ease-in-out hover:bg-brand-red-dark hover:shadow-lg"
          >
            Ver Nuestro Catálogo
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-dark md:text-4xl">
            Productos Destacados
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.code}
                to="/griferia"
                className="group overflow-hidden rounded-lg border border-gray-light shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden bg-gray-lighter">
                  <img
                    src={product.image}
                    alt={`${product.code} - ${product.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-base font-medium text-gray-dark">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/griferia"
              className="inline-block text-base font-medium text-brand-red transition-colors hover:text-brand-red-dark hover:underline"
            >
              Ver Catálogo Completo →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-lighter px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo Soluciones Ferreteras"
                className="max-h-64 w-auto"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-dark md:text-4xl">
                Sobre Nosotros
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-dark">
                <p>
                  Soluciones Ferreteras es tu aliado de confianza en productos
                  de grifería de alta calidad. Con años de experiencia en el
                  mercado, nos especializamos en proporcionar soluciones
                  profesionales para proyectos de construcción, remodelación y
                  diseño de interiores.
                </p>
                <p>
                  Nuestro catálogo incluye una selección cuidadosamente elegida
                  de grifería moderna y funcional, con acabados de primera
                  calidad como negro mate, que se adaptan a las tendencias
                  actuales en diseño de baños y cocinas.
                </p>
                <p>
                  Trabajamos tanto con profesionales de la construcción como
                  con clientes particulares, ofreciendo asesoría personalizada
                  y atención dedicada para ayudarte a encontrar exactamente lo
                  que necesitas para tu proyecto.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold text-gray-dark">
                  Nuestros Valores
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-brand-red">✓</span>
                    <span className="text-gray-dark">
                      <strong>Calidad:</strong> Productos de marcas reconocidas
                      y materiales duraderos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-brand-red">✓</span>
                    <span className="text-gray-dark">
                      <strong>Experiencia:</strong> Conocimiento técnico para
                      asesorarte correctamente
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-brand-red">✓</span>
                    <span className="text-gray-dark">
                      <strong>Servicio:</strong> Atención personalizada y
                      compromiso con tu satisfacción
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
