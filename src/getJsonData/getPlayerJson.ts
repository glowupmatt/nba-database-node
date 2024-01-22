import { JSDOM } from "jsdom";
import axios from "axios";
import { Player } from "@prisma/client";

export const getPlayerJson = async () => {
  const dataSelectors = [
    { name: "playerName", selector: "td[csk]" },
    { name: "team", selector: "td[data-stat='team_id']" },
    { name: "age", selector: "td[data-stat='age']" },
    { name: "position", selector: "td[data-stat='pos']" },
    { name: "playerImage", selector: "td[data-append-csv]" },
  ];

  const tableData: Player[] = [];
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
      if (data !== undefined && dataSelector.name !== "playerImage") {
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
      tableData.push(player as Player);
    }
  });

  return tableData;
};
