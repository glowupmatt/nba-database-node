import * as express from "express";
import prisma from "../../db/prismaDb";
import { Request, Response, NextFunction } from "express";

export default async function createTotalStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const body = req.body;
    if (!id || !body)
      return res.status(400).json({ message: "NO ID PROVIDED" });
    const player = await prisma.player.update({
      where: {
        id,
      },
      data: {
        totalStats: {
          create: {
            totalGamesPlayed: body.totalGamesPlayed,
            totalGamesStarted: body.totalGamesStarted,
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
            freeThrows: body.freeThrows,
            freeThrowAttempts: body.freeThrowAttempts,
            steals: body.steals,
          },
        },
      },
    });
    console.log(`updated ${body.playerName} total stats`);
    return res.status(200).json({ message: "TOTAL STATS CREATED", player });
  } catch (error) {
    console.log(error, "ERROR IN CREATE TOTAL STATS");
    return res.status(400).json({ message: "ERROR IN CREATE TOTAL STATS" });
  }
}
