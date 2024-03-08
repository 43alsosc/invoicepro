import { useState, useEffect } from "react";
import InvoicesTable from "./invoice-table";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const ShowInvoices = async () => {
  const { data: invoices } = await supabase.from("invoices").select();

  return (
    <div>
      <InvoicesTable invoices={invoices} />
    </div>
  );
};

export default ShowInvoices;
