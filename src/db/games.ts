import dotenv from "dotenv";
import axios from "axios";

const URL = process.env.DEVELOPMENT_URL || "http://localhost:3000";

//GAME ACTIONS
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

export const createGames = async (id: string, body: Games) => {
  try {
    const response = await axios.put(`${URL}/create-games/${id}`, body);
    const data = response;
    console.log(`updated ${body.playerName} games`);
    return data;
  } catch (error) {
    console.log(error, "ERROR IN CREATE GAMES, ROUTER");
  }
};
