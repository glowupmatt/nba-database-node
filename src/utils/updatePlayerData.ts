import { Request, Response, NextFunction } from "express";
import { getAllPlayers } from "../db/players";
import { PlayerStats, UpdateData } from "utils/types";
import { getGameJson } from "../getJsonData/getGameJson";
import { createGames } from "../db/games";
import { getTotalStatsJson } from "../getJsonData/getTotalStatsJson";
import { TotalStatsData } from "./types";
import { createTotalStats } from "../db/totalStats";
import { Game } from "@prisma/client";
import { checkIfPlayerDataIsDifferent } from "./checkIfPlayerDataIsDifferent";

export default async function createAllStats(
  req: Request,
  res: Response,
  next: NextFunction,
  variant: "game" | "total"
) {
  try {
    let jsonData: UpdateData[];
    if (variant === "game") {
      jsonData = await getGameJson();
    } else {
      jsonData = await getTotalStatsJson();
    }
    const players: PlayerStats[] = await getAllPlayers();
    const filteredPlayersJson = jsonData.filter(
      (player) => player.playerName !== undefined && player.playerName !== "0"
    );
    const gameVariant = players[0].games && players[0].games.length === 0;
    const totalVariant =
      players[0].totalStats && players[0].totalStats.length === 0;
    let playersToUpdate;
    let check;
    if (variant === "game") {
      check = gameVariant;
    } else {
      check = totalVariant;
    }
    const valueChecked = check
      ? jsonData
      : (playersToUpdate = checkIfPlayerDataIsDifferent(
          players,
          filteredPlayersJson,
          variant
        ));

    if (valueChecked.length > 0) {
      const playersMap = new Map();
      players.forEach((player) => {
        if (player.playerName !== undefined && player.playerName !== "0") {
          playersMap.set(player.playerName, player.id);
        }
      });
      if (playersMap.size > 0) {
        for (const player of valueChecked) {
          await delayAndUpdate(player, playersMap, variant);
        }
      } else {
        console.log("NO PLAYERS TO UPDATE");
        return res.status(200).json({ message: "NO PLAYERS TO UPDATE" });
      }
    } else {
      console.log("NO PLAYERS TO UPDATE");
      return res.status(200).json({ message: "NO PLAYERS TO UPDATE" });
    }
  } catch (error) {
    console.log(error, "ERROR IN CREATE GAMES, ROUTER");
  }
}

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function delayAndUpdate(
  player: UpdateData,
  playersMap: Map<string, string>,
  variant: "game" | "total"
) {
  if (playersMap.has(player.playerName)) {
    const playerId = playersMap.get(player.playerName);
    if (playerId) {
      pause(1000);
      await updatePlayerStats(playerId, player, variant);
    }
  }
}

async function updatePlayerStats(
  playerId: string,
  player: UpdateData,
  variant: "game" | "total"
) {
  if (player) {
    const body: UpdateData = {
      playerName: player.playerName,
      team: player.team,
      age: player.age,
      totalGamesPlayed: player.totalGamesPlayed,
      totalGamesStarted: player.totalGamesStarted,
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
      freeThrows: player.freeThrows,
      freeThrowAttempts: player.freeThrowAttempts,
      steals: player.steals,
    };
    if (variant === "game") {
      await createGames(playerId, body);
    }
    if (variant === "total") {
      await createTotalStats(playerId, body);
    }
    console.log(playerId, `updated ${variant} stats`);
  }
}
