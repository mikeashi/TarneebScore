
/**
 * Represents a single bid
 */
interface Bid {
  value: number;
  achieved: boolean;
}

/**
 * Represent a log of all bids for a player
 */
interface PlayerBids{
    bids: Bid[];
}

/**
 * Represents the player bids for current round
 */
interface Round{
    bids: number[];
    results: boolean[];
    started: boolean;
}

export type {Bid, PlayerBids, Round};


