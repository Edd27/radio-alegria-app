import { Track } from "@/lib/types";
import Image from "next/image";

interface Props {
  isPlaying: boolean;
  track: Track;
}

export default function DisplayTrack({ isPlaying, track }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border bg-secondary lg:max-w-xs lg:overflow-visible lg:border-none">
      <div
        className={`absolute left-2 top-2 flex items-center gap-1 rounded-md border bg-foreground px-2 py-1 text-xs font-semibold transition-all duration-500 lg:hidden`}
      >
        <div
          className={`h-2 w-2 rounded-full ${isPlaying ? "bg-red-500" : "bg-secondary/35"}`}
        ></div>
        <span className={`text-secondary`}>
          {isPlaying ? "En vivo" : "Pausado"}
        </span>
      </div>
      <Image
        src="/vinyl.webp"
        alt="Disco de vinilo"
        width={200}
        height={200}
        priority
        className={`absolute left-0 right-0 top-0 mx-auto w-full max-w-xs drop-shadow-2xl transition-all ${isPlaying ? "animate-spin-slow lg:-right-28" : "lg:-right-0"}`}
      />
      <div
        className={`relative mx-auto grid h-full min-h-[312px] max-w-xs items-end overflow-hidden rounded-lg border-4 border-primary bg-secondary opacity-0 shadow-lg transition-all lg:opacity-100 ${isPlaying ? "scale-0 lg:-translate-x-7 lg:scale-100 xl:-translate-x-14" : "scale-100 lg:translate-x-0"}`}
      >
        <div
          className={`absolute left-2 top-2 flex items-center gap-1 rounded-md bg-foreground px-2 py-1 text-xs font-semibold transition-all duration-500`}
        >
          <div
            className={`h-2 w-2 rounded-full ${isPlaying ? "bg-red-500" : "bg-secondary/35"}`}
          ></div>
          <span className={`text-secondary`}>
            {isPlaying ? "En vivo" : "Pausado"}
          </span>
        </div>
        <Image
          src={track.track_image || "/cover.jpg"}
          alt={`Portada de ${track.track_title}`}
          width={200}
          height={200}
          priority
          className="h-full w-full select-none overflow-clip bg-clip-content object-cover object-center"
        />
      </div>
    </div>
  );
}
