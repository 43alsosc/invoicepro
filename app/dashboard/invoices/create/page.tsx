import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
};

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <h1>Create Invoice</h1>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} /> */}
    </main>
  );
}
