"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { socket } from "@/lib/socket";
import { ChatUser, SongRequest } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Debe tener al menos 2 caracteres")
    .max(100, "No puede tener mas de 100 caracteres"),
  artist: z
    .string()
    .min(2, "Debe tener al menos 2 caracteres")
    .max(100, "No puede tener mas de 100 caracteres"),
});

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  user: ChatUser | null;
}

export default function RequestSongDialog({ open, setOpen, user }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      artist: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newSongRequest: SongRequest = {
      title: values.title,
      artist: values.artist,
      requestedAt: new Date(),
      user: user ?? null,
    };

    socket.emit("broadcast", {
      channel: `${process.env.NEXT_PUBLIC_SONG_REQUESTS_SOCKET_TOPIC}`,
      message: newSongRequest,
    });

    form.reset();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Solicitar canción</DialogTitle>
          <DialogDescription>
            Llena los datos para solicitar tu canción
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="Escribe el titulo de la canción"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="Escribe el nombre del artista"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Solicitar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
