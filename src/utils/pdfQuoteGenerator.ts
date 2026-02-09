import type { QuoteData, QuoteClientData } from '../types/quote';

const IVA_RATE = 0.19;

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function loadLogoBase64(): Promise<string | null> {
  try {
    const response = await fetch('/logo.png');
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export function calculateLineItem(
  productCode: string,
  productName: string,
  quantity: number,
  priceWithTax: number | null
) {
  if (priceWithTax === null) {
    return {
      productCode,
      productName,
      quantity,
      unitPriceWithTax: 0,
      unitPriceBase: 0,
      unitPriceTax: 0,
      lineTotalWithTax: 0,
      hasPrice: false,
    };
  }

  const unitPriceBase = Math.round(priceWithTax / (1 + IVA_RATE));
  const unitPriceTax = priceWithTax - unitPriceBase;

  return {
    productCode,
    productName,
    quantity,
    unitPriceWithTax: priceWithTax,
    unitPriceBase,
    unitPriceTax,
    lineTotalWithTax: quantity * priceWithTax,
    hasPrice: true,
  };
}

export async function generateQuotePDF(data: QuoteData): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const autoTableModule = await import('jspdf-autotable');
  const autoTable = autoTableModule.default;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 20;
  const marginRight = 20;
  let y = 20;

  // --- Header ---
  const logo = await loadLogoBase64();
  if (logo) {
    doc.addImage(logo, 'PNG', marginLeft, y, 25, 25);
  }

  const headerX = logo ? marginLeft + 30 : marginLeft;
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('SOLUCIONES FERRETERAS', headerX, y + 8);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Remisión', headerX, y + 16);

  doc.setFontSize(9);
  doc.text(`NIT: 98592727`, headerX, y + 22);
  doc.text(`Tel: 3196535012`, headerX, y + 27);
  doc.text(`Cra 83D #92-28, Medellín`, headerX, y + 32);

  // Date on the right side
  doc.setFontSize(10);
  doc.text(`Fecha: ${formatDate(data.date)}`, pageWidth - marginRight, y + 8, { align: 'right' });

  y += 40;

  // --- Divider ---
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 8;

  // --- Client Data ---
  const clientFields: { label: string; key: keyof QuoteClientData }[] = [
    { label: 'Cliente', key: 'name' },
    { label: 'Empresa', key: 'company' },
    { label: 'NIT', key: 'nit' },
    { label: 'Dirección', key: 'address' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Email', key: 'email' },
  ];

  const filledFields = clientFields.filter((f) => data.client[f.key]);
  if (filledFields.length > 0) {
    doc.setFontSize(10);
    for (const field of filledFields) {
      doc.setFont('helvetica', 'bold');
      doc.text(`${field.label}: `, marginLeft, y);
      const labelWidth = doc.getTextWidth(`${field.label}: `);
      doc.setFont('helvetica', 'normal');
      doc.text(String(data.client[field.key]), marginLeft + labelWidth, y);
      y += 6;
    }
    y += 4;
  }

  // --- Product Table ---
  const pricedItems = data.items.filter((item) => item.unitPriceWithTax > 0);
  const unpricedItems = data.items.filter((item) => item.unitPriceWithTax === 0);

  const tableBody = data.items.map((item, index) => {
    const hasPrice = item.unitPriceWithTax > 0;
    return [
      String(index + 1),
      item.productCode,
      item.productName,
      String(item.quantity),
      hasPrice ? formatCurrency(item.unitPriceWithTax) : 'Precio no disponible',
      hasPrice ? formatCurrency(item.lineTotalWithTax) : '-',
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [['#', 'Código', 'Producto', 'Cant.', 'P. Unitario (IVA incl.)', 'Total']],
    body: tableBody,
    theme: 'grid',
    margin: { left: marginLeft, right: marginRight },
    headStyles: {
      fillColor: [180, 30, 30],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center',
    },
    bodyStyles: {
      fontSize: 9,
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { halign: 'center', cellWidth: 22 },
      2: { cellWidth: 'auto' },
      3: { halign: 'center', cellWidth: 14 },
      4: { halign: 'right', cellWidth: 35 },
      5: { halign: 'right', cellWidth: 28 },
    },
    showHead: 'everyPage',
  });

  // Get final Y after table
  const lastTable = (doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable;
  y = (lastTable?.finalY ?? y + 40) + 8;

  // --- Totals ---
  // Only include priced items in totals
  if (pricedItems.length > 0) {
    const totalsX = pageWidth - marginRight - 70;
    const valuesX = pageWidth - marginRight;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal (sin IVA):', totalsX, y, { align: 'left' });
    doc.text(formatCurrency(data.subtotalBase), valuesX, y, { align: 'right' });
    y += 6;

    doc.text('IVA (19%):', totalsX, y, { align: 'left' });
    doc.text(formatCurrency(data.totalTax), valuesX, y, { align: 'right' });
    y += 7;

    doc.setDrawColor(180, 30, 30);
    doc.setLineWidth(0.8);
    doc.line(totalsX, y - 2, valuesX, y - 2);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL (con IVA):', totalsX, y + 4, { align: 'left' });
    doc.text(formatCurrency(data.totalWithTax), valuesX, y + 4, { align: 'right' });
    y += 12;
  }

  // Note about unpriced items
  if (unpricedItems.length > 0) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(120, 120, 120);
    doc.text(
      '* Los productos sin precio disponible no están incluidos en los totales.',
      marginLeft,
      y + 4
    );
    doc.setTextColor(0, 0, 0);
    y += 12;
  }

  // --- Bank Info ---
  y += 6;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Información Bancaria', marginLeft, y);
  y += 7;

  doc.setFontSize(9);
  const bankFields = [
    { label: 'Banco', value: 'Bancolombia' },
    { label: 'Tipo de cuenta', value: 'Ahorros' },
    { label: 'No. de cuenta', value: '54949800256' },
    { label: 'Titular', value: 'Juan Diego Pérez Zapata' },
  ];

  for (const field of bankFields) {
    doc.setFont('helvetica', 'bold');
    doc.text(`${field.label}: `, marginLeft, y);
    const labelWidth = doc.getTextWidth(`${field.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.text(field.value, marginLeft + labelWidth, y);
    y += 5.5;
  }

  return doc.output('blob');
}

export function getQuoteFileName(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `cotizacion-soluciones-ferreteras-${yyyy}-${mm}-${dd}.pdf`;
}
