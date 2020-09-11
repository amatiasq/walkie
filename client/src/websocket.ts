import { IncomingMessage } from '../../shared/IncomingMessage';
import { OutgoingMessage } from '../../shared/OutgoingMessage';

const webSocket = new WebSocket('wss://amongus.amatiasq.com');

export function onMessage(listener: (data: OutgoingMessage) => void) {
  webSocket.onmessage = x => listener(JSON.parse(x.data));
}

export function send(value: IncomingMessage) {
  webSocket.send(JSON.stringify(value));
}
