/// <reference path="./declare.d.ts" />
import {
  IncomingMessage,
  IncomingMessageType,
} from '../../shared/IncomingMessage';
import { playAudio } from './audio';
import { logAllEvents } from './debug';
import { log } from './ui';
import { refreshUserList, User } from './users';

import freeice = require('freeice');

export class PeerConnection {
  private readonly rtc = this.createRtc();
  hasRemoteTracks = false;
  hasLocalTracks = false;

  get hasTracks() {
    return this.hasRemoteTracks && this.hasLocalTracks;
  }

  constructor(
    public readonly user: User,
    private readonly send: (message: IncomingMessage) => void,
  ) {}

  async sendOffer() {
    // this.createDataChannel();
    const offer = await this.createOffer({ offerToReceiveAudio: true });

    await this.send({
      type: IncomingMessageType.SEND_OFFER,
      to: this.user.id,
      offer,
    });
  }

  async receiveOffer(offer: RTCSessionDescription) {
    await this.setRemoteDescription(offer);
    const answer = await this.createAnswer({ offerToReceiveAudio: true });

    await this.send({
      type: IncomingMessageType.SEND_ANSWER,
      to: this.user.id,
      answer,
    });
  }

  receiveAnswer(answer: RTCSessionDescription) {
    return this.setRemoteDescription(answer);
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    this.hasLocalTracks = true;
    log(`Enviando audio a ${this.user.name}.`);
    return this.rtc.addTrack(track, stream);
  }

  end() {
    this.rtc.close();
  }

  private processIceCandidates() {
    return new Promise<void>(resolve => {
      this.rtc.onicecandidate = ({ candidate }) =>
        candidate == null && resolve();
    });
  }

  private createRtc() {
    const conn = new RTCPeerConnection({ iceServers: freeice() });
    logAllEvents(conn, `WebRTC(${this.user.name})`);

    conn.ontrack = e => {
      this.hasRemoteTracks = true;
      log(`Recibiendo audio de ${this.user.name}.`);
      refreshUserList();
      playAudio(e.streams[0]);
    };

    conn.ondatachannel = event => {
      let receiveChannel = event.channel;
      receiveChannel.onmessage = e => this.onDataChannelMessage(e);
      receiveChannel.onopen = () =>
        console.log('Data channel is open and ready to be used.');
    };

    return conn;
  }

  private async createOffer(options: RTCOfferOptions = {}) {
    const offer = await this.rtc.createOffer(options);
    await this.rtc.setLocalDescription(offer);
    await this.processIceCandidates();
    return this.rtc.localDescription!;
  }

  private async createAnswer(options: RTCOfferOptions = {}) {
    const answer = await this.rtc.createAnswer(options);
    await this.rtc.setLocalDescription(answer);
    await this.processIceCandidates();
    return this.rtc.localDescription!;
  }

  private setRemoteDescription(desc: RTCSessionDescription) {
    return this.rtc.setRemoteDescription(new RTCSessionDescription(desc));
  }

  private onDataChannelMessage(data: MessageEvent) {
    console.log('POLLAS', data);
  }
}
