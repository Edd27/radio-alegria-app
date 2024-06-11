import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 lg:px-32 xl:px-64">
      <header className="fixed left-0 top-0 flex w-full items-center justify-between gap-3 bg-background p-4 lg:px-32 xl:px-64">
        <h1 className="text-xl font-bold">Next App</h1>
        <nav className="flex items-center gap-3">
          <Button variant="outline">
            <Link href={session?.user ? "/dashboard" : "/auth/login"}>
              {session?.user ? "Dashboard" : "Login"}
            </Link>
          </Button>
          <ModeToggle
            type="button"
            icons={true}
          />
        </nav>
      </header>
      <section>
        <h2>Home page</h2>
      </section>
    </div>
  );
}
