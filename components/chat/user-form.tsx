"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChatUser } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Debe tener al menos 2 caracteres")
    .max(20, "No puede tener mas de 20 caracteres"),
});

interface Props {
  user: ChatUser | null;
  setUser: Dispatch<SetStateAction<ChatUser | null>>;
  socket: Socket;
}

export default function UserForm({ user, setUser }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    window.localStorage.removeItem("user");

    const newUser = {
      name: values.name,
      active: true,
      id: uuidv4(),
    };

    window.localStorage.setItem("user", JSON.stringify(newUser));

    setUser(newUser);

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`absolute flex h-full w-full flex-col items-center justify-center gap-2 rounded-md p-4 backdrop-blur-sm backdrop-brightness-95 transition-all lg:p-10 ${user ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  className="text-base"
                  placeholder="Escribe tu nombre"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Ingresa tu nombre para acceder a la sala.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full max-w-xs"
        >
          Aceptar
        </Button>
      </form>
    </Form>
  );
}
