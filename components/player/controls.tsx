import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import PlayButton from "./play-button";

interface Props {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  volume: number;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export default function Controls({
  audioRef,
  volume,
  isPlaying,
  setIsPlaying,
}: Props) {
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  return (
    <div className="mt-10 flex w-full items-center justify-center">
      <PlayButton
        isPlaying={isPlaying}
        onClick={togglePlayPause}
      />
    </div>
  );
}
