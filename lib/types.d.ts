export type Track = {
  track_artist: string | null;
  track_image: string | null;
  track_played: number;
  track_title: string | null;
};

export type ChatUser = {
  id: string;
  active: boolean;
  name: string;
};

export type ChatMessage = {
  body: string;
  time: string | null;
  user: ChatUser | null;
  type: "user" | "system";
};
