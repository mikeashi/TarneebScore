import {
  usePlayerStore,
  useBidsStore,
  useButtonStore,
  PLAYERS_NUMBER,
} from "@/lib/gameState";
import { cn } from "@/lib/utils";


export function TableButton() {
  const buttonLocation = useButtonStore((state) => state.button);
  const players = usePlayerStore((state) => state.players);
    const buttonStyles = [
      "bottom-8 left-1/2 transform -translate-x-1/2 translate-y-full",
      "top-1/2 right-8 transform translate-x-full -translate-y-1/2",
      "top-0 left-1/2 transform -translate-x-1/2 translate-y-full",
      "left-8 top-1/2 transform -translate-x-full -translate-y-1/2",
    ];
    return (
      <div
        className={cn(
          "absolute rounded-full bg-red-600 h-4 w-4",
          buttonStyles[buttonLocation],
          players.length < 2 && "hidden"
        )}
      ></div>
    );
}
