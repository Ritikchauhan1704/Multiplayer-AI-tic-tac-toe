import { roomType } from "../types";

export const getRoom = (rooms:roomType[],id: string) => {
  return rooms.find((room) => room.id === id);
};

export const createRoom = (rooms:roomType[],id: string) => {
  const newRoom: roomType = {
    id,
    clients: [],
    clientCount: 0,
    currMove: 'O',
  };
  rooms.push(newRoom);
  return newRoom;
};
