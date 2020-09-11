import { Server, IncomingMessage } from 'http';
import { Server as WebSocketServer } from 'ws';
import WebSocket = require('ws');

export declare class NiceSocket extends WebSocket {
  sendJson<T extends object>(value: T): void;
  onJsonMessage<T extends object>(
    listener: (this: NiceSocket, data: T) => void,
  ): this;
}

export declare class NiceSocketServer extends WebSocket {
  onConnection(
    listener: (
      this: NiceSocketServer,
      socket: NiceSocket,
      request: IncomingMessage,
    ) => void,
  ): this;
}

export function bindWebsocketTo(server: Server): NiceSocketServer {
  const wss = new WebSocketServer({ server });
  const niceWss: NiceSocketServer = {
    __proto__: wss,
    onConnection(
      listener: (
        this: NiceSocketServer,
        socket: NiceSocket,
        request: IncomingMessage,
      ) => void,
    ): NiceSocketServer {
      wss.on('connection', (ws, req) => {
        const nice: NiceSocket = {
          __proto__: ws,

          sendJson<T extends object>(value: T): void {
            ws.send(JSON.stringify(value));
          },

          onJsonMessage<T extends object>(
            listener: (this: WebSocket, data: T) => void,
          ): NiceSocket {
            ws.on('message', msg => {
              let data;
              try {
                data = JSON.parse(msg as string);
              } catch (e) {
                console.warn('Invalid JSON:', msg);
                return;
              }
              listener.call(nice, data);
            });
            return nice;
          },
        } as any;

        listener.call(niceWss, nice, req);
      });

      return niceWss;
    },
  } as any;

  return niceWss;
}
