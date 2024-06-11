import LoginForm from "@/components/login/form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-sm flex-col items-center p-4 lg:justify-center">
      <article className="mb-10 flex w-full flex-col items-center justify-center space-y-2 text-center">
        <div className="flex items-center gap-1">
          <h1 className="text-2xl font-bold uppercase">Next App</h1>
        </div>
        <h2 className="text-xl font-semibold">Login to your account</h2>
      </article>
      <LoginForm />
    </section>
  );
}
