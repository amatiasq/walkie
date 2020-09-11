import { SerializedUser } from './SerializedUser';

export enum OutgoingMessageType {
  ERROR = 'ERROR',
  HANDSHAKE = 'HANDSHAKE',
  LOGIN_RESULT = 'LOGIN_RESULT',
  USER_CONNECTED = 'USER_CONNECTED',
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  RECEIVE_OFFER = 'RECEIVE_OFFER',
  RECEIVE_ANSWER = 'RECEIVE_ANSWER',
  RECEIVE_CANDIDATE = 'RECEIVE_CANDIDATE',
}

interface OutgoingMessage_Base {
  type: OutgoingMessageType;
}

interface OutgoingMessage_ERROR extends OutgoingMessage_Base {
  type: OutgoingMessageType.ERROR;
  message: string;
}

interface OutgoingMessage_HANDSHAKE extends OutgoingMessage_Base {
  type: OutgoingMessageType.HANDSHAKE;
  message: string;
}

interface OutgoingMessage_LOGIN_RESULT_SUCCESS extends OutgoingMessage_Base {
  type: OutgoingMessageType.LOGIN_RESULT;
  success: true;
  users: SerializedUser[];
}

interface OutgoingMessage_LOGIN_RESULT_FAIL extends OutgoingMessage_Base {
  type: OutgoingMessageType.LOGIN_RESULT;
  success: false;
  message: string;
}

interface OutgoingMessage_USER_CONNECTED extends OutgoingMessage_Base {
  type: OutgoingMessageType.USER_CONNECTED;
  user: SerializedUser;
}

interface OutgoingMessage_USER_DISCONNECTED extends OutgoingMessage_Base {
  type: OutgoingMessageType.USER_DISCONNECTED;
  user: SerializedUser;
}

interface OutgoingMessage_RECEIVE_OFFER extends OutgoingMessage_Base {
  type: OutgoingMessageType.RECEIVE_OFFER;
  from: string;
  offer: RTCSessionDescription;
}

interface OutgoingMessage_RECEIVE_ANSWER extends OutgoingMessage_Base {
  type: OutgoingMessageType.RECEIVE_ANSWER;
  from: string;
  answer: RTCSessionDescription;
}

interface OutgoingMessage_RECEIVE_CANDIDATE extends OutgoingMessage_Base {
  type: OutgoingMessageType.RECEIVE_CANDIDATE;
  from: string;
  candidate: RTCIceCandidate;
}

export type OutgoingMessage =
  | OutgoingMessage_ERROR
  | OutgoingMessage_HANDSHAKE
  | OutgoingMessage_LOGIN_RESULT_SUCCESS
  | OutgoingMessage_LOGIN_RESULT_FAIL
  | OutgoingMessage_USER_CONNECTED
  | OutgoingMessage_USER_DISCONNECTED
  | OutgoingMessage_RECEIVE_OFFER
  | OutgoingMessage_RECEIVE_ANSWER
  | OutgoingMessage_RECEIVE_CANDIDATE;
