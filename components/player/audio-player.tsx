"use client";

import { Track } from "@/lib/types";
import { Howl } from "howler";
import { useEffect, useState } from "react";
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
    <div className="grid h-fit w-full gap-6 lg:w-[424px] lg:min-w-[424px]">
      <div className="grid w-full gap-4 overflow-hidden">
        <DisplayTrack
          isPlaying={isPlaying}
          track={track}
        />
        <div className="overflow-hidden">
          <h2 className="truncate text-2xl font-bold">{track.track_title}</h2>
          <p className="font-semibold opacity-70">{track.track_artist}</p>
        </div>
      </div>
      <div className="flex w-full items-center gap-4">
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
  );
}
