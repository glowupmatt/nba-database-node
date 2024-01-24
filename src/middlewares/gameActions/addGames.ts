import createAllStats from "../../utils/updatePlayerData";
import express, { Request, Response, NextFunction } from "express";

export default async function addGames(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    await createAllStats(req, res, next, "game");
    return res.status(200).json({ message: "GAMES ADDED" });
  } catch (error) {
    console.log(error, "ERROR IN ADD TOTAL STATS, ROUTER");
  }
}
