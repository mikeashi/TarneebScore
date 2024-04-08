import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useBidsStore, useButtonStore, useGameStore } from "@/lib/gameState";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

export function Restart() {
  const resetBids = useBidsStore((state) => state.resetBids);
  const t = useTranslations("Index");

  const restart = () => {
    resetBids();
    useButtonStore.getState().resetButton();
    useGameStore.getState().setGameOver(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant="green">
          {t("restart")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("areYouSureYouWantToRestartTheGame")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("ifYouRestartTheGameAllTheScoresWillBeLost")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={restart}>
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
