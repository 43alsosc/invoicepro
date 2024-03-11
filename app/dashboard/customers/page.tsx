import CustomerTable from "@/app/ui/customers/customer-table";
import ShowCustomers from "@/app/ui/customers/show-customers";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ShowCustomers />
    </main>
  );
}
