"use client";

import { useState, useEffect } from "react";
import InvoicesTable from "./invoice-table";
import { createClient } from "@/utils/supabase/client";
import { Invoice } from "@/app/lib/definitions";

const supabase = createClient();

const ShowInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data, error } = await supabase.from("invoices").select();
      if (error) {
        console.error("Error fetching invoices:", error.message);
      } else {
        setInvoices(data || []);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      {invoices !== null ? (
        <InvoicesTable invoices={invoices} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowInvoices;
