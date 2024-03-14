"use client";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { NoSsr, TextField, TextFieldProps } from "@mui/material";

const supabase = createClient();

export default function Form() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from("customers").select();

      if (error) console.error("Error fetching customers:", error);
      else setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const handleCustomerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCustomerId(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handledueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(new Date(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.from("invoices").insert([
      {
        customer_id: selectedCustomerId,
        amount,
        date: new Date(),
        dueBy: dueDate,
        status,
      },
    ]);

    if (error) console.error("Error creating invoice:", error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
              onChange={handleCustomerChange}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.customerName}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {/* Customer error */}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="Enter USD amount"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={handleAmountChange}
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Status</label>
          <div>
            <label htmlFor="pending" className="inline-flex items-center">
              <input
                id="pending"
                name="status"
                type="radio"
                value="pending"
                className="peer block text-sm outline-2"
                onChange={handleStatusChange}
              />
              <span className="ml-2">Pending</span>
            </label>
            <label htmlFor="paid" className="inline-flex items-center ml-6">
              <input
                id="paid"
                name="status"
                type="radio"
                value="paid"
                className="peer block text-sm outline-2"
                onChange={handleStatusChange}
              />
              <span className="ml-2">Paid</span>
            </label>
            <label htmlFor="overdue" className="inline-flex items-center ml-6">
              <input
                id="overdue"
                name="status"
                type="radio"
                value="overdue"
                className="peer block text-sm outline-2"
                onChange={handleStatusChange}
              />
              <span className="ml-2">Overdue</span>
            </label>
          </div>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label htmlFor="dueDate" className="mb-2 block text-sm font-medium">
            Due date
          </label>
          <TextField
            id="dueDate"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handledueDateChange}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="py-2 px-4 rounded-md bg-blue-500 text-white"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  );
}
// Basic form ev create-form.tsx
// <form onSubmit={handleSubmit}>
//   <div className="rounded-md bg-gray-50 p-4 md:p-6">
//     {/* Customer Name */}
//     <div className="mb-4">
//       <label htmlFor="customer" className="mb-2 block text-sm font-medium">
//         Choose customer
//       </label>
//       <div className="relative">
//         <select
//           id="customer"
//           name="customerId"
//           className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//           defaultValue=""
//           aria-describedby="customer-error"
//         >
//           <option value="" disabled>
//             Select a customer
//           </option>
//           <option>{/* Customers from customers supabase table */}</option>
//         </select>
//         <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//       </div>
//       <div id="customer-error" aria-live="polite" aria-atomic="true">
//         {/* Customer error */}
//       </div>
//     </div>

//     {/* Invoice Amount */}
//     <div className="mb-4">
//       <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//         Choose an amount
//       </label>
//       <div className="relative mt-2 rounded-md">
//         <div className="relative">
//           <input
//             id="amount"
//             name="amount"
//             type="number"
//             step="0.01"
//             placeholder="Enter USD amount"
//             className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//           />
//           <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//         </div>
//         <div id="amount-error" aria-live="polite" aria-atomic="true">
//           {/* Amount error */}
//         </div>
//       </div>
//     </div>

//     {/* Invoice Status */}
//     <fieldset>
//       <legend className="mb-2 block text-sm font-medium">
//         Set the invoice status
//       </legend>
//       <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//         <div className="flex gap-4">
//           <div className="flex items-center">
//             <input
//               id="pending"
//               name="status"
//               type="radio"
//               value="pending"
//               className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
//             />
//             <label
//               htmlFor="pending"
//               className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
//             >
//               Pending <ClockIcon className="h-4 w-4" />
//             </label>
//           </div>
//           <div className="flex items-center">
//             <input
//               id="paid"
//               name="status"
//               type="radio"
//               value="paid"
//               className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
//             />
//             <label
//               htmlFor="paid"
//               className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
//             >
//               Paid <CheckIcon className="h-4 w-4" />
//             </label>
//           </div>
//           <div id="status-error" aria-live="polite" aria-atomic="true">
//             {/* Status error */}
//           </div>
//         </div>
//       </div>
//     </fieldset>

//     {/* Date Created */}
//     <div></div>
//     {/* Due By */}
//     <div></div>
//   </div>
//   <div className="mt-6 flex justify-end gap-4">
//     <Link
//       href="/dashboard/invoices"
//       className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//     >
//       Cancel
//     </Link>
//     <Button type="submit">Create Invoice</Button>
//   </div>
// </form>
