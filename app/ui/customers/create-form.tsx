// 'use client';

// import { CustomerField } from '@/app/lib/definitions';
// import Link from 'next/link';
// import {
//   CheckIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';
// import { Button } from '@/app/ui/button';
// import { createCustomer } from '@/app/lib/actions';
// import { useFormState } from 'react-dom';

// export default function Form() {
//   const initialState = { message: '', errors: {} };
//   const [state, dispatch] = useFormState(createCustomer, initialState);

//   return (
//     <form action={dispatch}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">

//         {/* Customer Name */}
//         <div className="mb-4">
//           <label htmlFor="customerName" className="mb-2 block text-sm font-medium">
//             Customer Name
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <input
//               id="customerName"
//               name="customerName"
//               type="text"
//               required
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               placeholder="Enter customer name"
//             />
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Customer Image */}
//         <div className="mb-4">
//           <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
//             Customer Image
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <input
//               id="image_url"
//               name="image_url"
//               type="text"
//               required
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               placeholder="Enter customer image URL"
//             />
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Customer Mail */}
//         <div className="mb-4">
//           <label htmlFor="email" className="mb-2 block text-sm font-medium">
//             Customer Mail
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               placeholder="Enter customer mail address"
//             />
//             <CheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/customers"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Create Customer</Button>
//       </div>
//     </form>
//   );
// }


