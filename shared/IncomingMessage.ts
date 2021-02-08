import { RoomName, UserId, UserName } from './SerializedUser';

export enum IncomingMessageType {
  ERROR = 'ERROR',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SEND_OFFER = 'SEND_OFFER',
  OFFER_REJECTED = 'OFFER_REJECTED',
  SEND_ANSWER = 'SEND_ANSWER',
  // SEND_CANDIDATE = 'SEND_CANDIDATE',
  END_CONNECTION = 'END_CONNECTION',
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
  room: RoomName;
  name: UserName;
}

interface IncomingMessage_LOGOUT extends IncomingMessage_Base {
  type: IncomingMessageType.LOGOUT;
}

interface IncomingMessage_SEND_OFFER extends IncomingMessage_Base {
  type: IncomingMessageType.SEND_OFFER;
  to: UserId;
  offer: RTCSessionDescription;
}

interface IncomingMessage_SEND_ANSWER extends IncomingMessage_Base {
  type: IncomingMessageType.SEND_ANSWER;
  to: UserId;
  answer: RTCSessionDescription;
}

interface IncomingMessage_OFFER_REJECTED extends IncomingMessage_Base {
  type: IncomingMessageType.OFFER_REJECTED;
  to: UserId;
}

// interface IncomingMessage_SEND_CANDIDATE extends IncomingMessage_Base {
//   type: IncomingMessageType.SEND_CANDIDATE;
//   to: string;
//   candidate: RTCIceCandidate;
// }

interface IncomingMessage_END_CONNECTION extends IncomingMessage_Base {
  type: IncomingMessageType.END_CONNECTION;
  to: UserId;
}

export type IncomingMessage =
  | IncomingMessage_ERROR
  | IncomingMessage_LOGIN
  | IncomingMessage_LOGOUT
  | IncomingMessage_SEND_OFFER
  | IncomingMessage_SEND_ANSWER
  | IncomingMessage_OFFER_REJECTED
  // | IncomingMessage_SEND_CANDIDATE
  | IncomingMessage_END_CONNECTION;
