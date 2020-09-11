import { IncomingMessageType } from '../../shared/IncomingMessage';
import { SerializedUser } from '../../shared/SerializedUser';
import { playAudio } from './audio';
import { send } from './websocket';

const connection = new RTCPeerConnection({
  // iceServers: [{ urls: 'stun:stun.1.google.com:19302' }],
  // offerToReceiveAudio: true,
} as any);

let connectedTo: string | null = null;

export async function connectToUser(user: SerializedUser) {
  const dataChannel = connection.createDataChannel('messenger');
  dataChannel.onerror = error =>
    console.error('Error connecting to user', error);

  dataChannel.onmessage = onMessage;
  connectedTo = user.name;

  const offer = await connection.createOffer({ offerToReceiveAudio: true });
  await connection.setLocalDescription(offer);

  await send({
    type: IncomingMessageType.SEND_OFFER,
    to: user.name,
    offer: connection.localDescription!,
  });

  function onMessage({ data }: MessageEvent) {
    console.log('POLLAS', data);
    // }
  }
}

export async function onOffer(from: string, offer: RTCSessionDescription) {
  await connection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await connection.createAnswer({ offerToReceiveAudio: true });
  await connection.setLocalDescription(answer);
  await send({
    type: IncomingMessageType.SEND_ANSWER,
    to: from,
    answer: connection.localDescription!,
  });
}

export function onAnswer(from: string, answer: RTCSessionDescription) {
  return connection.setRemoteDescription(new RTCSessionDescription(answer));
}

export function onCandidate(from: string, candidate: RTCIceCandidate) {
  connection.addIceCandidate(new RTCIceCandidate(candidate));
}

export function addTrack(track: MediaStreamTrack, stream: MediaStream) {
  connection.addTrack(track, stream);
}
// //when the browser finds an ice candidate we send it to another peer
connection.onicecandidate = ({ candidate }) => {
  console.log('Candidate ready');
  if (candidate && connectedTo) {
    send({
      type: IncomingMessageType.SEND_CANDIDATE,
      to: connectedTo,
      candidate,
    });
  }
};

connection.ondatachannel = event => {
  let receiveChannel = event.channel;
  receiveChannel.onopen = () => {
    console.log('Data channel is open and ready to be used.');
  };
  receiveChannel.onmessage = onMessage;
  function onMessage({ data }: MessageEvent) {
    console.log('POLLAS2', data);
  }
};

connection.ontrack = (e: RTCTrackEvent) => {
  console.log('got track');
  playAudio(e.streams[0]);
};
