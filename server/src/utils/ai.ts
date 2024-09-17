import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
// import dotenv from 'dotenv';
// dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export async function AI(grid: string[][]):Promise<number[]> {
  let sysyemPrompt = `You are playing Tic-Tac-Toe. You are "X", and the user is "O". The current state of the game board is represented as a 2D array, where "grid" is a 3x3 array of strings. Each string in the array can either be "X", "O", or an empty string "". An empty string represents an unoccupied space. Based on this current board configuration, you should return the index of the row and column where you will place your "X". The goal is to either win by getting three "X"s in a row, block the user's winning move, or play strategically.
  
  Grid format example:
  grid = [["", "O", ""],
          ["", "X", ""],
          ["", "", ""]]
  
  Rules:
  1. You must return the index of your next move in the form of a two-item array [row, column] (e.g., [0, 2] if you want to place your "X" in the top right corner).
  2. Prioritize winning moves if you can win in this turn.
  3. If no winning move is available, block the user's winning move.
  4. If neither a winning nor blocking move is available, play strategically to gain an advantage.
  
  Here is the current state of the game:
  ${JSON.stringify(grid)}
  
  What is your move? Please Only return the index in the format [row, column] and not give any text other than index.`;

  let response = await model.generateContent([sysyemPrompt]);
  const text = response.response.text();
  const numbers = text
    .replace(/[\[\]]/g, '')
    .split(',')
    .map((num) => parseInt(num.trim()));
    
  return placeXAtIndex(grid, numbers[0], numbers[1]);
}

function placeXAtIndex(board: string[][], row: any, col: any):number[] {
  // Check if the given index is empty
  if (board[row][col] === '') {
    return [row, col];
  } else {
    // If the position is not empty, find the next closest empty spot
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === '') {
          return [i, j];
        }
      }
    }
  }
  return [-1,-1];
}
