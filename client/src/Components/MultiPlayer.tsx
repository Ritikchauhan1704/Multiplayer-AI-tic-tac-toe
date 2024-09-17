import {useEffect, useState} from 'react';
import useSocket from '../useSocket';
import Grid from './Grid';
export default function MultiPlayer() {
  const {wsInstance, error, isWSReady} = useSocket();
  const [grid, setGrid] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  useEffect(()=>{
    if(wsInstance && isWSReady){
      wsInstance.send(JSON.stringify(grid))
      wsInstance.onmessage=(e)=>{
        console.log(e.data);
        setGrid(JSON.parse(e.data))
      }
    }
  },[grid,wsInstance,isWSReady])
  if(!error)
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <Grid grid={grid} setGrid={setGrid} />
    </div>
  );
}
