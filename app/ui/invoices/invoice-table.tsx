import React from "react";
import InvoiceStatus from "./status";
import Image from "next/image";
import Link from "next/link";

// Define interface for invoice object
interface Invoice {
  id: number;
  customerName: string;
  image_url: string;
  email: string;
  amount: number;
  date: string;
  dueBy: string;
  status: string;
}

interface Props {
  invoices: Invoice[];
}

const InvoicesTable: React.FC<Props> = ({ invoices }) => {
  return (
    <div className="mt-6 flow-root">
      <Link href="/dashboard/invoices/create">Create Invoice!</Link>
      <div className="inline-block min-w-full align-middle"></div>
      {/* Container for the invoice table, with different layouts for mobile and desktop views */}
      <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        {/* Mobile view: list of invoices */}
        <div className="md:hidden">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="mb-2 w-full rounded-md bg-white p-4"
            >
              {/* Invoice card for mobile view */}
              <div className="flex items-center justify-between border-b pb-4">
                {/* Customer information and email */}
                <div>
                  <div className="mb-2 flex items-center">
                    {/* Customer avatar */}
                    <Image
                      alt="bilde"
                      src={invoice.image_url}
                      className="mr-2 rounded-full"
                      width={28}
                      height={28}
                    />
                    {/* Customer name */}
                    <p>{invoice.customerName}</p>
                  </div>
                  {/* Customer email */}
                  <p className="text-sm text-gray-500">{invoice.email}</p>
                </div>
                {/* Status indicator component */}
                <InvoiceStatus status={invoice.status} />
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                {/* Invoice amount and date */}
                <div>
                  <p className="text-xl font-medium">$ {invoice.amount}</p>
                  <p>{invoice.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view: table layout */}
        <table className="hidden min-w-full text-gray-900 md:table">
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
                Customer
              </th>
              <th scope="col" className="px-3 py-5 font-medium text-center">
                Amount
              </th>
              <th scope="col" className="px-3 py-5 font-medium text-center">
                Date
              </th>
              <th scope="col" className="px-3 py-5 font-medium text-center">
                Due Date
              </th>
              <th scope="col" className="px-3 py-5 font-medium text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {/* Table rows */}
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {invoice.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center">
                  {/* Customer avatar */}
                  <Image
                    alt="bilde"
                    src={invoice.image_url}
                    className="mr-2 rounded-full"
                    width={28}
                    height={28}
                  />
                  {/* Customer name */}
                  <p>{invoice.customerName}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  $ {invoice.amount}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {invoice.date}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {invoice.dueBy}
                </td>
                <td
                  className={`px-5 py-5 border-b border-gray-200 bg-white text-sm`}
                >
                  <InvoiceStatus status={invoice.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTable;
