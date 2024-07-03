import { Dispatch, SetStateAction } from "react";
import PlayButton from "./play-button";

interface Props {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setStream: Dispatch<SetStateAction<Howl | null>>;
}

export default function Controls({
  isPlaying,
  setIsPlaying,
  setStream,
}: Props) {
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="flex h-full w-full items-center justify-center lg:w-1/3">
      <PlayButton
        isPlaying={isPlaying}
        onClick={togglePlayPause}
      />
    </div>
  );
}
