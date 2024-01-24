import express from "express";
import playerFunctions from "./playerFunctions";
import gameFunctions from "./gameFunction";
import totalStatsFunction from "./totalStatsFunction";

const router = express.Router();

export default (): express.Router => {
  playerFunctions(router);
  gameFunctions(router);
  totalStatsFunction(router);
  return router;
};
