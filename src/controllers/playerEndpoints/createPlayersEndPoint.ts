import * as express from "express";
import prisma from "../../db/prismaDb";
import { NextFunction } from "express";
import { getPlayerJson } from "../../getJsonData/getPlayerJson";

export default async function createPlayers(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  const playerData = await getPlayerJson();
  const playersToCreate = playerData.filter(
    (player) =>
      player.playerName &&
      player.age &&
      player.playerImage &&
      player.team &&
      player.position
  );

  try {
    const createdPlayers = await prisma.player.createMany({
      data: playersToCreate,
    });
    console.log(`CREATED ${createdPlayers.count} PLAYERS`);
    return res
      .status(200)
      .json({ message: `CREATED ${createdPlayers.count} PLAYERS` });
  } catch (error) {
    console.log(error, "ERROR IN CREATE PLAYER, CONTROLLER");
    return res.status(400).json({ message: "ERROR IN CREATE PLAYER" });
  }
}
