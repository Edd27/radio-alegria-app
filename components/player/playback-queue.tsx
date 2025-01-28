"use client";

import { socket } from "@/lib/socket";
import { ChatUser, SongRequest } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import RequestSongDialog from "./request-song-dialog";

interface Props {
  user: ChatUser | null;
}

export default function PlaybackQueue({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [songRequests, setSongRequests] = useState<Array<SongRequest>>([]);

  useEffect(() => {
    function onConnect() {
      socket.emit(
        "subscribe",
        `${process.env.NEXT_PUBLIC_SONG_REQUESTS_SOCKET_TOPIC}`,
      );
    }

    function onDisconnect() {
      socket.emit(
        "unsubscribe",
        `${process.env.NEXT_PUBLIC_SONG_REQUESTS_SOCKET_TOPIC}`,
      );
    }

    function onSongRequest(songRequest: SongRequest) {
      setSongRequests((prevSongRequests) => {
        const newSongRequests = [...prevSongRequests, songRequest];
        window.localStorage.setItem(
          "songRequests",
          JSON.stringify(newSongRequests),
        );
        return newSongRequests;
      });
    }

    if (socket.connected) {
      onConnect();
    }

    const currentSongRequests = window.localStorage.getItem("songRequests")
      ? JSON.parse(window.localStorage.getItem("songRequests") || "[]")
      : [];

    setSongRequests(currentSongRequests);

    const newSongRequests = currentSongRequests.filter(
      (songRequest: SongRequest) =>
        new Date(songRequest.requestedAt).getTime() + 86400000 >
        new Date().getTime(),
    );

    if (newSongRequests.length !== currentSongRequests.length) {
      window.localStorage.setItem(
        "songRequests",
        JSON.stringify(newSongRequests),
      );
      setSongRequests(newSongRequests);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(
      `${process.env.NEXT_PUBLIC_SONG_REQUESTS_SOCKET_TOPIC}`,
      onSongRequest,
    );

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(
        `${process.env.NEXT_PUBLIC_SONG_REQUESTS_SOCKET_TOPIC}`,
        onSongRequest,
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-md border">
      <header className="flex items-center justify-between bg-muted p-2">
        <h2 className="lg:text-normal text-sm font-semibold opacity-70">
          Canciones solicitadas
        </h2>
        {user && <Button onClick={() => setOpen(true)}>Solicitar</Button>}
        <RequestSongDialog
          open={open}
          setOpen={setOpen}
          user={user}
        />
      </header>
      <ScrollArea className="relative h-full w-full">
        <>
          <div
            className={`absolute z-10 flex h-full w-full items-center justify-center p-4 backdrop-blur-sm backdrop-brightness-95 transition-all ${user ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
          >
            <h3 className="text-center text-xl font-bold text-primary">
              Para poder ver y solicitar una canción, ingresa primero al chat
            </h3>
          </div>
          <ul>
            {songRequests.map((song, index) => (
              <li
                key={index}
                className="rounded-lg p-2"
              >
                <p>
                  <span className="font-semibold text-primary">
                    {user?.name}
                  </span>{" "}
                  solicita{" "}
                  <span className="font-bold">{`"${song.title}"`}</span> de{" "}
                  <span className="font-bold text-primary opacity-70">
                    {song.artist}
                  </span>
                </p>
                {song.requestedAt && (
                  <time className="mt-1 text-xs font-normal text-black/80 opacity-70 dark:text-white/80">
                    {new Intl.DateTimeFormat("es-MX", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }).format(new Date(song.requestedAt))}
                  </time>
                )}
              </li>
            ))}
          </ul>
        </>
      </ScrollArea>
    </div>
  );
}
