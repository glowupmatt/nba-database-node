import { PlayerStats, UpdateData } from "utils/types";
export const checkIfPlayerDataIsDifferent = (
  players: PlayerStats[],
  playerJson: UpdateData[],
  variant: string
): UpdateData[] => {
  const playersToUpdate: UpdateData[] = [];
  const playerJsonData = playerJson.map((playerData) => {
    if (variant === "game") {
      return { minutesPlayed: playerData.minutesPlayed };
    }
    if (variant === "total") {
      return { totalGamesPlayed: playerData.totalGamesPlayed };
    }
  });
  const playerData = players.map((player) => {
    if (variant === "game") {
      const { games } = player;
      return { minutesPlayed: games[0].minutesPlayed };
    }
    if (variant === "total") {
      const { totalStats } = player;
      return { totalGamesPlayed: totalStats[0].totalGamesPlayed };
    }
  });
  console.log(playerData, "PLAYER DATA");
  playerJsonData.every((playerJsonItem, index) => {
    const playerItem = playerData[index];
    if (variant === "game") {
      if (playerJsonItem.minutesPlayed !== playerItem.minutesPlayed) {
        playersToUpdate.push(playerJson[index]);
      }
    }

    if (variant === "total") {
      if (playerJsonItem.totalGamesPlayed !== playerItem.totalGamesPlayed) {
        playersToUpdate.push(playerJson[index]);
      }
    }
  });
  return playersToUpdate;
};
