"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { socket } from "@/lib/socket";
import { ChatMessage, ChatUser } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import EditUser from "./edit-user";
import MessageForm from "./message-form";
import MessageItem from "./message-item";
import UserForm from "./user-form";

export default function Chat() {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [user, setUser] = useState<ChatUser | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentUser = JSON.parse(
      window.localStorage.getItem("user") ?? "",
    ) as ChatUser;

    setUser(currentUser);

    function onConnect() {
      socket.emit("subscribe", `${process.env.NEXT_PUBLIC_CHAT_SOCKET_TOPIC}`);
    }

    function onDisconnect() {
      socket.emit(
        "unsubscribe",
        `${process.env.NEXT_PUBLIC_CHAT_SOCKET_TOPIC}`,
      );
    }

    function onMessage(message: ChatMessage) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(`${process.env.NEXT_PUBLIC_CHAT_SOCKET_TOPIC}`, onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(`${process.env.NEXT_PUBLIC_CHAT_SOCKET_TOPIC}`, onMessage);
    };
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("broadcast", {
        channel: `${process.env.NEXT_PUBLIC_CHAT_SOCKET_TOPIC}`,
        message: {
          body: `${user.name} se ha unido a la sala.`,
          time: new Intl.DateTimeFormat("es-MX", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(new Date()),
          user,
          type: "system",
        },
      });
    }
  }, [user]);

  useEffect(() => {
    if (messages.length > 1) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages.length]);

  return (
    <div className="relative flex max-h-[320px] w-full flex-col justify-between overflow-hidden rounded-md border lg:h-auto">
      <ScrollArea className="h-[262px] w-full">
        <ul className="space-y-4 p-2">
          {messages.map((msg, index) => (
            <MessageItem
              user={user}
              message={msg}
              key={index}
            />
          ))}
          <div ref={ref} />
        </ul>
      </ScrollArea>
      <MessageForm
        socket={socket}
        user={user}
      />
      <UserForm
        user={user}
        setUser={setUser}
        socket={socket}
      />
      {user && (
        <EditUser
          setUser={setUser}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}
