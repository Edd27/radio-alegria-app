import { PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  onClick?: () => void;
  isPlaying: boolean;
  [key: string]: any;
}

export default function PlayButton({
  onClick = () => {},
  isPlaying,
  ...props
}: Props) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="w-full"
      variant="default"
      {...props}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </Button>
  );
}
