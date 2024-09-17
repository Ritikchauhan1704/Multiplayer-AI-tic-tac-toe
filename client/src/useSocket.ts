import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

// interface SocketProps{
//   type:string
// }

export default function useSocket(type:string) {
  const [wsInstance, setWsInstance] = useState<WebSocket | null>(null);
  const [isWSReady, setIsWSReady] = useState(false)
  const [error, setError] = useState(false)
  
  const {id}=useParams();
  useEffect(() => {
    const data={id,type,msg:"NEW"}
    const url=import.meta.env.VITE_WEBSOCKET_URL;
    console.log(url);
    
    if (!wsInstance) {
      const ws = new WebSocket(url);
      const timeoutId = setTimeout(() => {
        if (ws.readyState !== 1) {
          ws.close();
          setError(true);
        }
      }, 5000);

      ws.onopen = () => {
        console.log('[DEBUG] open');
        ws.send(JSON.stringify(data));
        clearTimeout(timeoutId);
        setError(false);
        setIsWSReady(true);
      };

      ws.onerror = () => {
        clearTimeout(timeoutId);
        setError(true);
      };

      ws.onclose = () => {
        clearTimeout(timeoutId);
        setError(true);
        console.log('[DEBUG] closed');
      };
      setWsInstance(ws);
    }
    return () => {
      wsInstance?.close();
      console.log('connection closed');
    };
  }, [wsInstance]);

  return {wsInstance,error,isWSReady};
}
