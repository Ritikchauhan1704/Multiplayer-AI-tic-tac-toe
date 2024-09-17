import {Outlet, useNavigate} from 'react-router-dom';

export default function App() {
  const navigate=useNavigate();
  return (
    <div className='relative'>
      <button className='absolute z-10 top-3 right-6 bg-sky-600 py-2 px-4 rounded-full hover:bg-sky-700 transition-all' onClick={()=>{
        navigate("/");
      }}>Home</button>
      <Outlet />
    </div>
  );
}
