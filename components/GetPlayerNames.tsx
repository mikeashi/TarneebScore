import {
  usePlayerStore,
  PLAYERS_NUMBER,
} from "@/lib/gameState";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";


export function GetPlayerNames() {
  const players = usePlayerStore((state) => state.players);
  const addPlayer = usePlayerStore((state) => state.addPlayer);
  const t = useTranslations("GetPlayerNames");
  const name = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const labels = [
    t("enterYourName"),
    t("enterTheNameOfThePlayerToYourRight"),
    t("enterTheNameOfThePlayerOppositeYou"),
    t("enterTheNameOfThePlayerToYourLeft"),
  ];

  const handleAddPlayer = () => {
    if (!name.current || !name.current.value) {
      toast({
        variant: "destructive",
        title: t("pleaseEnterAName"),
        description: t("pleaseEnterANameDescription"),
      });
      return;
    }
    if (players.length < PLAYERS_NUMBER) {
      addPlayer(name.current.value);
    }
    name.current.value = "";
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">{labels[players.length]}</Label>
        <Input
          type="name"
          id="name"
          placeholder={t("name")}
          ref={name}
          className="w-full"
        />
      </div>
      <Button onClick={handleAddPlayer} size="lg">
        {t("add")}
      </Button>
    </div>
  );
}
