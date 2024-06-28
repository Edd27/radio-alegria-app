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
    track_artist: "Radio Alegria",
    track_played: new Date().getTime(),
    track_image: "/cover.jpg",
    track_title: "Radio Alegria",
  });

  useEffect(() => {
    const howl = new Howl({
      src: [process.env.NEXT_PUBLIC_STREAM_URL ?? ""],
      html5: true,
      format: ["mp3", "aac"],
    });

    setStream(howl);
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
    <div className="mx-auto w-full">
      <DisplayTrack
        isPlaying={isPlaying}
        track={track}
      />
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setStream={setStream}
      />
      <Volume
        volume={volume}
        setVolume={setVolume}
      />
      <Playlist
        setTrack={setTrack}
        track={track}
        isPlaying={isPlaying}
      />
    </div>
  );
}
