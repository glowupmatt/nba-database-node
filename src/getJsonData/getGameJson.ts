import { JSDOM } from "jsdom";
import axios from "axios";
import { Game } from "@prisma/client";

export const getGameJson = async () => {
  const dataSelectors = [
    { name: "playerName", selector: "td[csk]" },
    { name: "minutesPlayed", selector: "td[data-stat='mp_per_g']" },
    { name: "fieldGoals", selector: "td[data-stat='fg_per_g']" },
    { name: "fieldGoalAttempts", selector: "td[data-stat='fga_per_g']" },
    { name: "fieldGoalPercentage", selector: "td[data-stat='fg_pct']" },
    { name: "threePointers", selector: "td[data-stat='fg3_per_g']" },
    { name: "twoPointers", selector: "td[data-stat='fg2_per_g']" },
    { name: "totalRebounds", selector: "td[data-stat='trb_per_g']" },
    { name: "assists", selector: "td[data-stat='ast_per_g']" },
    { name: "blocks", selector: "td[data-stat='blk_per_g']" },
    { name: "turnovers", selector: "td[data-stat='tov_per_g']" },
    { name: "points", selector: "td[data-stat='pts_per_g']" },
  ];

  const tableData: Game[] = [];
  const response = await axios.get(
    "https://www.basketball-reference.com/leagues/NBA_2024_per_game.html"
  );

  const dom = new JSDOM(response.data);
  const document = dom.window.document;
  const rows = document.querySelectorAll("table tbody tr:not(.partial_table)");

  rows.forEach((row) => {
    let player: Partial<Record<string, any>> = {};
    dataSelectors.forEach((dataSelector) => {
      const cell = row.querySelector(dataSelector.selector);
      const data = cell ? cell.textContent.trim() : null;
      if (data) {
        player[dataSelector.name] = data;
      } else {
        player[dataSelector.name] = "0";
      }
    });
    if (Object.keys(player).length !== 0) {
      tableData.push(player as Game);
    }
  });

  return tableData;
};
