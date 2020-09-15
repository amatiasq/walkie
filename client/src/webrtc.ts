import { PeerConnection } from '@amatiasq/peer-connection';
import {
  IncomingMessage,
  IncomingMessageType,
} from '../../shared/IncomingMessage';
import { playAudio } from './audio';
import { log } from './ui';
import { refreshUserList, User } from './users';

export class Channel {
  private readonly conn = this.createRtc();

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
    const offer = await this.conn.createOffer({ offerToReceiveAudio: true });

    await this.send({
      type: IncomingMessageType.SEND_OFFER,
      to: this.user.id,
      offer,
    });
  }

  async receiveOffer(offer: RTCSessionDescription) {
    const answer = await this.conn.receiveOffer(offer, {
      offerToReceiveAudio: true,
    });

    await this.send({
      type: IncomingMessageType.SEND_ANSWER,
      to: this.user.id,
      answer,
    });
  }

  receiveAnswer(answer: RTCSessionDescription) {
    return this.conn.receiveAnswer(answer);
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    this.hasLocalTracks = true;
    log(`Enviando audio a ${this.user.name}.`);
    return this.conn.addTrack(track, stream);
  }

  end() {
    this.conn.close();
  }

  private createRtc() {
    const conn = new PeerConnection();

    conn.onTrackReceived(e => {
      log(`Recibiendo audio de ${this.user.name}.`);
      playAudio(e.streams[0]);
      refreshUserList();
    });

    return conn;
  }
}
