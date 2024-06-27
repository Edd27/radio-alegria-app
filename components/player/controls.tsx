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
    <div className="mt-10 flex w-full items-center justify-center">
      <PlayButton
        isPlaying={isPlaying}
        onClick={togglePlayPause}
      />
    </div>
  );
}
