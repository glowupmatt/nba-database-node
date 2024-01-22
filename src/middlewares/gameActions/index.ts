import { Request, Response, NextFunction } from "express";
import { getAllPlayers } from "../../db/players";
import { Game, Player } from "@prisma/client";
import { getGameJson } from "../../getJsonData/getGameJson";
import { createGames } from "../../db/games";

const URL = process.env.DEVELOPMENT_URL || "http://localhost:3000";

export default async function addGames(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const players: Player[] = await getAllPlayers();
    const perGameJson = await getGameJson();
    const filteredPlayersJson = perGameJson.filter(
      (player) => player.playerName !== undefined && player.playerName !== "0"
    );
    const playersMap = new Map();
    players.forEach((player) => {
      playersMap.set(player.playerName, player.id);
    });
    for (const player of filteredPlayersJson) {
      await delayAndUpdate(player, playersMap);
    }

    console.log(filteredPlayersJson, "filteredPlayersJson");
  } catch (error) {
    console.log(error, "ERROR IN DELETE ALL PLAYERS");
  }
}

async function delayAndUpdate(player: Game, playersMap: Map<string, string>) {
  if (playersMap.has(player.playerName)) {
    const playerId = playersMap.get(player.playerName);
    if (playerId) {
      await updatePlayerStats(playerId, player);
    }
  }
}

type Games = {
  playerName: string;
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
};

async function updatePlayerStats(playerId: string, player: Game) {
  if (player) {
    const body: Games = {
      playerName: player.playerName,
      minutesPlayed: player.minutesPlayed,
      fieldGoals: player.fieldGoals,
      fieldGoalAttempts: player.fieldGoalAttempts,
      fieldGoalPercentage: player.fieldGoalPercentage,
      threePointers: player.threePointers,
      twoPointers: player.twoPointers,
      totalRebounds: player.totalRebounds,
      assists: player.assists,
      blocks: player.blocks,
      turnovers: player.turnovers,
      points: player.points,
    };
    await createGames(playerId, body);
    console.log(playerId, "updated games");
  }
}
