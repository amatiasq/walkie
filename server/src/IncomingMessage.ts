export enum IncomingMessageType {
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SEND_OFFER = 'SEND_OFFER',
  SEND_ANSWER = 'SEND_ANSWER',
  SEND_CANDIDATE = 'SEND_CANDIDATE',
}

interface IncomingMessage_Base {
  type: IncomingMessageType;
}

interface IncomingMessage_ERROR extends IncomingMessage_Base {
  type: IncomingMessageType.ERROR;
  message: string;
}

interface IncomingMessage_LOGIN extends IncomingMessage_Base {
  type: IncomingMessageType.LOGIN;
  name: string;
}

interface IncomingMessage_LOGOUT extends IncomingMessage_Base {
  type: IncomingMessageType.LOGOUT;
}

interface IncomingMessage_SEND_OFFER extends IncomingMessage_Base {
  type: IncomingMessageType.SEND_OFFER;
  to: string;
  offer: RTCSessionDescription;
}

interface IncomingMessage_SEND_ANSWER extends IncomingMessage_Base {
  type: IncomingMessageType.SEND_ANSWER;
  to: string;
  answer: RTCSessionDescription;
}

interface IncomingMessage_SEND_CANDIDATE extends IncomingMessage_Base {
  type: IncomingMessageType.SEND_CANDIDATE;
  to: string;
  candidate: RTCIceCandidate;
}

export type IncomingMessage =
  | IncomingMessage_ERROR
  | IncomingMessage_LOGIN
  | IncomingMessage_LOGOUT
  | IncomingMessage_SEND_OFFER
  | IncomingMessage_SEND_ANSWER
  | IncomingMessage_SEND_CANDIDATE;
