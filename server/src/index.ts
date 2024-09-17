import http from 'http';
import {WebSocketServer} from "ws"
import {app} from './app';
import dotenv from 'dotenv';
dotenv.config();

const server = http.createServer(app);

export const wss = new WebSocketServer({server});
import "./socket"


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
