import {useEffect, useState} from 'react';
import useSocket from '../useSocket';
import {cn} from '../utils/cn';
import MultplayerGrid from '../Components/MultiplayerGrid';

export default function Online() {
  const {wsInstance, isWSReady} = useSocket('online');
  const [grid, setGrid] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [move, setMove] = useState<'X' | 'O'>('O');
  const [currMove, setCurrMove] = useState<'X' | 'O'>('O');
  const [waiting, setWaiting] = useState(true); // Add waiting state

  useEffect(() => {
    if (wsInstance) {
      wsInstance.onmessage = (e) => {
        const res = e.data.toString();
        const {type, data, move: newMove, currMove: newMove2} = JSON.parse(res);

        if (type === 'waiting') {
          setWaiting(true); // Set waiting state
          console.log('Waiting for another player...');
        }

        if (type === 'start') {
          console.log('start the game');
          setGrid(data)
          setMove(newMove);
          setCurrMove(newMove2);
          setWaiting(false); // Stop waiting when the game starts
          console.log("start",move,newMove2);
        }

        if (type === 'DATA') {
          setGrid(data);
          setCurrMove(newMove2);
          console.log("data",move,newMove2);
          
        }
      };
    }
  }, [wsInstance]);

  if (!(wsInstance && isWSReady)) {
    return (
      <div className="h-screen w-full flex bg-sky-400 items-center">
        Waiting for connection...
      </div>
    );
  }

  if (waiting) {
    return (
      <div className="h-screen w-full flex bg-sky-400 items-center">
        Waiting for another player to join...
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex bg-sky-400 items-center">
      <div className={cn('w-[25%] h-full flex flex-col items-center justify-center transition-all bg-opacity-50', {
        ' bg-sky-500': currMove === move,
      })}>
        <div className="">YOU</div>
        <div className="">"{move}"</div>
      </div>
      <div className="w-[50%] flex justify-center items-center h-full">
        <MultplayerGrid
          grid={grid}
          setGrid={setGrid}
          move={move}
          ws={wsInstance}
          currMove={currMove}
          type="online"
        />
      </div>
      <div className={cn('w-[25%] h-full flex flex-col items-center justify-center transition-all bg-opacity-50', {
        ' bg-sky-500': currMove === (move === 'O' ? 'X' : 'O'),
      })}>
        <div className="">Enemy</div>
        <div className="">"{move === 'O' ? 'X' : 'O'}"</div>
      </div>
    </div>
  );
}
