import SEO from '../components/SEO';

// WhatsApp configuration
const WHATSAPP_NUMBER = '573196535012';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me interesa información sobre sus productos'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// WhatsApp icon SVG component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-16">
      <SEO
        title="Contacto - Chatea con Nosotros por WhatsApp"
        description="Contáctanos por WhatsApp para consultas sobre grifería profesional. Respuesta rápida y atención personalizada. ¡Escríbenos ahora!"
        keywords="contacto whatsapp, consultas grifería, asesoría productos, soluciones ferreteras contacto"
      />

      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-dark md:text-5xl">
          Contáctanos
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-medium">
          ¿Tienes preguntas sobre nuestros productos? Escríbenos por WhatsApp y
          te responderemos lo antes posible.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* WhatsApp CTA Section - Left Column */}
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-lighter p-8 text-center md:items-start md:text-left">
          <div className="mb-6 rounded-full bg-[#25D366] p-4">
            <WhatsAppIcon className="h-10 w-10 text-white" />
          </div>

          <h2 className="mb-3 text-2xl font-bold text-gray-dark">
            Chatea con Ventas
          </h2>

          <p className="mb-6 text-gray-medium">
            Obtén respuestas rápidas sobre productos, disponibilidad y precios.
            Nuestro equipo está listo para ayudarte.
          </p>

          {/* WhatsApp Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contáctanos por WhatsApp (abre en nueva ventana)"
            className="inline-flex items-center gap-3 rounded-lg bg-[#25D366] px-8 py-4 text-lg font-medium text-white transition-all hover:bg-[#1DA851] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          >
            <WhatsAppIcon className="h-6 w-6" />
            Contáctanos por WhatsApp
          </a>

          <p className="mt-4 text-sm text-gray-medium">
            Tiempo de respuesta promedio: menos de 1 hora
          </p>
        </div>

        {/* Contact Information - Right Column */}
        <div className="rounded-lg bg-gray-lighter p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-dark">
            Información de Contacto
          </h2>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white p-3">
                <svg
                  className="h-6 w-6 text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-dark">Teléfono / WhatsApp</p>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="text-brand-red hover:text-brand-red-dark"
                >
                  +57 319 653 5012
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white p-3">
                <svg
                  className="h-6 w-6 text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-dark">Horario de Atención</p>
                <p className="text-gray-medium">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-medium">Sábados: 8:00 AM - 1:00 PM</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white p-3">
                <svg
                  className="h-6 w-6 text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-dark">Ubicación</p>
                <p className="text-gray-medium">Colombia</p>
              </div>
            </div>
          </div>

          {/* Additional WhatsApp CTA for mobile visibility */}
          <div className="mt-8 border-t border-gray-light pt-6">
            <p className="mb-4 text-sm text-gray-medium">
              La forma más rápida de contactarnos:
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviar mensaje por WhatsApp (abre en nueva ventana)"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#25D366] px-6 py-3 font-medium text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
