"use client";
import { createClient } from "@/utils/supabase/client";
// import { useEffect, useState } from "react";

const supabase = createClient();

export const TotalUsersCard = async () => {
  //   const [totalUsers, setTotalUsers] = useState(0);

  const { count, error } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching total users", error);
  }

  return (
    <div className="flex justify-center">
      <div className="block max-w-[18rem] rounded-lg border border-primary bg-white shadow-secondary-1 dark:bg-surface-dark">
        <div className="border-b-2 border-neutral-100 px-6 py-3 text-surface dark:border-white/10 dark:text-white">
          TOTAL USERS
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-primary">
            Users
          </h5>
          <p className="text-base text-primary text-center">{count}</p>
        </div>
      </div>
    </div>
  );
};
