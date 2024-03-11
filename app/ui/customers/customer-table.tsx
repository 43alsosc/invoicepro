import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define interface for customer object
interface Customer {
  id: number;
  customerName: string;
  image_url: string;
  email: string;
}

interface Props {
  customers: Customer[];
}

const CustomersTable: React.FC<Props> = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return <p>No customers found.</p>;
  }

  return (
    <div className="mt-6 flow-root">
      <Link href="/dashboard/invoices/create">Create Invoice!</Link>
      <div className="inline-block min-w-full align-middle"></div>
      {/* Container for the customer table */}
      <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        {/* Table layout */}
        <table className="min-w-full text-gray-900">
          <thead className="rounded-lg text-left text-sm font-normal">
            {/* Table headers */}
            <tr>
              <th scope="col" className="px-3 py-5 font-medium text-center">
                Id
              </th>
              <th
                scope="col"
                className="px-4 py-5 font-medium sm:pl-6 text-center"
              >
                Customer Name
              </th>
              <th scope="col" className="px-3 py-5 font-medium text-center">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {/* Table rows */}
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {customer.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center">
                  {/* Customer avatar */}
                  <Image
                    alt="bilde"
                    src={customer.image_url}
                    className="mr-2 rounded-full"
                    width={28}
                    height={28}
                  />
                  {/* Customer name */}
                  <p>{customer.customerName}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {customer.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
