import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import Logo from "@/app/ui/logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function SideNav() {
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* Link for logoen, som sender deg til dashboard hjemmesiden når den blir klikket */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/dashboard"
      >
        <div className="w-32 text-white md:w-40">
          {/* Logoen */}
          <Logo />
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* Viser tre bokser med linker til forskjellige sider som er angitt i "nav-links.tsx" */}
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100  md:block"></div>

        <div className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100 text-black p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <form action={signOut}>
            <button>Sign Out</button>
          </form>
        </div>
      </div>
    </div>
  );
}
