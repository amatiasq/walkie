/// <reference path="./declare.d.ts" />
import {
  IncomingMessage,
  IncomingMessageType,
} from '../../shared/IncomingMessage';
import { playAudio } from './audio';
import { logAllEvents } from './debug';
import { User } from './users';

import freeice = require('freeice');

export class PeerConnection {
  private readonly rtc = this.createRtc();

  constructor(
    public readonly user: User,
    private readonly send: (message: IncomingMessage) => void,
  ) {}

  async sendOffer() {
    // this.createDataChannel();
    const offer = await this.createOffer({ offerToReceiveAudio: true });

    await this.send({
      type: IncomingMessageType.SEND_OFFER,
      to: this.user.name,
      offer,
    });
  }

  async receiveOffer(offer: RTCSessionDescription) {
    await this.setRemoteDescription(offer);
    const answer = await this.createAnswer({ offerToReceiveAudio: true });

    await this.send({
      type: IncomingMessageType.SEND_ANSWER,
      to: this.user.name,
      answer,
    });
  }

  receiveAnswer(answer: RTCSessionDescription) {
    return this.setRemoteDescription(answer);
  }

  receiveCandidate(candidate: RTCIceCandidate) {
    return this.rtc.addIceCandidate(new RTCIceCandidate(candidate));
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    return this.rtc.addTrack(track, stream);
  }

  end() {
    this.rtc.close();
  }

  private createRtc() {
    const connection = new RTCPeerConnection({ iceServers: freeice() });
    logAllEvents(connection, `WebRTC(${this.user.name})`);

    connection.ontrack = e => {
      console.log('got track');
      playAudio(e.streams[0]);
    };

    connection.ondatachannel = event => {
      let receiveChannel = event.channel;
      receiveChannel.onmessage = e => this.onDataChannelMessage(e);
      receiveChannel.onopen = () =>
        console.log('Data channel is open and ready to be used.');
    };

    connection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      console.log('Candidate ready');
      this.send({
        type: IncomingMessageType.SEND_CANDIDATE,
        to: this.user.name,
        candidate,
      });
    };

    return connection;
  }

  private createDataChannel() {
    const dataChannel = this.rtc.createDataChannel('messenger');
    logAllEvents(dataChannel, `DataChannel(${this.user.name})`);
    dataChannel.onmessage = e => this.onDataChannelMessage(e);
    return dataChannel;
  }

  private async createOffer(options: RTCOfferOptions = {}) {
    const offer = await this.rtc.createOffer(options);
    await this.rtc.setLocalDescription(offer);
    return this.rtc.localDescription!;
  }

  private async createAnswer(options: RTCOfferOptions = {}) {
    const answer = await this.rtc.createAnswer(options);
    await this.rtc.setLocalDescription(answer);
    return this.rtc.localDescription!;
  }

  private setRemoteDescription(desc: RTCSessionDescription) {
    return this.rtc.setRemoteDescription(new RTCSessionDescription(desc));
  }

  private onDataChannelMessage(data: MessageEvent) {
    console.log('POLLAS', data);
  }
}
