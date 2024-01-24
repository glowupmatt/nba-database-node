import express from "express";
import addTotalStats from "../middlewares/totalStatsActions/addTotalStats";
import createTotalStats from "../controllers/totalStatsEndpoints/createTotalStats";

export default (router: express.Router): void => {
  router.put("/add-total-stats", addTotalStats);
  router.put("/create-total-stats/:id", createTotalStats);
};
