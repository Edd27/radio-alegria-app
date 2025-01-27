import { usePlaylist } from "@/hooks/usePlaylist";
import { Track } from "@/lib/types";
import { calculateTimeAgo } from "@/lib/utils";
import { RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { clearIntervalAsync, setIntervalAsync } from "set-interval-async";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  track: Track;
  setTrack: Dispatch<SetStateAction<Track>>;
  isPlaying: boolean;
}

export default function Playlist({ track, setTrack, isPlaying }: Props) {
  const { playlist, isLoading, isError, getPlaylist } = usePlaylist();

  const handleRefresh = async () => {
    await getPlaylist();
  };

  useEffect(() => {
    if (playlist.length > 0) {
      setTrack(playlist[0]);
    }
  }, [setTrack, playlist]);

  useEffect(() => {
    const interval = setIntervalAsync(handleRefresh, 90000);

    return () => {
      clearIntervalAsync(interval);
    };
  });

  return (
    <div className="h-fit w-full overflow-hidden rounded-md border">
      <header className="flex items-center justify-between bg-muted p-2">
        <h2 className="lg:text-normal text-sm font-semibold opacity-70">
          Ultimas reproducciones
        </h2>
        <button
          type="button"
          disabled={isLoading}
          onClick={handleRefresh}
          className={`opacity-70 ${isLoading ? "text-secondary" : "text-primary"} duration-500 hover:rotate-180`}
        >
          <RefreshCwIcon className="size-5 lg:size-6" />
        </button>
      </header>
      <ScrollArea className="h-[240px] w-full p-2 transition-all">
        {isError ? (
          <h2 className="text-center">
            Ocurrió un error al obtener la lista de reproducción
          </h2>
        ) : (
          <ul>
            {playlist.map((song, index) => (
              <li
                key={index}
                className={`flex gap-2 rounded-lg p-2 ${track.track_title === song.track_title && track.track_artist === song.track_artist ? "bg-primary text-secondary" : ""}`}
              >
                <Image
                  src={song.track_image || "/cover.jpg"}
                  alt={`Portada de ${song.track_title}`}
                  width={200}
                  height={200}
                  className="h-14 w-14 rounded-md"
                />
                <section className="relative w-full">
                  <div>
                    <h2 className="text-sm font-semibold">
                      {song.track_title}
                    </h2>
                    <p className="text-xs">{song.track_artist}</p>
                  </div>
                  <time className="text-xs">
                    {track.track_title === song.track_title &&
                    track.track_artist === song.track_artist &&
                    isPlaying
                      ? "Reproduciendo"
                      : calculateTimeAgo(song.track_played)}
                  </time>
                </section>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
}
