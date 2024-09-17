export const checkWinner = (newGrid: string[][]) => {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if (
      newGrid[i][0] &&
      newGrid[i][0] === newGrid[i][1] &&
      newGrid[i][1] === newGrid[i][2]
    ) {
      return newGrid[i][0];
    }
    if (
      newGrid[0][i] &&
      newGrid[0][i] === newGrid[1][i] &&
      newGrid[1][i] === newGrid[2][i]
    ) {
      return newGrid[0][i];
    }
  }
  // Check diagonals
  if (
    newGrid[0][0] &&
    newGrid[0][0] === newGrid[1][1] &&
    newGrid[1][1] === newGrid[2][2]
  ) {
    return newGrid[0][0];
  }
  if (
    newGrid[0][2] &&
    newGrid[0][2] === newGrid[1][1] &&
    newGrid[1][1] === newGrid[2][0]
  ) {
    return newGrid[0][2];
  }
  // No winner
  return null;
};
