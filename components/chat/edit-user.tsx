"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChatMessage, ChatUser } from "@/lib/types";
import { LogOutIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setUser: Dispatch<SetStateAction<ChatUser | null>>;
  setMessages: Dispatch<SetStateAction<Array<ChatMessage>>>;
}

export default function EditUser({ setUser, setMessages }: Props) {
  function handleExit() {
    window.localStorage.removeItem("user");
    setUser(null);
    setMessages([]);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute right-2 top-2 cursor-pointer rounded-md bg-primary p-2 text-primary-foreground shadow-lg transition-all hover:opacity-90">
        <LogOutIcon className="size-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿De verdad quieres salir de la sala?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Saldrás de la sala de chat, y no podrás ver los mensajes, hasta que
            vuelvas a ingresar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleExit}>Salir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
