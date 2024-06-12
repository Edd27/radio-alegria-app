"use client";

import { useRef, useState } from "react";
import Controls from "./controls";
import DisplayTrack from "./display-track";
import Volume from "./volume";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="mx-auto max-w-[200px]">
      <DisplayTrack
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
      <Controls
        audioRef={audioRef}
        volume={volume}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Volume
        volume={volume}
        setVolume={setVolume}
      />
    </div>
  );
}
