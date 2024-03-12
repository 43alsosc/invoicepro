"use client";

import React, { useState, useEffect } from "react";
import CustomersTable from "./customer-table";
import { createClient } from "@/utils/supabase/client";
import { Customer } from "@/app/lib/definitions";

const supabase = createClient();

const ShowCustomers = () => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from("customers").select();
      if (error) {
        console.error("Error fetching customers:", error.message);
      } else {
        setCustomers(data || []);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      {customers !== null ? (
        <CustomersTable customers={customers} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowCustomers;
