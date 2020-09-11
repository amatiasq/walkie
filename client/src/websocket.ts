import { IncomingMessage } from './../../server/src/IncomingMessage';
import { OutgoingMessage } from './../../server/src/OutgoingMessage';

const webSocket = new WebSocket('ws://localhost:9000');

export function onMessage(listener: (data: OutgoingMessage) => void) {
  webSocket.onmessage = x => listener(JSON.parse(x.data));
}

export function send(value: IncomingMessage) {
  webSocket.send(JSON.stringify(value));
}

// // Set up an asynchronous communication channel that will be
// // used during the peer connection setup
// const signalingChannel = new SignalingChannel(remoteClientId);

// signalingChannel.addEventListener('message', (message) => {
//   // New message from remote client received
// });

// // Send an asynchronous message to the remote client
// signalingChannel.send('Hello!');

// const configuration = {
//   iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
// };

// async function sendConnectionOffer() {
//   const peerConnection = new RTCPeerConnection(configuration);

//   signalingChannel.addEventListener('message', async (message: any) => {
//     if (message.answer) {
//       const remoteDesc = new RTCSessionDescription(message.answer);
//       await peerConnection.setRemoteDescription(remoteDesc);
//     }
//   });

//   const offer = await peerConnection.createOffer();
//   await peerConnection.setLocalDescription(offer);
//   signalingChannel.send({ offer: offer });
// }

// async function acceptConnectionOffer() {
//   const peerConnection = new RTCPeerConnection(configuration);
//   signalingChannel.addEventListener('message', async (message: any) => {
//     if (message.offer) {
//       peerConnection.setRemoteDescription(
//         new RTCSessionDescription(message.offer),
//       );
//       const answer = await peerConnection.createAnswer();
//       await peerConnection.setLocalDescription(answer);
//       signalingChannel.send({ answer: answer });
//     }
//   });
// }
