import {wss} from '.';
import {roomType} from './types';
import {AI} from './utils/ai';
import {createRoom, getRoom} from './utils/room';

const rooms: roomType[] = [];

wss.on('connection', async (ws) => {
  console.log('New connection');

  ws.onmessage = async (e) => {
    const res = e.data.toString();
    const {id, type, msg, data} = JSON.parse(res);

    if (type === 'online') {
      let room = getRoom(rooms, id);
      if (msg === 'NEW') {
        if (!room) {
          room = createRoom(rooms, id);
          console.log(`New room created with id: ${id}`);
        }

        if (room.clientCount >= 2) {
          ws.send(JSON.stringify({type: 'error', msg: 'Room full'}));
          console.log(`Room ${id} is full. Connection refused.`);
          return;
        }

        const existingClient = room.clients.some((client) => client.ws === ws);
        if (!existingClient) {
          let assignedMove: 'O' | 'X' = 'O';
          if (room.clients.some((client) => client.move === 'O')) {
            assignedMove = 'X';
          }

          room.clients.push({ws, move: assignedMove});
          room.clientCount++;

          console.log(
            `Client added to room ${id}, total clients: ${room.clientCount}`
          );

          // Send waiting message if only one player
          if (room.clientCount === 1) {
            ws.send(
              JSON.stringify({
                type: 'waiting',
                msg: 'Waiting for another player to join...',
              })
            );
          }
        }

        if (room.clientCount === 2) {
          console.log(`Starting game in room ${id}`);
          room.clients.forEach((client) => {
            client.ws.send(
              JSON.stringify({
                type: 'start',
                msg: 'Game starting!',
                move: client.move,
                currMove: 'O',
                data: [
                  ['', '', ''],
                  ['', '', ''],
                  ['', '', ''],
                ],
              })
            );
          });
        }
      } else if (msg === 'DATA') {
        if (room) {
          if (room.clientCount === 1) {
            ws.send(
              JSON.stringify({
                type: 'waiting',
                msg: 'Waiting for another player to join...',
              })
            );
          }
          let currMove = room?.currMove;
          room.currMove = currMove === 'X' ? 'O' : 'X';
          console.log('data', room.currMove);
          room.clients.forEach((client) => {
            client.ws.send(
              JSON.stringify({
                type: 'DATA',
                data,
                currMove: room?.currMove,
              })
            );
          });
        }
      } else if (msg === 'restart') {
        if (room) {
          room.currMove = 'O';
          room.clients.forEach((client) => {
            client.ws.send(
              JSON.stringify({
                type: 'start',
                msg: 'Game starting!',
                move: client.move,
                currMove: 'O',
                data: [
                  ['', '', ''],
                  ['', '', ''],
                  ['', '', ''],
                ],
              })
            );
          });
        }
      }
    }
    if (type === 'ai') {
      if (msg === 'restart') {
        ws.send(
          JSON.stringify({
            type: 'start',
            data: [
              ['', '', ''],
              ['', '', ''],
              ['', '', ''],
            ],
          })
        );
      }
      if (msg === 'DATA') {
        const [i, j] = await AI(data);
        if (!(i == -1 || j == -1)) data[i][j] = 'X';
        ws.send(
          JSON.stringify({
            type: 'DATA',
            data,
            currMove: 'O',
          })
        );
      }
    }
  };

  ws.onclose = () => {
    // Handle client disconnects
    for (let room of rooms) {
      // Find the index of the client with matching WebSocket (ws)
      const index = room.clients.findIndex((client) => client.ws === ws);

      if (index !== -1) {
        // Remove the client from the room
        room.clients.splice(index, 1);
        room.clientCount--;

        console.log(
          `Client removed from room ${room.id}, total clients: ${room.clientCount}`
        );

        // If there are no more clients in the room, you can optionally remove the room as well
        if (room.clientCount === 0) {
          const roomIndex = rooms.indexOf(room);
          rooms.splice(roomIndex, 1);
          console.log(`Room ${room.id} is now empty and removed.`);
        }

        break;
      }
    }
  };
});
