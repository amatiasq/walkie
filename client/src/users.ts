import { SerializedUser } from '../../shared/SerializedUser';
import { log, renderUsers } from './ui';
import { PeerConnection } from './webrtc';

let users: User[] = [];
let onClick: Function;

export function onUserClicked(_onClick: Function) {
  onClick = _onClick;
}

export function refreshUserList() {
  renderUsers(users, onClick);
}

export function setUserList(list: SerializedUser[]) {
  users = list.map(unserializeUser).map(x => getUserByName(x.name) || x);
  refreshUserList();
}

function unserializeUser(user: SerializedUser) {
  return new User(user);
}

export function getUserById(id: string) {
  return users.find(x => x.id === id);
}

export function getUserByName(name: string) {
  return users.find(x => x.name === name);
}

export function userConnected(user: SerializedUser) {
  log(`${user.name} online`);
  users.push(unserializeUser(user));
  refreshUserList();
}

export function userDisconnected(user: SerializedUser) {
  log(`${user.name} offline`);
  users = users.filter(x => x.id !== user.id);
  refreshUserList();
}

export class User {
  id;
  room;
  name;

  private connection: PeerConnection | null = null;
  get isCalling() {
    return Boolean(this.connection);
  }
  get isAnswered() {
    return this.connection?.hasTracks;
  }

  get peerConnection() {
    return this.connection;
  }

  constructor(serialized: SerializedUser) {
    this.id = serialized.id;
    this.room = serialized.room;
    this.name = serialized.name;
  }

  callStarted(connection: PeerConnection) {
    this.connection = connection;
  }

  hangup() {
    this.connection?.end();
    this.connection = null;
  }
}
