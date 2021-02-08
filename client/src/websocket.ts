import { IncomingMessage } from '../../shared/IncomingMessage';
import {
  OutgoingMessage,
  OutgoingMessageType,
} from '../../shared/OutgoingMessage';
import { logAllEvents } from './debug';

const DEFAULT_RECONNECTION_DELAY = 100;
const MAX_RECONNECT_ATTEMPTS = 14;

type Listener = (message: OutgoingMessage) => void;

type TypedMessage<T extends OutgoingMessageType> = Extract<
  OutgoingMessage,
  { type: T }
>;

export class Socket {
  private ws: WebSocket;
  private reconnectionDelay = DEFAULT_RECONNECTION_DELAY;
  private reconnectAttempts = 0;
  private isReconnecting = false;
  private readonly listeners = new Map<OutgoingMessageType, Listener[]>();

  constructor(public readonly uri: string) {
    this.ws = this.init();
  }

  onMessage<T extends OutgoingMessageType>(
    type: T,
    listener: (message: TypedMessage<T>) => void,
  ) {
    if (this.listeners.has(type)) {
      this.listeners.get(type)!.push(listener as any);
    } else {
      this.listeners.set(type, [listener as any]);
    }
  }

  send(value: IncomingMessage) {
    this.ws.send(JSON.stringify(value));
  }

  private init() {
    const socket = new WebSocket('wss://api.amatiasq.com/walkie');

    logAllEvents(socket, 'WebSocket');

    socket.onerror = () => this.reconnect();
    socket.onclose = () => this.reconnect();
    socket.onmessage = e => this.processMessage(e);

    return socket;
  }

  private reconnect() {
    if (this.reconnectAttempts > MAX_RECONNECT_ATTEMPTS) {
      console.error(
        `Websocket aborted after ${this.reconnectAttempts} attempts`,
      );
      return;
    }

    if (this.isReconnecting) {
      return;
    }
    this.isReconnecting = true;

    console.warn(`Socket closed. Waiting ${this.reconnectionDelay / 1000}s`);
    setTimeout(() => {
      console.warn('Reconnecting...');
      this.reconnectionDelay *= 2;
      this.reconnectAttempts++;
      this.isReconnecting = false;
      this.ws = this.init();
    }, this.reconnectionDelay);
  }

  private processMessage(event: MessageEvent) {
    this.reconnectionDelay = DEFAULT_RECONNECTION_DELAY;
    this.reconnectAttempts = 0;

    const message = JSON.parse(event.data) as OutgoingMessage;
    const listeners = this.listeners.get(message.type);

    console.debug(message.type, message);

    if (listeners) {
      listeners.forEach(x => x(message));
    } else {
      console.log(`Unhandled message: ${message.type}`);
    }
  }
}
