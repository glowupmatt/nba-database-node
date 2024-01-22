import express from "express";
import playerFunctions from "./playerFunctions";
import gameFunctions from "./gameFunction";

const router = express.Router();

export default (): express.Router => {
  playerFunctions(router);
  gameFunctions(router);
  return router;
};
