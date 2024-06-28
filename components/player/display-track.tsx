import { Track } from "@/lib/types";
import Image from "next/image";

interface Props {
  isPlaying: boolean;
  track: Track;
}

export default function DisplayTrack({ isPlaying, track }: Props) {
  return (
    <div className="relative bg-transparent">
      <div
        className={`absolute top-0 h-full w-full animate-spin-slow bg-[url('/vinyl.webp')] bg-cover transition-all ${isPlaying ? "lg:-right-1/4" : "lg:-right-0"}`}
      ></div>
      <div
        className={`relative grid items-end overflow-hidden rounded-lg bg-transparent shadow-2xl transition-all ${isPlaying ? "scale-0 lg:-translate-x-1/4 lg:scale-100" : "scale-100 lg:translate-x-0"}`}
      >
        <div
          className={`absolute left-2 top-2 flex items-center gap-1 rounded-md border bg-foreground px-2 py-1 text-xs font-semibold text-white transition-all duration-500`}
        >
          <div
            className={`h-2 w-2 rounded-full ${isPlaying ? "bg-red-500" : "bg-secondary"}`}
          ></div>
          <span>{isPlaying ? "En vivo" : "Pausado"}</span>
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
