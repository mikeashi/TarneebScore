import {
  useRoundStore,
  usePlayerStore,
  useButtonStore,
  PLAYERS_NUMBER,
  useBidsStore,
} from "@/lib/gameState";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export function GetPlayerResults() {
  const roundStarted = useRoundStore((state) => state.started);
  const buttonLocation = useButtonStore((state) => state.button);
  const players = usePlayerStore((state) => state.players);
  const roundButton = useRoundStore((state) => state.roundButton);
  const moveRoundButton = useRoundStore((state) => state.moveRoundButton);
  const setRoundButton = useRoundStore((state) => state.setRoundButton);
  const roundBids = useRoundStore((state) => state.bids);
  const t = useTranslations("GetPLayerBids");
  const [allPlayerHaveResults, setAllPlayerHaveResults] = useState(false);
  const resetRound = useRoundStore((state) => state.restartRound);
  const roundEnded = useRoundStore((state) => state.ended);
  const endRound = useRoundStore((state) => state.endRound);
  const roundResults = useRoundStore((state) => state.results);
  const setResults = useRoundStore((state) => state.addResult);
  const logBid = useBidsStore((state) => state.logBid);
  const moveButton = useButtonStore((state) => state.moveButton);


  useEffect(() => {
    resetRound();
    setRoundButton(buttonLocation);
  }, [buttonLocation]);


  useEffect(() => {
    setAllPlayerHaveResults(roundResults.every((result) => result !== -1));
  }, [roundResults]);

  const handleEndRound = () => {
    endRound();
    setRoundButton(buttonLocation);
  };

  const handleAchieved = () => {
    setResults(1, roundButton);
    moveRoundButton();
  };

  const handleFailed = () => {
    setResults(0, roundButton);
    moveRoundButton();
  };

  const handleConfirmResults = () => {
    for (let i = 0; i < PLAYERS_NUMBER; i++) {
      logBid({ value: roundBids[i], achieved: roundResults[i] === 1 }, i);
    }
    moveButton();
    resetRound();
  };

  if (!roundStarted)  return null;

    return (
      <div className="w-full">
        <Button
          className={cn("w-full my-4", roundEnded ? "hidden" : "")}
          variant="blue"
          onClick={handleEndRound}
        >
          {t("endRound")}
        </Button>
        {roundEnded && (
          <>
            <h1 className="w-full text-center my-4">
              {t("enterResultFor")} {players[roundButton]}
            </h1>
            <div className="grid grid-cols-2 w-full gap-4">
              <Button variant="green" onClick={handleAchieved}>
                {t("achieved")}
              </Button>
              <Button onClick={handleFailed}>{t("failed")}</Button>
            </div>
          </>
        )}
        <Button
          className={cn(
            "w-full my-4",
            allPlayerHaveResults ? "block" : "hidden"
          )}
          variant="blue"
          onClick={handleConfirmResults}
        >
          {t("confirmResults")}
        </Button>
      </div>
    );

}
