import { Game, TotalStats, Player } from "@prisma/client";

export type PlayerStats = {
  id: string;
  playerName: string;
  age: string;
  playerImage: string;
  team: string;
  position: string;
  games: Game[];
  totalStats: TotalStats[];
  createdAt: string;
  updatedAt: string;
};

export type UpdateData = {
  playerName?: string;
  team?: string;
  age?: string;
  totalGamesPlayed?: string;
  totalGamesStarted?: string;
  minutesPlayed?: string;
  fieldGoals?: string;
  fieldGoalAttempts?: string;
  fieldGoalPercentage?: string;
  threePointers?: string;
  twoPointers?: string;
  totalRebounds?: string;
  assists?: string;
  blocks?: string;
  turnovers?: string;
  points?: string;
  freeThrows?: string;
  freeThrowAttempts?: string;
  steals?: string;
};

export type TotalStatsData = {
  playerName: string;
  team: string;
  age: string;
  totalGamesPlayed: string;
  totalGamesStarted: string;
  minutesPlayed: string;
  fieldGoals: string;
  fieldGoalAttempts: string;
  fieldGoalPercentage: string;
  threePointers: string;
  twoPointers: string;
  totalRebounds: string;
  assists: string;
  blocks: string;
  turnovers: string;
  points: string;
  freeThrows: string;
  freeThrowAttempts: string;
  steals: string;
};
