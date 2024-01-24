import createAllStats from "../../utils/updatePlayerData";
import express, { Request, Response, NextFunction } from "express";

export default async function addTotalStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await createAllStats(req, res, next, "total");
    return res.status(200).json({ message: "ADD TOTAL STATS" });
  } catch (error) {
    console.log(error, "ERROR IN ADD TOTAL STATS, ROUTER");
  }
}
