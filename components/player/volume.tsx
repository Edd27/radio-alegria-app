"use client";

import { Volume1Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Slider } from "../ui/slider";

interface Props {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}

export default function Volume({ volume, setVolume }: Props) {
  const decrementVolume = () => {
    setVolume((prev) => (prev === 0 ? prev : prev - 1));
  };

  function handleVolumeChange(e: number[]) {
    setVolume(e[0]);
  }

  return (
    <div className="hidden h-full w-full items-center gap-2 lg:flex">
      <button onClick={decrementVolume}>
        <Volume1Icon className="size-5" />
      </button>
      <Slider
        defaultValue={[volume]}
        value={[volume]}
        max={100}
        min={0}
        step={1}
        onValueChange={handleVolumeChange}
        className="cursor-pointer"
      />
    </div>
  );
}
