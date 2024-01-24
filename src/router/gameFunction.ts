import express from "express";
import addGames from "../middlewares/gameActions/addGames";
import createGames from "../controllers/gameEndpoints/createGames";

export default (router: express.Router): void => {
  router.put("/add-games", addGames);
  router.put("/create-games/:id", createGames);
};
