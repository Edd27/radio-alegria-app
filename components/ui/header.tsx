"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@/lib/definitions";
import { LayoutGrid, LogOut, MenuIcon, UserRound } from "lucide-react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { links } from "./links";
import { ModeToggle } from "./mode-toggle";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

function Menu() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const currentUser = session?.user as User;

  return (
    <>
      <div className="hidden lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  currentUser?.avatar ||
                  `https://ui-avatars.com/api/?name=${`${currentUser?.name} ${currentUser?.surname}`.trim().replaceAll(" ", "+")}`
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 min-w-[200px] font-semibold">
            <DropdownMenuLabel className="flex flex-col">
              {`${currentUser?.name} ${currentUser?.surname}`.trim()}
              <small className="opacity-70">{currentUser?.email}</small>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/profile"
                className="flex cursor-pointer items-center gap-2"
              >
                <UserRound className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <ModeToggle type="submenu" />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => await signOut({ callbackUrl: "/" })}
              className="flex cursor-pointer items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent className="rounded-s-lg p-0">
            <SheetHeader className="p-4">
              <SheetTitle className="flex items-center gap-2 text-left">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      currentUser?.avatar ||
                      `https://ui-avatars.com/api/?name=${`${currentUser?.name} ${currentUser?.surname}`.trim().replaceAll(" ", "+")}`
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-sm">
                    {`${currentUser?.name} ${currentUser?.surname}`.trim()}
                  </h2>
                  <small className="text-xs opacity-70">
                    {currentUser?.email}
                  </small>
                </div>
              </SheetTitle>
            </SheetHeader>
            <section className="mt-4 flex flex-col gap-3 p-2">
              <ScrollArea className="max-h-[calc(100vh-460px)]">
                {links?.map((link) => (
                  <SheetClose
                    asChild
                    key={link.id}
                  >
                    <Button
                      asChild
                      variant="ghost"
                      className={`w-full justify-start ${pathname === link.href ? "bg-secondary" : "bg-inherit"}`}
                    >
                      <Link
                        href={link.href}
                        className="gap-2 font-semibold"
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    </Button>
                  </SheetClose>
                ))}
              </ScrollArea>
              <Separator />
              <ul>
                <li>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`w-full justify-start ${pathname === "/dashboard/profile" ? "bg-secondary" : "bg-inherit"}`}
                    >
                      <Link
                        href="/dashboard/profile"
                        className="gap-2 font-semibold"
                      >
                        <UserRound />
                        <span>Profile</span>
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
                <li>
                  <ModeToggle type="collapsible" />
                </li>
                <li>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="w-full cursor-pointer justify-start gap-2 font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={async () => await signOut({ callbackUrl: "/" })}
                    >
                      <LogOut />
                      <span>Logout</span>
                    </Button>
                  </SheetClose>
                </li>
              </ul>
            </section>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default function Header() {
  return (
    <SessionProvider>
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between bg-background p-4 shadow backdrop-blur lg:left-64 lg:justify-end">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold uppercase lg:hidden"
        >
          <LayoutGrid />
          <span className="hidden sm:block">Next App</span>
        </Link>
        <section className="flex items-center gap-4">
          <Menu />
        </section>
      </header>
    </SessionProvider>
  );
}
