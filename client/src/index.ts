import { IncomingMessageType } from '../../shared/IncomingMessage';
import {
  OutgoingMessage,
  OutgoingMessageType,
} from '../../shared/OutgoingMessage';
import { SerializedUser } from '../../shared/SerializedUser';
import { captureAudio } from './audio';
import { renderUsername, renderUsers } from './ui';
import {
  addTrack,
  connectToUser,
  onAnswer,
  onCandidate,
  onOffer,
} from './webrtc';
import { onMessage, send } from './websocket';

// captureAudio().then(playAudio);

const users: SerializedUser[] = [];

onMessage(data => {
  // console.log(data.type);
  switch (data.type) {
    case OutgoingMessageType.HANDSHAKE:
      return login();
    case OutgoingMessageType.LOGIN_RESULT:
      return handleLoginResult(data);
    case OutgoingMessageType.USER_CONNECTED:
      return userConnected(data.user);
    case OutgoingMessageType.USER_DISCONNECTED:
      return userDisconnected(data.user);
    case OutgoingMessageType.RECEIVE_OFFER:
      return onOffer(data.from, data.offer);
    case OutgoingMessageType.RECEIVE_ANSWER:
      return onConnectionReady(data.from, data.answer);
    case OutgoingMessageType.RECEIVE_CANDIDATE:
      return onCandidate(data.from, data.candidate);
    default:
      console.log(`Unhandled message: ${data.type}`);
  }
});

function login() {
  let name = sessionStorage.getItem('amongus:username');
  while (!name) name = prompt('Username');
  sessionStorage.setItem('amongus:username', name);
  renderUsername(name);

  send({
    type: IncomingMessageType.LOGIN,
    name,
  });
}

function handleLoginResult(data: OutgoingMessage) {
  if (data.type !== OutgoingMessageType.LOGIN_RESULT) {
    return;
  }

  if (!data.success) {
    return console.error(`LOGIN FAILED: ${data.message}`);
  }

  users.push(...data.users);
  renderUsers(users, initCall);
}

function userConnected(user: SerializedUser) {
  console.log('CONNECTED', user);
  users.push(user);
  renderUsers(users, initCall);
}

function userDisconnected(user: SerializedUser) {
  console.log('DISCONNECTED', user);
  const index = users.findIndex(x => x.id === user.id);
  if (index === -1) return;
  users.splice(index, 1);
  renderUsers(users, initCall);
}

async function initCall(user: SerializedUser) {
  const stream = await captureAudio();
  console.log('sending audio');
  stream.getTracks().forEach(x => addTrack(x, stream));
  await connectToUser(user);
}

async function onConnectionReady(from: string, answer: RTCSessionDescription) {
  await onAnswer(from, answer);
}
