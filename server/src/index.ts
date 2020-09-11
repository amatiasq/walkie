import { createServer } from 'http';

import {
  IncomingMessage,
  IncomingMessageType,
} from '../../shared/IncomingMessage';
import {
  OutgoingMessage,
  OutgoingMessageType,
} from '../../shared/OutgoingMessage';
import {
  getConnectedUsers,
  getUser,
  isUsernameAvailable,
  registerUser,
  removeUser,
  serializeUser,
  User,
} from './users';
import { bindWebsocketTo, NiceSocket } from './websocket';

const port = process.env.PORT || 9000;
const server = createServer((req, res) => {});
const webSocketServer = bindWebsocketTo(server);

webSocketServer.onConnection(ws => {
  ws.onJsonMessage<IncomingMessage>(data => processMessage(ws, data));
  ws.on('close', () => logout(ws));

  ws.sendJson<OutgoingMessage>({
    type: OutgoingMessageType.HANDSHAKE,
    message: 'Salve, adalid...',
  });
});

server.listen(port, () => console.log(`Websocket server ready at ${port}`));

function processMessage(ws: NiceSocket, data: IncomingMessage) {
  const user = ws as User;

  switch (data.type) {
    case IncomingMessageType.LOGIN:
      return attemptLogin(ws, data.name);
    case IncomingMessageType.LOGOUT:
      return logout(ws);
    case IncomingMessageType.SEND_OFFER:
      return deflect(user, data, OutgoingMessageType.RECEIVE_OFFER);
    case IncomingMessageType.SEND_ANSWER:
      return deflect(user, data, OutgoingMessageType.RECEIVE_ANSWER);
    case IncomingMessageType.SEND_CANDIDATE:
      return deflect(user, data, OutgoingMessageType.RECEIVE_CANDIDATE);
    default:
      ws.sendJson({
        type: OutgoingMessageType.ERROR,
        message: `DAFUK U MEAN WITH ${data.type}!?!?`,
      });
  }
}

function attemptLogin(ws: NiceSocket, name: string): void {
  if (!isUsernameAvailable(name)) {
    return ws.sendJson<OutgoingMessage>({
      type: OutgoingMessageType.LOGIN_RESULT,
      success: false,
      message: 'Username is unavailable',
    });
  }

  const otherUsers = getConnectedUsers();
  const newUser = registerUser(ws, name);

  ws.sendJson<OutgoingMessage>({
    type: OutgoingMessageType.LOGIN_RESULT,
    success: true,
    users: otherUsers.map(serializeUser),
  });

  for (const user of otherUsers) {
    user.sendJson<OutgoingMessage>({
      type: OutgoingMessageType.USER_CONNECTED,
      user: serializeUser(newUser),
    });
  }

  console.log(`CONNECTED: ${name}`);
}

function logout(ws: NiceSocket) {
  if (!removeUser(ws)) {
    return;
  }

  const gone = ws as User;
  const users = getConnectedUsers();

  for (const user of users) {
    user.sendJson<OutgoingMessage>({
      type: OutgoingMessageType.USER_DISCONNECTED,
      user: serializeUser(gone),
    });
  }

  console.log(`DISCONNETED: ${gone.name}`);
}

function deflect(from: User, data: IncomingMessage, type: OutgoingMessageType) {
  const { type: _, to, ...rest } = data as IncomingMessage & { to: string };
  const target = getUser(to);

  if (!target) {
    return from.sendJson<OutgoingMessage>({
      type: OutgoingMessageType.ERROR,
      message: `User "${name}" is not connected`,
    });
  }

  console.log(`DEFLECT from ${from.name} to ${to} - ${_}`);
  target.sendJson({
    type,
    from: from.name,
    ...rest,
  });
}
