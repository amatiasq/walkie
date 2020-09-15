import { JsonSocket } from '@amatiasq/json-socket';
import { IncomingMessage } from '../../shared/IncomingMessage';
import {
  OutgoingMessage,
  OutgoingMessageType,
} from '../../shared/OutgoingMessage';

export class Socket {
  private readonly socket = new JsonSocket<OutgoingMessage, IncomingMessage>(
    this.uri,
  );
  private readonly listeners = new Map<OutgoingMessageType, Listener[]>();

  constructor(public readonly uri: string) {
    this.socket.onMessage(e => this.processMessage(e));
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
    this.socket.send(value);
  }

  private processMessage(message: OutgoingMessage): void {
    const listeners = this.listeners.get(message.type);

    console.debug(message.type, message);

    if (listeners) {
      listeners.forEach(x => x(message));
    } else {
      console.log(`Unhandled message: ${message.type}`);
    }
  }
}

type Listener = (message: OutgoingMessage) => void;

type TypedMessage<T extends OutgoingMessageType> = Extract<
  OutgoingMessage,
  { type: T }
>;
