export interface QuoteClientData {
  name?: string;
  company?: string;
  nit?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface QuoteLineItem {
  productCode: string;
  productName: string;
  quantity: number;
  unitPriceWithTax: number;
  unitPriceBase: number;
  unitPriceTax: number;
  lineTotalWithTax: number;
}

export interface QuoteData {
  client: QuoteClientData;
  items: QuoteLineItem[];
  date: Date;
  subtotalBase: number;
  totalTax: number;
  totalWithTax: number;
}
