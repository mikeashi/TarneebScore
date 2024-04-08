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
import {
  useBidsStore,
  useButtonStore,
  useGameStore,
  usePlayerStore,
} from "@/lib/gameState";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

export function NewGame() {
  const resetBids = useBidsStore((state) => state.resetBids);
  const t = useTranslations("Index");

  const newgame = () => {
    resetBids();
     usePlayerStore.getState().resetPlayers();
     useButtonStore.getState().resetButton();
    useGameStore.getState().setGameOver(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant="blue">
          {t("newGame")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("areYouSureYouWantToStartANewGame")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("ifYouStartANewGameAllTheScoresWillBeLost")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={newgame}>
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
