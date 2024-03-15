import InvoicesTable from "@/app/ui/invoices/invoice-table";
import ShowInvoices from "@/app/ui/invoices/show-invoices";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ShowInvoices />
    </main>
  );
}
