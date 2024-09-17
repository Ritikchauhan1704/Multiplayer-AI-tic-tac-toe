import {useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
export default function Home() {
  const navigate = useNavigate();
  const redirect = (to: string) => {
    // console.log(to);
    if(to==="Offline"){
      navigate(to);
      return;
    }
    const id=uuidv4();
    navigate(to+"/"+id)

  };
  return (
    <div className="h-screen w-full flex  items-center flex-col bg-sky-400 ">
      <h1 className="text-4xl text-white mt-32">Welcome to Tic Tac Toe</h1>
      <div className="mt-10 flex flex-col gap-3 items-center">
        <div className="mb-5">Choose an Options</div>
        <div
          className="hover:text-white cursor-pointer"
          onClick={() => redirect('ai')}
        >
          Player vs AI
        </div>
        <div
          className="hover:text-white cursor-pointer"
          onClick={() => redirect('Offline')}
        >
          Player vs Player (Offline)
        </div>
        <div
          className="hover:text-white cursor-pointer"
          onClick={() => redirect('Online')}
        >
          Player vs Player (Online)
        </div>
      </div>
    </div>
  );
}
