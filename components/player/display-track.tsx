import Image from "next/image";
import { MutableRefObject } from "react";

interface Props {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
}

export default function DisplayTrack({ audioRef, isPlaying }: Props) {
  return (
    <div className="relative bg-transparent">
      <div
        className={`absolute top-0 h-[200px] w-[200px] animate-spin-slow bg-[url('/vinyl.webp')] bg-cover transition-all ${isPlaying ? "-right-14" : "-right-0"}`}
      ></div>
      <div
        className={`relative grid items-end overflow-hidden rounded-lg bg-transparent shadow-2xl transition-all ${isPlaying ? "-translate-x-10" : "translate-x-0"}`}
      >
        <span
          className={`absolute left-2 top-2 rounded-md px-2 py-1 text-xs font-semibold text-white transition-all duration-500 ${isPlaying ? "bg-red-500" : "bg-gray-500"}`}
        >
          {isPlaying ? "En vivo" : "Pausado"}
        </span>
        <Image
          src="/cover.jpg"
          alt="Portada de Radio Alegria"
          width={200}
          height={200}
          priority
          className="h-[200px] w-[200px] select-none overflow-clip bg-clip-content object-cover object-center"
        />
      </div>
      <audio
        src={process.env.NEXT_PUBLIC_STREAM_URL}
        ref={audioRef}
      />
    </div>
  );
}
