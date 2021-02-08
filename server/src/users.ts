import { UserId } from './../../shared/SerializedUser';
import { v4 as uuidv4 } from 'uuid';

import {
  RoomName,
  SerializedUser,
  UserName,
} from '../../shared/SerializedUser';
import { NiceSocket } from './websocket';

const users: User[] = [];

export function isUsernameAvailable(room: RoomName, name: UserName) {
  return !users.some(match(room, name));
}

export function getUserById(id: UserId) {
  return users.find(x => x.id === id);
}

export function getUser(room: RoomName, name: UserName) {
  return users.find(match(room, name));
}

export function registerUser(ws: NiceSocket, room: RoomName, name: UserName) {
  const user = ws as User;
  user.id = uuidv4() as UserId;
  user.room = room;
  user.name = name;
  users.push(user);
  return user;
}

export function removeUser(ws: NiceSocket) {
  const { room, name } = ws as User;

  if (!name) {
    return false;
  }

  const index = users.findIndex(match(room, name));
  users.splice(index, 1);
  return true;
}

export function getUsersByRoom(room: RoomName) {
  return users.filter(x => x.room === room);
}

export function getConnectedUsers() {
  return Array.from(users.values());
}

export function serializeUser({ id, name, room }: User) {
  return { id, name, room };
}

export type User = NiceSocket & SerializedUser;

function match(room: string, name: string) {
  return (x: SerializedUser) => x.room === room && x.name === name;
}
