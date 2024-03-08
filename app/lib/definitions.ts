export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type CustomerField = {
  id: string;
  name: string;
  customerName: string;
  email: string;
  image_url: string;
};


export type InvoiceForm = {
  id: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
};
