import { fetchCustomers } from "@/app/lib/actions";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getCustomers = async () => {
  const customers = await fetchCustomers();
  return customers;
};

export interface Invoice {
  customer_id: string;
  amount: number;
  date: Date;
  dueBy: Date | null;
  status: string;
}

export const updateInvoice = async (invoice: Invoice) => {
  const { error } = await supabase.from("invoices").update([invoice]);
  if (error) console.error("Error creating invoice:", error);
};
