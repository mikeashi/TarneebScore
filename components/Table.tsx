"use client";

import {
  usePlayerStore,
  useBidsStore,
  useRoundStore,
  PLAYERS_NUMBER,
  useGameStore,
} from "@/lib/gameState";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { GetPlayerNames } from "./GetPlayerNames";
import { TableButton } from "./TableButton";
import { GetPLayerBids } from "./GetPlayerBids";
import { GetPlayerResults } from "./GetPlayerResults";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Restart } from "./Restart";
import { NewGame } from "./NewGame";


export function Table() {
  const players = usePlayerStore((state) => state.players);
  const getPlayerScore = useBidsStore((state) => state.getPlayerScore);
  const getPlayerBid = useRoundStore((state) => state.getPlayerBid);
  const roundBids = useRoundStore((state) => state.bids);
  const roundResults = useRoundStore((state) => state.results);
  const roundStarted = useRoundStore((state) => state.started);
  const playerBids = useBidsStore((state) => state.playerBids);
  const setRoundButton = useRoundStore((state) => state.setRoundButton);
  const gameOver = useGameStore((state) => state.gameOver);
  const setGameOver = useGameStore((state) => state.setGameOver);
  const [winner, setWinner] = useState("");
  const t = useTranslations("Index");

  const playerStyles = [
    "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full",
    "right-0 top-1/2 transform translate-x-full -translate-y-1/2",
    "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full",
    "left-0 top-1/2 transform -translate-x-full -translate-y-1/2",
  ];

  const handlePlayerNameClick = (index: number) => {
    if (roundBids[index] === 0) return;
    if (roundStarted && roundResults[index] === -1) return;
    setRoundButton(index);
  };

  useEffect(() => {
    for (let i = 0; i < PLAYERS_NUMBER; i++) {
      if (getPlayerScore(i) >= 41){
        setGameOver(true);
        setWinner(players[i]);
        return;
      }
    }
  }, [playerBids]);


  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="relative my-16">
        <div className="h-48 w-48 bg-green-700 rounded-full relative m-2"></div>
        {players.map((player, index) => (
          <div className={cn("absolute", playerStyles[index])} key={index}>
            <div
              className="text-center"
              onClick={() => handlePlayerNameClick(index)}
            >
              <p
                className={cn(
                  roundResults[index] === 1 ? "text-green-400" : "",
                  roundResults[index] === 0 ? "text-red-400" : ""
                )}
              >
                {player}
              </p>
              <p dir="ltr">
                <span>{getPlayerScore(index)}</span>/
                <span>{getPlayerBid(index)}</span>
              </p>
            </div>
          </div>
        ))}
        <TableButton />
      </div>
      <Separator />
      {players.length < PLAYERS_NUMBER && <GetPlayerNames />}
      {!gameOver ? (
        <>
          <GetPLayerBids />
          <GetPlayerResults />
        </>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-3xl">{t("gameOver")}</h1>
            <p>
              {t("winnerIs")} <span>{winner}</span>
            </p>
          </div>
        </>
      )}
      <div className="flex-grow"></div>
      <Separator />
      <div className="flex gap-8 w-full my-4">
        <Restart />
        <NewGame />
      </div>
    </div>
  );
}
