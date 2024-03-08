"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Kart over lenker som skal vises i sidenavigasjonen.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  // Hook to get the current pathname
  const pathname = usePathname();

  return (
    <>
      {/* Map through each link and create a nav item */}
      {links.map((link) => {
        // Get the icon component for the current link
        const LinkIcon = link.icon;

        return (
          <Link
            // Unique key for each link
            key={link.name}
            // URL the link points to
            href={link.href}
            // Dynamic classNames for styling based on the current pathname
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-blue-200 text-black": pathname === link.href,
              }
            )}
          >
            {/* Link icon */}
            <LinkIcon className="w-6" />
            {/* Link name, hidden on smaller screens */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
