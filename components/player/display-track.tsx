import { Track } from "@/lib/types";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface Props {
  isPlaying: boolean;
  track: Track;
}

export default function DisplayTrack({ isPlaying, track }: Props) {
  return (
    <div className="relative h-full w-full">
      <Badge
        variant={isPlaying ? "destructive" : "secondary"}
        className="absolute left-2 top-2 z-40 transition-all duration-500 lg:hidden"
      >
        {isPlaying ? "EN VIVO" : "PAUSADO"}
      </Badge>
      <Image
        src="/vinyl.webp"
        alt="Disco de vinilo"
        width={312}
        height={312}
        priority
        className={`absolute left-0 right-0 top-0 mx-auto h-[312px] w-[312px] rounded-full drop-shadow-2xl transition-all dark:bg-secondary ${isPlaying ? "animate-spin-slow lg:-right-28" : "lg:-right-0"}`}
      />
      <div
        className={`relative mx-auto grid h-[312px] w-[312px] items-end overflow-hidden rounded-lg border-4 border-primary bg-secondary opacity-0 shadow-lg transition-all lg:opacity-100 ${isPlaying ? "scale-0 lg:-translate-x-7 lg:scale-100 xl:-translate-x-14" : "scale-100 lg:translate-x-0"}`}
      >
        <Badge
          variant={isPlaying ? "destructive" : "secondary"}
          className="absolute left-2 top-2 z-40 hidden transition-all duration-500 lg:block"
        >
          {isPlaying ? "EN VIVO" : "PAUSADO"}
        </Badge>
        <Image
          src={track.track_image || "/cover.jpg"}
          alt={`Portada de ${track.track_title}`}
          width={120}
          height={120}
          priority
          className="h-[312px] w-full select-none object-cover"
        />
      </div>
    </div>
  );
}
