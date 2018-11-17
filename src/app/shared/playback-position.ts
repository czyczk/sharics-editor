import {TimestampUtil} from '../util/timestamp-util';

export class PlaybackPosition {
  public position: number;

  constructor(position: number) {
    this.position = position;
  }

  formatDisplay(): string {
    return TimestampUtil.formatDisplay(this.position);
  }

  formatSquareBrackets(): string {
    return TimestampUtil.formatSquareBrackets(this.position);
  }
}
