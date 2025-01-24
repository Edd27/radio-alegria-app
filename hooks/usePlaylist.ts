import { Track } from "@/lib/types";
import { useEffect, useState } from "react";

export function usePlaylist() {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPlaylist = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STREAM_API}/playlist/15/alegria`,
    );
    if (!res.ok) {
      setIsError(true);
      return;
    }

    const data = (await res.json()) as { success: boolean; result: Track[] };

    if (!data.success) {
      setIsError(true);
      setPlaylist([]);
    }

    setIsError(false);
    setPlaylist(
      data.result.sort(({ track_played: a }, { track_played: b }) => b - a),
    );

    setIsLoading(false);
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return {
    playlist,
    isLoading,
    isError,
    getPlaylist,
  };
}
