import { PeerConnection } from './webrtc';
import { SerializedUser } from '../../shared/SerializedUser';
import { renderUsers } from './ui';

let users: User[] = [];
let onClick: Function;

export function onUserClicked(_onClick: Function) {
  onClick = _onClick;
}

export function setUserList(list: SerializedUser[]) {
  users = list.map(unserializeUser);
  renderUsers(users, onClick);
}

function unserializeUser(user: SerializedUser) {
  return new User(user);
}

export function getUserByName(name: string) {
  const user = users.find(x => x.name === name);

  if (!user) {
    throw new Error(`Can't find user "${name}"`);
  }

  return user;
}

export function userConnected(user: SerializedUser) {
  console.log('CONNECTED', user);
  users.push(unserializeUser(user));
  renderUsers(users, onClick);
}

export function userDisconnected(user: SerializedUser) {
  console.log('DISCONNECTED', user);
  users = users.filter(x => x.id !== user.id);
  renderUsers(users, onClick);
}

export class User {
  id;
  name;

  private connection: PeerConnection | null = null;
  get isCalling() {
    return Boolean(this.connection);
  }

  constructor(serialized: SerializedUser) {
    this.id = serialized.id;
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
