export interface InvoiceItem {
    id: number;
    serialNo: number;
    description: string;
    hsnSac: string;
    gstRate: number;
    quantity: number;
    rate: number;
    amount: number;
  }