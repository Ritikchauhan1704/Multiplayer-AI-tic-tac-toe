import { useState } from 'react';
import { checkWinner } from '../utils/checkWinner';
import { cn } from '../utils/cn';
import { Modal } from './Model';

interface GridProps {
  grid: string[][];
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  move: 'X' | 'O';
  setMove: React.Dispatch<React.SetStateAction<'X' | 'O'>>;
}

export default function Grid({ grid, setGrid, move, setMove }: GridProps) {
  const [playable, setPlayable] = useState<boolean>(true);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const [scoreX, setScoreX] = useState(0)
  const [scoreO, setScoreO] = useState(0)
  const [scoreTie, setScoreTie] = useState(0)

  const handleClick = (i: number, j: number) => {
    if (!playable || grid[i][j] !== '') return;
    const newGrid = [...grid];
    newGrid[i] = [...newGrid[i]];
    newGrid[i][j] = move;
    setGrid(newGrid);
    
    const winner = checkWinner(newGrid);
    if (winner) {
      if(winner=="X"){
        setScoreX((prev)=>prev+1);
      }else{
        setScoreO((prev)=>prev+1);
      }
      setModalMessage(`Player ${winner} wins!`);
      setPlayable(false);
      return;
    }
    
    // Check if it's a draw
    const isDraw = newGrid.every(row => row.every(cell => cell !== ''));
    if (isDraw) {
      setScoreTie((prev)=>prev+1);
      setModalMessage('It\'s a draw!');
      setPlayable(false);
      return;
    }

    // Switch move
    setMove(move === 'X' ? 'O' : 'X');
  };

  const handleRestart = () => {
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setMove('O');
    setPlayable(true);
    setModalMessage(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex w-1/2 h-1/2 justify-center items-center shadow-2xl">
        {grid.map((item, i) => (
          <div
            className="flex flex-col w-full h-full justify-center items-center"
            key={i + '1'}
          >
            {item.map((val, j) => (
              <div
                className={cn(
                  'cursor-pointer w-full h-full border border-sky-600 justify-center items-center flex transition-all rounded-md text-white',
                  {
                    'bg-[#4bddee]': (i + j) % 2 !== 0,
                    'bg-sky-400': (i + j) % 2 === 0,
                    "hover:scale-105":grid[i][j]==="",
                  }
                )}
                key={j + ''}
                onClick={() => handleClick(i, j)}
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-10 flex w-full gap-10 items-center justify-center">
        <div className="text-center">
          <div className="">O</div>
          <div className="">{scoreO}</div>
        </div>
        <div className="text-center">
          <div className="">Tie</div>
          <div className="">{scoreTie}</div>
        </div>
        <div className="text-center">
          <div className="">X</div>
          <div className="">{scoreX}</div>
        </div>
      </div>

      {modalMessage && <Modal message={modalMessage} onRestart={handleRestart} />}
    </div>
  );
}
