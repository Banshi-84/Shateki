export interface Player {
  id: string;
  name: string;
  score: number;
  timestamp: number;
}

export interface LeaderboardEntry extends Player {
  rank: number;
}