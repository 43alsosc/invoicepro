export interface Invoice {
  id: number;
  customerName: string;
  image_url: string;
  email: string;
  amount: number;
  date: string;
  dueBy: string;
  status: string;
}

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

export type InvoiceForm = {
  id: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
};

export interface Customer {
  id: number;
  customerName: string;
  image_url: string;
  email: string;
}
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