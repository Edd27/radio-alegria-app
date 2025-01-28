"use client";

import { ChatUser } from "@/lib/types";
import { useState } from "react";
import Chat from "../chat";
import PlaybackQueue from "../player/playback-queue";

export default function UserInteraction() {
  const [user, setUser] = useState<ChatUser | null>(null);
  return (
    <div className="grid h-full max-h-[754px] w-full grid-rows-[1fr,1fr] gap-4 overflow-hidden">
      <Chat
        user={user}
        setUser={setUser}
      />
      <PlaybackQueue user={user} />
    </div>
  );
}
