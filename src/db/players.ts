import dotenv from "dotenv";
import axios from "axios";

const URL = process.env.DEVELOPMENT_URL || "http://localhost:3000";

//PLAYER ACTIONS

export const createPlayers = async () => {
  try {
    axios.post(`${URL}/create-players`);
  } catch (error) {
    console.log(error, "ERROR IN CREATE PLAYERS, ROUTER");
  }
};

export const getAllPlayers = async () => {
  try {
    const players = axios.get(`${URL}/get-all-players`);
    return (await players).data;
  } catch (error) {
    console.log(error, "ERROR IN GET ALL PLAYERS, ROUTER");
  }
};

export const deleteAllPlayers = async () => {
  try {
    axios.delete(`${URL}/delete-all-players`);
  } catch (error) {
    console.log(error, "ERROR IN DELETE ALL PLAYERS, ROUTER");
  }
};
