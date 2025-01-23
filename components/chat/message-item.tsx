"use client";

import { ChatMessage, ChatUser } from "@/lib/types";

interface Props {
  message: ChatMessage;
  user: ChatUser | null;
}

export default function MessageItem({ message, user }: Props) {
  const { type, time, body } = message;
  const isMessageOfCurrentUser = message.user?.id === user?.id;

  return (
    <div
      className={`flex w-full items-start gap-2.5 ${
        type === "system"
          ? "justify-center"
          : isMessageOfCurrentUser
            ? "justify-end"
            : "justify-start"
      }`}
    >
      <article
        className={`leading-1.5 flex flex-col ${
          isMessageOfCurrentUser
            ? "rounded-s-xl rounded-ee-xl"
            : "rounded-e-xl rounded-es-xl"
        } ${type === "user" ? "w-fit min-w-[140px] max-w-xs border border-white/10 bg-black/5 p-2 shadow dark:bg-white/5" : "w-full text-center"}`}
      >
        {message.user && type === "user" && (
          <small className="font-semibold text-primary/75">
            {message.user.name}
          </small>
        )}
        <p
          className={`text-pretty font-normal text-black/80 dark:text-white/80 ${type === "user" ? "text-sm" : "text-xs"}`}
        >
          {type === "system" &&
          message.user?.id === user?.id &&
          body.includes("a la sala.")
            ? "Te has unido a la sala"
            : body}
        </p>
        {time && (
          <time
            className={`mt-1 text-xs font-normal text-black/80 opacity-70 dark:text-white/80 ${type === "user" ? "text-end" : "text-center"}`}
          >
            {time}
          </time>
        )}
      </article>
    </div>
  );
}
