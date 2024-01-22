import * as express from "express";
import prisma from "../../db/prismaDb";

const getPlayersId = async () => {
  try {
    const players = await prisma.player.findMany({
      orderBy: {
        playerName: "asc",
      },
    });
    const playersId = players.map((player) => player.id);
    return playersId;
  } catch (error) {
    console.log(error, "ERROR IN GET PLAYERS ID");
  }
};

export default async function deleteAllPlayers(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const playersId = await getPlayersId();
  if (playersId.length === 0) {
    return res.status(400).json({ message: "NO PLAYERS IN DB" }).end();
  }

  try {
    playersId.forEach(async (id) => {
      await prisma.player.delete({
        where: {
          id,
        },
      });
      console.log(`DELETED ${id} FROM DB`);
    });
    console.log(`DELETED ${playersId.length} PLAYERS FROM DB`);
    return res.status(200).json(playersId).end();
  } catch (error) {
    console.log(error, "ERROR IN DELETE ALL PLAYERS");
  }
}
