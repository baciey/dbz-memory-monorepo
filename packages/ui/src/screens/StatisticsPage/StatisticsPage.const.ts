export const onePlayerTableConfig = [
  { header: "#", columnWidth: 30, rowId: "index" },
  { header: "Name", columnWidth: 130, rowId: "name" },
  { header: "Time", columnWidth: 70, rowId: "time" },
  { header: "Date", columnWidth: 100, rowId: "createdAt" },
];

export const twoPlayerTableConfig = [
  { header: "#", columnWidth: 30, rowId: "index" },
  { header: "Player 1", columnWidth: 100, rowId: "player1Name" },
  { header: "Player 2", columnWidth: 100, rowId: "player2Name" },
  { header: "P1 Score", columnWidth: 70, rowId: "player1Score" },
  { header: "P2 Score", columnWidth: 70, rowId: "player2Score" },
  { header: "Date", columnWidth: 100, rowId: "createdAt" },
];
