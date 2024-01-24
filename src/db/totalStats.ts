import dotenv from "dotenv";
import axios from "axios";
import { UpdateData } from "utils/types";
import express from "express";
const URL = process.env.DEVELOPMENT_URL || "http://localhost:3000";

//TotalStats ACTIONS

export const createTotalStats = async (id: string, body: UpdateData) => {
  try {
    if (body.playerName === "undefined") {
      console.log("PLAYER NAME UNDEFINED");
      return;
    } else {
      const dbData: UpdateData = {
        playerName: body.playerName,
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
      };
      const response = await axios.put(
        `${URL}/create-total-stats/${id}`,
        dbData
      );
      const data = response.data;
      console.log(`called api for ${body.playerName} total stats`);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      });
    }
  } catch (error) {
    console.log(error, "ERROR IN CREATE TOTAL STATS, ROUTER");
  }
};
