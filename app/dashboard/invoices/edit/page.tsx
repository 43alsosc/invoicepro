// import { fetchCustomers, fetchInvoiceById } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import EditInvoiceForm from "@/app/ui/invoices/edit/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Edit</h1>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/edit`,
            active: true,
          },
        ]}
      />
      <Form></Form>
    </main>
  );
}
