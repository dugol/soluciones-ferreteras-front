const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://soluciones-ferreteras.web.app';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Soluciones Ferreteras',
    description:
      'Empresa especializada en productos de grifería profesional de alta calidad',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contacto@solucionesferreteras.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
      addressLocality: 'Colombia',
    },
  };
}

export function getProductSchema(product: {
  code: string;
  name: string;
  description: string;
  images: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.code} - ${product.name}`,
    description: product.description,
    image: product.images.map((img) =>
      img.startsWith('http') ? img : `${SITE_URL}${img}`
    ),
    brand: {
      '@type': 'Brand',
      name: 'Soluciones Ferreteras',
    },
    sku: product.code,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'COP',
      url: `${SITE_URL}/griferia/${product.code.toLowerCase()}`,
    },
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Soluciones Ferreteras',
    description:
      'Catálogo de productos de grifería profesional - monocontroles, llaves y accesorios',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/griferia?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
