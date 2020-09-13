import { IncomingMessageType } from '../../shared/IncomingMessage';
import {
  OutgoingMessage,
  OutgoingMessageType,
} from '../../shared/OutgoingMessage';
import { captureAudio } from './audio';
import { forceUserToSetName, renderUsername } from './ui';
import {
  getUserByName,
  onUserClicked,
  setUserList,
  User,
  userConnected,
  userDisconnected,
} from './users';
import { PeerConnection } from './webrtc';
import { Socket } from './websocket';

const t = OutgoingMessageType;
const socket = new Socket('wss://amongus.amatiasq.com');

onUserClicked(toggleCall);

socket.onMessage(t.HANDSHAKE, login);
socket.onMessage(t.LOGIN_RESULT, data => handleLoginResult(data));
socket.onMessage(t.USER_CONNECTED, data => userConnected(data.user));
socket.onMessage(t.USER_DISCONNECTED, data => userDisconnected(data.user));

socket.onMessage(t.RECEIVE_OFFER, data => {
  const user = getUserByName(data.from);
  return receiveOffer(user, data.offer);
});

function login() {
  const name = forceUserToSetName();
  renderUsername(name);

  socket.send({
    type: IncomingMessageType.LOGIN,
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

  setUserList(data.users);
}

function toggleCall(user: User) {
  return user.isCalling ? user.hangup() : callUser(user);
}

async function callUser(user: User) {
  const conn = new PeerConnection(user, m => socket.send(m));
  const stream = await captureAudio();

  listenToSocket(conn, socket, user);

  stream.getTracks().forEach(x => conn.addTrack(x, stream));
  conn.sendOffer();

  user.callStarted(conn);
  return conn;
}

async function receiveOffer(user: User, offer: RTCSessionDescription) {
  const conn = new PeerConnection(user, m => socket.send(m));
  const stream = await captureAudio();

  listenToSocket(conn, socket, user);

  stream.getTracks().forEach(x => conn.addTrack(x, stream));
  conn.receiveOffer(offer);

  user.callStarted(conn);
  return conn;
}

function listenToSocket(conn: PeerConnection, socket: Socket, user: User) {
  socket.onMessage(
    OutgoingMessageType.RECEIVE_ANSWER,
    ifFromUser(message => conn.receiveAnswer(message.answer)),
  );

  socket.onMessage(
    OutgoingMessageType.RECEIVE_CANDIDATE,
    ifFromUser(message => conn.receiveCandidate(message.candidate)),
  );

  function ifFromUser<T>(action: (x: T) => void) {
    return (message: T) => {
      if ((message as any).from === user.name) {
        return action(message);
      }
    };
  }
}
