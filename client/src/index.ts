import { IncomingMessageType } from '../../shared/IncomingMessage';
import {
  OutgoingMessage,
  OutgoingMessageType,
} from '../../shared/OutgoingMessage';
import { RoomName } from '../../shared/SerializedUser';
import { beep, captureAudio } from './audio';
import { confirm, getUserName, log, renderUsername } from './ui';
import {
  getUserById,
  onUserClicked,
  refreshUserList,
  setUserList,
  User,
  userConnected,
  userDisconnected,
} from './users';
import { Channel } from './webrtc';
import { Socket } from './websocket';

const room = location.hash as RoomName;
const t = OutgoingMessageType;
const socket = new Socket('wss://api.amatiasq.com/walkie');
let username = '';

onUserClicked(toggleCall);

socket.onMessage(t.HANDSHAKE, login);
socket.onMessage(t.LOGIN_RESULT, data => handleLoginResult(data));
socket.onMessage(t.USER_CONNECTED, data => userConnected(data.user));
socket.onMessage(t.USER_DISCONNECTED, data => userDisconnected(data.user));

socket.onMessage(t.RECEIVE_OFFER, data => {
  const user = getUserById(data.from);
  if (!user) throw new Error(`WTF! Unwknown user ${data.from}`);
  return receiveOffer(user, data.offer);
});

async function login() {
  const name = await getUserName();
  renderUsername(name);
  username = name;

  socket.send({
    type: IncomingMessageType.LOGIN,
    room,
    name,
  });
}

function handleLoginResult(data: OutgoingMessage) {
  if (data.type !== OutgoingMessageType.LOGIN_RESULT) {
    return;
  }

  if (!data.success) {
    alert(data.message);
    sessionStorage.clear();
    location.reload();
    return;
  }

  // log(`Conectado como ${username}`);

  if (data.users.length) {
    const userList = data.users.map(x => `<li>${x.name}</li>`).join('');
    log(`Personas en la habitación: <ul>${userList}</ul>`);
  }

  setUserList(data.users);
}

function toggleCall(user: User) {
  if (!user.isCalling) {
    return callUser(user);
  }

  user.hangup();
  return socket.send({
    type: IncomingMessageType.END_CONNECTION,
    to: user.id,
  });
}

async function callUser(user: User) {
  log(`Iniciando llamada a ${user.name}...`);
  const conn = new Channel(user, m => socket.send(m));
  const stream = await captureAudio();

  listenToSocket(conn, socket, user);

  stream.getTracks().forEach(x => conn.addTrack(x, stream));
  conn.sendOffer();
  log(`Enviando solicitud de llamada a ${user.name}...`);

  user.callStarted(conn);
  return conn;
}

async function receiveOffer(user: User, offer: RTCSessionDescription) {
  log(`${user.name} quiere iniciar una llamada`);
  beep();
  const shouldAnswer = await confirm(
    `${user.name} quiere iniciar una llamada.<br>Contestar?`,
  );

  if (!shouldAnswer) {
    log(`Llamada de ${user.name} rechazada`);
    socket.send({
      type: IncomingMessageType.OFFER_REJECTED,
      to: user.id,
    });
    return;
  }

  log(`Llamada de ${user.name} aceptada`);
  const conn = new Channel(user, m => socket.send(m));
  const stream = await captureAudio();

  listenToSocket(conn, socket, user);

  stream.getTracks().forEach(x => conn.addTrack(x, stream));
  conn.receiveOffer(offer);
  log(`Enviando respuesta a ${user.name}...`);

  user.callStarted(conn);
  return conn;
}

function listenToSocket(conn: Channel, socket: Socket, user: User) {
  socket.onMessage(
    OutgoingMessageType.OFFER_REJECTED,
    ifFromUser(() => {
      log(`${user.name} ha rechazado la llamada.`);
      user.hangup();
    }),
  );

  socket.onMessage(
    OutgoingMessageType.RECEIVE_ANSWER,
    ifFromUser(message => conn.receiveAnswer(message.answer)),
  );

  socket.onMessage(
    OutgoingMessageType.END_CONNECTION,
    ifFromUser(() => {
      log(`${user.name} ha terminado la llamada.`);
      user.hangup();
      refreshUserList();
    }),
  );

  function ifFromUser<T>(action: (x: T) => void) {
    return (message: T) => {
      if ((message as any).from === user.id) {
        return action(message);
      }
    };
  }
}
