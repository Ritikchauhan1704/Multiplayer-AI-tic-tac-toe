import {WebSocket} from 'ws';

export type clientType = {
  ws: WebSocket;
  move: 'O' | 'X';
};

export type roomType = {
  id: string;
  clients: clientType[];
  clientCount: number;
  currMove: 'X' | 'O';
};
