import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

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
      <button
        type="button"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        className="flex items-center rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-primary-2 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none "
      >
        <Link href="/dashboard/customers/create" className="flex">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Customer!
        </Link>
      </button>
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
