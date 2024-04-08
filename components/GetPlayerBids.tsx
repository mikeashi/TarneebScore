import {
  useRoundStore,
  usePlayerStore,
  useButtonStore,
  useBidsStore,
  PLAYERS_NUMBER,
} from "@/lib/gameState";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export function GetPLayerBids() {
  const roundStarted = useRoundStore((state) => state.started);
  const buttonLocation = useButtonStore((state) => state.button);
  const players = usePlayerStore((state) => state.players);
  const roundButton = useRoundStore((state) => state.roundButton);
  const moveRoundButton = useRoundStore((state) => state.moveRoundButton);
  const setRoundButton = useRoundStore((state) => state.setRoundButton);
  const getCurrentScore = useBidsStore((state) => state.getPlayerScore);
  const roundBids = useRoundStore((state) => state.bids);
  const setBid = useRoundStore((state) => state.addBid);
  const t = useTranslations("GetPLayerBids");
  const [allPlayerHaveBids, setAllPlayerHaveBids] = useState(false);
  const [canStartRound, setCanStartRound] = useState(false);
  const resetRound = useRoundStore((state) => state.endRound);
  const startRound = useRoundStore((state) => state.startRound);
  const { toast } = useToast();

  const getLegalBids = (index: number): number[] => {
    const currentScore = getCurrentScore(index);
    let legalBids = [3, 4, 5, 6, 14];
    if (currentScore < 30) {
      legalBids = [2, ...legalBids];
    }
    return legalBids;
  };

  const handleSetBid = (bid: number) => {
    setBid(bid, roundButton);
    moveRoundButton();
  };

  useEffect(() => {
    resetRound();
    setRoundButton(buttonLocation);
  }, [buttonLocation]);

  useEffect(() => {
    setAllPlayerHaveBids(roundBids.every((bid) => bid !== 0));
    setCanStartRound(roundBids.reduce((acc, bid) => acc + bid, 0) >= 11);
  }, [roundBids]);


  const handleStartRound = () => {
    if (!canStartRound) {
      toast({
        variant: "destructive",
        title: t("cannotStartRound"),
        description: t("cannotStartRoundDescription"),
      });
      return;
    }
    startRound();
  };


  if (roundStarted) return;
  if (players.length < PLAYERS_NUMBER) return;

   

  return (
    <div className="w-full">
      <h1 className="w-full text-center my-4">
        {t("enterBidFor")} {players[roundButton]}
      </h1>
      <div className="grid grid-cols-2 w-full gap-4">
        {getLegalBids(roundButton).map((bid) => (
          <Button key={bid} onClick={() => handleSetBid(bid)}>
            {bid}
          </Button>
        ))}
      </div>
      <Button
        className={cn("w-full my-4", allPlayerHaveBids ? "block" : "hidden")}
        variant="blue"
        onClick={handleStartRound}
      >
        {t("startRound")}
      </Button>
    </div>
  );
}
