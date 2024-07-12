"use client";

import { Track } from "@/lib/types";
import { Howl } from "howler";
import { useEffect, useState } from "react";
import Chat from "../chat";
import Controls from "./controls";
import DisplayTrack from "./display-track";
import Playlist from "./playlist";
import Volume from "./volume";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [stream, setStream] = useState<Howl | null>(null);
  const [track, setTrack] = useState<Track>({
    track_artist: "Radio Alegría",
    track_played: new Date().getTime(),
    track_image: "/cover.jpg",
    track_title: "Radio Alegría",
  });

  useEffect(() => {
    const howl = new Howl({
      src: [process.env.NEXT_PUBLIC_STREAM_URL ?? ""],
      html5: true,
      format: ["mp3", "aac"],
    });

    setStream(howl);

    return () => {
      howl.unload();
    };
  }, []);

  useEffect(() => {
    stream?.volume(volume / 100);
  }, [volume, stream]);

  useEffect(() => {
    if (isPlaying) {
      stream?.unload();
      stream?.play();
    } else {
      stream?.unload();
    }
  }, [isPlaying, stream]);

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4 lg:grid-cols-2">
      <div className="flex max-h-[320px] w-full items-center justify-center">
        <DisplayTrack
          isPlaying={isPlaying}
          track={track}
        />
      </div>
      <div className="h-fit w-full overflow-hidden lg:h-[320px]">
        <div className="mb-4 flex w-full items-center gap-4">
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setStream={setStream}
          />
          <Volume
            volume={volume}
            setVolume={setVolume}
          />
        </div>
        <Playlist
          setTrack={setTrack}
          track={track}
          isPlaying={isPlaying}
        />
      </div>
      <Chat />
    </div>
  );
}
