import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { Bid, PlayerBids } from "./game";

const PLAYERS_NUMBER = 4;

interface PlayerStore {
  players: string[];
  addPlayer: (player: string) => void;
  updatePlayer: (player: string, index: number) => void;
  resetPlayers: () => void;
}

interface BidsStore {
  playerBids: PlayerBids[];
  logBid: (bid: Bid, index: number) => void;
  getPlayerScore: (index: number) => number;
  resetBids: () => void;
}

interface ButtonStore {
  button: number;
  moveButton: () => void;
  resetButton: () => void;
}

interface GameStore {
  gameOver: boolean;
  setGameOver: (value: boolean) => void;
}

interface RoundStore {
  bids: number[];
  results: number[];
  started: boolean;
  ended: boolean;
  roundButton: number;
  addBid: (bid: number, index: number) => void;
  addResult: (result: number, index: number) => void;
  startRound: () => void;
  endRound: () => void;
  restartRound: () => void;
  getPlayerBid: (index: number) => string;
  moveRoundButton: () => void;
  setRoundButton: (index: number) => void;
}

const useButtonStore = create<ButtonStore>()(
  persist(
    (set) => ({
      button: 1,
      moveButton: () =>
        set((state) => ({ button: (state.button + 1) % PLAYERS_NUMBER })),
      resetButton: () => set({ button: 1 }),
    }),
    {
      name: "button-store",
    }
  )
);

const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      players: [],
      addPlayer: (player) =>
        set((state) => ({ players: [...state.players, player] })),
      updatePlayer: (player, index) =>
        set((state) => {
          const players = [...state.players];
          players[index] = player;
          return { players };
        }),
      resetPlayers: () => set({ players: [] }),
    }),
    {
      name: "player-store",
    }
  )
);

const useBidsStore = create<BidsStore>()(
  persist(
    (set, get) => ({
      playerBids: [],
      logBid: (bid, index) =>
        set((state) => {
          const playerBids = [...state.playerBids];
          if (!playerBids[index]) playerBids[index] = { bids: [] };
          playerBids[index].bids.push(bid);
          return { playerBids };
        }),
      getPlayerScore: (index) => {
        const bids = get().playerBids[index];
        if (!bids) return 0;
        return bids.bids.reduce(
          (acc, bid) => acc + (bid.achieved ? bid.value : -bid.value),
          0
        );
      },
      resetBids: () => set({ playerBids: [] }),
    }),
    {
      name: "bids-store",
    }
  )
);

const useRoundStore = create<RoundStore>()(
  persist(
    (set, get) => ({
      bids: [0, 0, 0, 0],
      results: [-1, -1, -1, -1],
      started: false,
      ended: false,
      roundButton: 0,
      addBid: (bid, index) =>
        set((state) => {
          const bids = [...state.bids];
          bids[index] = bid;
          return { bids };
        }),
      addResult: (result, index) =>
        set((state) => {
          const results = [...state.results];
          results[index] = result;
          return { results };
        }),
      startRound: () => set({ started: true }),
      restartRound: () =>
        set({
          bids: [0, 0, 0, 0],
          results: [-1, -1, -1, -1],
          started: false,
          ended: false,
        }),
      endRound: () =>
        set({
          ended: true,
        }),
      getPlayerBid: (index) => {
        const bid = get().bids[index];
        if (bid === 0) return "-";
        return bid.toString();
      },
      moveRoundButton: () =>
        set((state) => ({
          roundButton: (state.roundButton + 1) % PLAYERS_NUMBER,
        })),
      setRoundButton: (index) => set({ roundButton: index }),
    }),
    {
      name: "round-store",
    }
  )
);

const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      gameOver: false,
      setGameOver: (value) => set({ gameOver: value }),
    }),
    {
      name: "game-store",
    }
  )
);

export {
  usePlayerStore,
  useBidsStore,
  useButtonStore,
  useRoundStore,
  useGameStore,
  PLAYERS_NUMBER,
};
