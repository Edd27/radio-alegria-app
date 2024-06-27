"use client";

import { Howl } from "howler";
import { useEffect, useState } from "react";
import Controls from "./controls";
import DisplayTrack from "./display-track";
import Volume from "./volume";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [stream, setStream] = useState<Howl | null>(null);

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
    <div className="mx-auto max-w-[200px]">
      <DisplayTrack isPlaying={isPlaying} />
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
  );
}
