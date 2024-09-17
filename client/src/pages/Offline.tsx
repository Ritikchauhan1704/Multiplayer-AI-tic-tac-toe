import {useState} from 'react';
import Grid from '../Components/Grid';
import {cn} from '../utils/cn';

export default function Offline() {
  const [grid, setGrid] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [move, setMove] = useState<'X' | 'O'>('O');

  return (
    <div className="h-screen w-full flex bg-sky-400 items-center ">
      <div
        className={cn(
          'w-[25%] h-full flex flex-col items-center justify-center transition-all ',
          {
            'bg-opacity-50 bg-sky-500': move == 'O',
          }
        )}
      >
        
        <div className="">Player 1</div>
        <div className="">"O"</div>
      </div>
      <div className="w-[50%] flex justify-center items-center h-full">
        <Grid grid={grid} setGrid={setGrid} move={move} setMove={setMove} />
      </div>
      <div
        className={cn(
          'w-[25%] h-full flex flex-col items-center justify-center transition-all',
          {
            'bg-opacity-50 bg-sky-500': move == 'X',
          }
        )}
      >
        <div className="">Player 2</div>
        <div className="">"X"</div>
      </div>
    </div>
  );
}
