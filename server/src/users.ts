import { v4 as uuidv4 } from 'uuid';
import { NiceSocket } from './websocket';

const users = new Map<string, User>();

export function isUsernameAvailable(name: string) {
  return !users.has(name);
}

export function getUser(name: string) {
  return users.get(name);
}

export function registerUser(ws: NiceSocket, name: string) {
  const user = ws as User;
  user.id = uuidv4();
  user.name = name;
  users.set(name, user);
  return user;
}

export function removeUser(ws: NiceSocket) {
  const { name } = ws as User;

  if (!name) {
    return false;
  }

  users.delete(name);
  return true;
}

export function getConnectedUsers() {
  return Array.from(users.values());
}

export function serializeUser({ id, name }: User) {
  return { id, name };
}

export interface SerializedUser {
  id: string;
  name: string;
}

export type User = NiceSocket & SerializedUser;
