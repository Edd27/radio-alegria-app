"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChatUser } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";
import { z } from "zod";

const formSchema = z.object({
  message: z
    .string()
    .min(2, "Debe tener al menos 2 caracteres")
    .max(100, "No puede tener mas de 100 caracteres"),
});

interface Props {
  socket: Socket;
  user: ChatUser | null;
}

export default function MessageForm({ socket, user }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    socket.emit("broadcast", {
      channel: `${process.env.NEXT_PUBLIC_CHAT_SOCKET_TOPIC}`,
      message: {
        body: values.message,
        time: new Intl.DateTimeFormat("es-MX", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date()),
        user: user ?? null,
        type: "user",
      },
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-2 p-2"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="text-base"
                  placeholder="Escribe tu mensaje"
                  disabled={!user}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!user}
        >
          <SendIcon />
        </Button>
      </form>
    </Form>
  );
}
