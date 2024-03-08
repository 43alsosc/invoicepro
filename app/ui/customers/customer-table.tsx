'use client';

// import React, { useEffect, useState } from "react";
// import { UpdateCustomer } from "@/app/ui/customers/buttons";
// import Image from "next/image";
// import Link from "next/link";

// interface Customer {
//   id: string;
//   image_url: string; // Endre når den tid kommer
//   customerName: string;
//   email: string;
//   total_invoices: number;
//   total_pending: number;
//   total_paid: number;
// }

const CustomerTable =() => {
    return (
        <h1>Test</h1>
    );
};


// const CustomerTable = () => {
//   const [customer, setCustomer] = useState<Customer[]>([]);
//   useEffect(() => {
//     fetch("/api/customer")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setCustomer(data);
//         } else {
//           console.error("Fetched data is not an array:", data);

//           setCustomer([]);
//         }
//       })
//       .catch((err) => console.error("Failed to load customers", err));
//   }, []);

//   return (
//     <div className="mt-6 flow-root">
//       <Link href="/dashboard/customers/create">
//         Add Customer!
//       </Link>
//       <div className="inline-block min-w-full align-middle"></div>
//       {/* Container for the invoice table, with different layouts for mobile and desktop views */}
//       <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
//         {/* Mobile view: list of invoices */}
//         <div className="md:hidden">
//           {customer?.map((customer) => (
//             <div
//               key={customer.id}
//               className="mb-2 w-full rounded-md bg-white p-4"
//             >
//               {/* Invoice card for mobile view */}
//               <div className="flex items-center justify-between border-b pb-4">
//                 {/* Customer information and email */}
//                 <div>
//                   <div className="mb-2 flex items-center">
//                     {/* Customer avatar */}
//                     <Image
//                       alt="bilde"
//                       src={customer.image_url}
//                       className="mr-2 rounded-full"
//                       width={28}
//                       height={28}
//                     />
//                     {/* Customer name */}
//                     <p>{customer.customerName}</p>
//                   </div>
//                   {/* Customer email */}
//                   <p className="text-sm text-gray-500">{customer.email}</p>
//                 </div>
//                 {/* Total invoices, pending and paid */}
//                 <div className="flex flex-col">
//                   <p className="text-xs text-gray-700">Total invoices</p>
//                   <p className="text-sm">{customer.total_invoices}</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-xs text-gray-700">Total pending</p>
//                   <p className="text-sm">{customer.total_pending}</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-xs text-gray-700">Total paid</p>
//                   <p className="text-sm">{customer.total_paid}</p>
//                 </div>
//               </div>
//               <div className="flex w-full items-center justify-between pt-4">
//                 {/* Action buttons for update and delete operations */}
//                 <div className="flex justify-end gap-2">
//                   <UpdateCustomer id={customer.id} />
//                   {/* <DeleteInvoice id={customer.id} /> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* Desktop view: table layout */}
//         <table className="hidden min-w-full text-gray-900 md:table">
//           <thead className="rounded-lg text-left text-sm font-normal">
//             {/* Table headers */}
//             <tr>
//               <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-center">
//                 Id
//               </th>
//               <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-center">
//                 Customer
//               </th>
//               <th scope="col" className="px-3 py-5 font-medium text-center">
//                 Email
//               </th>
//               <th scope="col" className="px-3 py-5 font-medium text-center">
//                 Total invoices
//               </th>
//               <th scope="col" className="px-3 py-5 font-medium text-center">
//                 Total pending
//               </th>
//               <th scope="col" className="px-3 py-5 font-medium text-center">
//                 Total paid
//               </th>
//               {/* <th scope="col" className="relative py-3 pl-6 pr-3 text-center">
//                 <span className="sr-only">Edit</span>
//               </th> */}
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {customer.map((customer) => (
//               <tr key={customer.id}>
//                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  ">
//                   {customer.id}
//                 </td>
//                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
//                   <Image
//                     alt=""
//                     src={customer.image_url}
//                     className="rounded-full"
//                     width={28}
//                     height={28}
//                   />
//                   <div>
//                     <p>{customer.customerName}</p>
//                   </div>
//                 </td>
//                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
//                   {customer.email}
//                 </td>
//                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
//                   {customer.total_invoices}
//                 </td>
//                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
//                   {customer.total_pending}
//                 </td>
//                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
//                   {customer.total_paid}
//                 </td>
//                 {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
//                   <UpdateCustomer id={customer.id} />
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>
//     </div>
//   );
// // };

export default CustomerTable;

