import { JSDOM } from "jsdom";
import axios from "axios";
import { TotalStats } from "@prisma/client";

export const getJsonDataTotalForScript = async () => {
  const dataSelectors = [
    { name: "playerName", selector: "td[csk]" },
    { name: "team", selector: "td[data-stat='team_id']" },
    { name: "age", selector: "td[data-stat='age']" },
    { name: "totalGamesPlayed", selector: "td[data-stat='g']" },
    { name: "totalGamesStarted", selector: "td[data-stat='gs']" },
    { name: "minutesPlayed", selector: "td[data-stat='mp']" },
    { name: "fieldGoals", selector: "td[data-stat='fg']" },
    { name: "fieldGoalAttempts", selector: "td[data-stat='fga']" },
    { name: "fieldGoalPercentage", selector: "td[data-stat='fg_pct']" },
    { name: "threePointers", selector: "td[data-stat='fg3']" },
    { name: "twoPointers", selector: "td[data-stat='fg2']" },
    { name: "totalRebounds", selector: "td[data-stat='trb']" },
    { name: "assists", selector: "td[data-stat='ast']" },
    { name: "blocks", selector: "td[data-stat='blk']" },
    { name: "turnovers", selector: "td[data-stat='tov']" },
    { name: "points", selector: "td[data-stat='pts']" },
    { name: "playerImage", selector: "td[data-append-csv]" },
    { name: "freeThrows", selector: "td[data-stat='ft']" },
    { name: "freeThrowAttempts", selector: "td[data-stat='fta']" },
    { name: "steals", selector: "td[data-stat='stl']" },
  ];

  const tableData: TotalStats[] = [];
  const response = await axios.get(
    "https://www.basketball-reference.com/leagues/NBA_2024_totals.html"
  );

  const dom = new JSDOM(response.data);
  const document = dom.window.document;
  const rows = document.querySelectorAll("table tbody tr:not(.partial_table)");

  rows.forEach((row) => {
    let player: Partial<Record<string, any>> = {};
    dataSelectors.forEach((dataSelector) => {
      const cell = row.querySelector(dataSelector.selector);
      const data = cell?.textContent?.trim();
      if (data) {
        player[dataSelector.name] = data;
      }
      if (dataSelector.name === "playerImage") {
        const playerId = cell?.getAttribute("data-append-csv");
        player[
          dataSelector.name
        ] = `https://www.basketball-reference.com/req/202106291/images/headshots/${playerId}.jpg`;
      }
    });
    if (Object.keys(player).length !== 0) {
      tableData.push(player as TotalStats);
    }
  });

  return tableData;
};

export default getJsonDataTotalForScript;
