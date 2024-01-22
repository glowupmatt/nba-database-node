import express from "express";
import createPlayers from "../controllers/playerEndpoints/createPlayersEndPoint";
import deleteAllPlayers from "../controllers/playerEndpoints/deleteAllPlayersEndPoint";
import getAllPlayers from "../controllers/playerEndpoints/getPlayersEndPoint";

export default (router: express.Router): void => {
  router.post("/create-players", createPlayers);
  router.get("/get-all-players", getAllPlayers);
  router.delete("/delete-all-players", deleteAllPlayers);
};
