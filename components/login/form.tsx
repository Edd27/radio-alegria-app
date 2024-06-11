"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().min(3, "Email or username is required."),
  password: z
    .string({ required_error: "The password is required" })
    .min(1, "The password is required"),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!response?.ok) {
      setIsLoading(false);

      if (response?.error === "CredentialsSignin") {
        toast({
          title: "Incorrect credentials",
          description: "Verify your credentials and try again",
          variant: "destructive",
        });

        return;
      }

      if (response?.error === "AccessDenied") {
        return toast({
          title: "Forbidden",
          description: "You don't have permission to access this resource",
          variant: "destructive",
        });
      }

      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }

    setIsLoading(false);

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <section className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="me@example.com or jdoe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      type={passwordVisible ? "text" : "password"}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                    >
                      {passwordVisible ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Validating..." : "Login"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
