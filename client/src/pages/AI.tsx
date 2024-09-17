import {useEffect, useState} from 'react';
import useSocket from '../useSocket';
import {cn} from '../utils/cn';
import MultplayerGrid from '../Components/MultiplayerGrid';

export default function AI() {
  const {wsInstance, isWSReady} = useSocket('ai');
  const [grid, setGrid] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [move, setMove] = useState<'X' | 'O'>('O');
  const [currMove, setCurrMove] = useState<'X' | 'O'>('O');

  useEffect(() => {
    if (wsInstance) {
      wsInstance.onmessage = (e) => {
        const res = e.data.toString();
        const {type, data, move: newMove, currMove: newMove2} = JSON.parse(res);

        if (type === 'start') {
          console.log('start the game');
          setGrid(data)
          // setMove(newMove);
          // setCurrMove(newMove2);
        }

        if (type === 'DATA') {
          setGrid(data);
          // setCurrMove(newMove2);
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


  return (
    <div className="h-screen w-full flex bg-sky-400 items-center">
      <div className={cn('w-[25%] h-full flex flex-col items-center justify-center transition-all bg-opacity-50', {
        ' bg-sky-500': currMove === move,
      })}>
        <div className="">YOU</div>
        <div className="">"O"</div>
      </div>
      <div className="w-[50%] flex justify-center items-center h-full">
        <MultplayerGrid
          grid={grid}
          setGrid={setGrid}
          move={move}
          ws={wsInstance}
          currMove={currMove}
          type="ai"
        />
      </div>
      <div className={cn('w-[25%] h-full flex flex-col items-center justify-center transition-all bg-opacity-50', {
        ' bg-sky-500': currMove === (move === 'O' ? 'X' : 'O'),
      })}>
        <div className="">AI</div>
        <div className="">"X"</div>
      </div>
    </div>
  );
}
