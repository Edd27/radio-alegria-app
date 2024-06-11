import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { metadata } from "@/app/layout";
import { User } from "@/lib/definitions";
import { LayoutGrid } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { links } from "./links";
import SidebarMenu from "./sidebar-menu";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);

  const currentUser = session?.user as User;

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 overflow-hidden bg-background shadow lg:block">
      <header className="flex h-16 items-center gap-2 px-8">
        <LayoutGrid />
        <Link
          href="/"
          className="text-xl font-bold uppercase"
        >
          {(metadata.title as string) || "App"}
        </Link>
      </header>
      <SidebarMenu
        links={links}
        currentUser={currentUser}
      />
    </aside>
  );
}
