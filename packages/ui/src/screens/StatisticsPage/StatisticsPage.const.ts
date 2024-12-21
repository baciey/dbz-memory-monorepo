import { TFunction } from "i18next";

export const onePlayerTableConfig = (
  t: TFunction<"translation", undefined>,
) => {
  return [
    { header: "#", columnWidth: 30, rowId: "index" },
    { header: "Avatar", columnWidth: 70, rowId: "avatarUrl" },
    { header: t("statistics.name"), columnWidth: 130, rowId: "name" },
    { header: t("statistics.time"), columnWidth: 70, rowId: "time" },
    { header: t("statistics.date"), columnWidth: 100, rowId: "createdAt" },
  ];
};

export const twoPlayerTableConfig = (
  t: TFunction<"translation", undefined>,
) => {
  return [
    { header: "#", columnWidth: 30, rowId: "index" },
    { header: t("statistics.p1Name"), columnWidth: 100, rowId: "player1Name" },
    { header: t("statistics.p2Name"), columnWidth: 100, rowId: "player2Name" },
    { header: t("statistics.p1Score"), columnWidth: 70, rowId: "player1Score" },
    { header: t("statistics.p2Score"), columnWidth: 70, rowId: "player2Score" },
    { header: t("statistics.date"), columnWidth: 100, rowId: "createdAt" },
  ];
};
