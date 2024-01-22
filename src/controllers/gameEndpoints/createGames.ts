import * as express from "express";
import prisma from "../../db/prismaDb";
import { NextFunction } from "express";

export default async function createGames(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const body = req.body;
    const player = await prisma.player.update({
      where: {
        id,
      },
      data: {
        games: {
          create: {
            playerName: body.playerName,
            minutesPlayed: body.minutesPlayed,
            fieldGoals: body.fieldGoals,
            fieldGoalAttempts: body.fieldGoalAttempts,
            fieldGoalPercentage: body.fieldGoalPercentage,
            threePointers: body.threePointers,
            twoPointers: body.twoPointers,
            totalRebounds: body.totalRebounds,
            assists: body.assists,
            blocks: body.blocks,
            turnovers: body.turnovers,
            points: body.points,
          },
        },
      },
    });
    console.log(player, "PLAYER");
    return res.status(200).json({ message: "GAME CREATED", player });
  } catch (error) {
    console.log(error, "ERROR IN CREATE GAMES");
    return res.status(400).json({ message: "ERROR IN CREATE GAME" });
  }
}
