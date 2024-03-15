"use client";
import Link from "next/link";
import Image from "next/image";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  InputAdornment,
  NoSsr,
  TextField,
  MenuItem,
  TextFieldProps,
} from "@mui/material";
import { useRouter } from "next/navigation";

import InvoiceStatus from "@/app/ui/invoices/status";

const supabase = createClient();

export default function Form() {
  // Use the router to redirect the user to the newly created invoice
  const router = useRouter();

  // State variables for data fields from forms
  const [invoices, setInvoices] = useState<any[]>([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // State variables for error messages
  const [invoiceIdError, setInvoiceIdError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*, customer:customer_id(image_url, customerName, email)");

      if (error) console.error("Error fetching invoices:", error);
      else setInvoices(data);
    };

    fetchInvoices();
  }, []);

  const handleInvoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedInvoice = invoices.find(
      (invoice) => invoice.id === event.target.value
    );
    if (selectedInvoice) {
      setSelectedInvoiceId(selectedInvoice.id);
      setAmount(selectedInvoice.amount);
      setStatus(selectedInvoice.status);
      setDueDate(new Date(selectedInvoice.dueBy));
    }
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

    // Clear previous error messages
    setInvoiceIdError("");
    setAmountError("");
    setStatusError("");
    setDueDateError("");

    // Validation checks
    if (!selectedInvoiceId) {
      setInvoiceIdError("Customer ID is required.");
    }
    if (amount <= 0) {
      setAmountError("Amount must be greater than 0.");
    }
    if (!status) {
      setStatusError("Status is required.");
    }
    if (!dueDate) {
      setDueDateError("Due date is required.");
    }

    if (invoiceIdError || amountError || statusError || dueDateError) {
      return;
    }

    // Insert the invoice into the database
    const { error } = await supabase.from("invoices").insert([
      {
        customer_id: selectedInvoiceId,
        amount,
        date: new Date(),
        dueBy: dueDate,
        status,
      },
    ]);

    // Log any errors
    if (error) {
      console.error("Error creating invoice:", error);
    } else {
      // Clear the form fields
      setSelectedInvoiceId("");
      setAmount(0);
      setStatus("");
      setDueDate(null);
      // Redirect the user to the newly created invoice
      router.push("/dashboard/invoices");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose Invoice
          </label>
          <div className="relative">
            <NoSsr>
              <TextField
                select
                label="Select an Invoice"
                value={selectedInvoiceId}
                onChange={handleInvoiceChange}
                error={Boolean(invoiceIdError)}
                helperText={invoiceIdError}
                variant="outlined"
                color="secondary"
                fullWidth
                required
              >
                {invoices.map((invoice) => (
                  <MenuItem
                    key={invoice.id}
                    value={invoice.id}
                    className="flex-nowrap text-sm py-2 px-4 hover:bg-gray-100"
                  >
                    <div className="flex" style={{ alignItems: "stretch" }}>
                      <div className="flex items-center">
                        <p className="px-5 py-5  text-sm">{invoice.id}</p>
                      </div>
                      <div className="px-5 py-5 text-sm flex items-center">
                        <Image
                          alt="bilde"
                          src={invoice.customer.image_url}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                        />
                        <p className="px-5 py-5 text-sm">
                          {invoice.customer.customerName}
                        </p>
                      </div>
                      <p className="px-5 py-5 text-sm">${invoice.amount}</p>
                      <p className="px-5 py-5 text-sm">{invoice.dueBy}</p>
                      <p className="px-5 py-5 text-sm">
                        <InvoiceStatus status={invoice.status} />
                      </p>
                    </div>
                  </MenuItem>
                ))}
              </TextField>
            </NoSsr>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {/* Customer error */}
            {invoiceIdError && (
              <div style={{ color: "red" }}>{invoiceIdError}</div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleAmountChange}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div>
              {amountError && <div style={{ color: "red" }}>{amountError}</div>}
            </div>
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  onChange={handleStatusChange}
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-black dark:text-black"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  onChange={handleStatusChange}
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="overdue"
                  name="status"
                  type="radio"
                  value="overdue"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  onChange={handleStatusChange}
                />
                <label
                  htmlFor="overdue"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white dark:text-white"
                >
                  Overdue <ExclamationTriangleIcon className="h-4 w-4" />
                </label>
              </div>
              <div>
                {statusError && (
                  <div style={{ color: "red" }}>{statusError}</div>
                )}
              </div>
            </div>
          </div>
        </fieldset>

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
          <div>
            {dueDateError && <div style={{ color: "red" }}>{dueDateError}</div>}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="py-2 px-4 rounded-md bg-blue-500 text-white"
          >
            Create Invoice
          </Button>
        </div>
      </div>
    </form>
  );
}
