import * as express from "express";
import prisma from "../../db/prismaDb";

export default async function getAllPlayers(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const players = await prisma.player.findMany({
      orderBy: {
        playerName: "asc",
      },
      include: {
        games: true,
        totalStats: true,
      },
    });
    console.log(players, "PLAYERS FROM DB");
    return res.status(200).json(players).end();
  } catch (error) {
    console.log(error, "ERROR IN DELETE ALL PLAYERS");
  }
}
