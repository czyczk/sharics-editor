export class TimestampUtil {
  public static formatDisplay(timestamp: number): string {
    const timestampInt = parseInt(timestamp.toString(), 10);
    const minutes = parseInt((timestampInt / 60).toString(), 10);
    const minutesStr = minutes >= 10 ? minutes : '0' + minutes;
    const seconds = timestampInt % 60;
    const secondsStr = seconds >= 10 ? seconds : '0' + seconds;
    return `${minutesStr}:${secondsStr}`;
  }

  public static formatSquareBrackets(timestamp: number): string {
    const timestampInt = parseInt(timestamp.toString(), 10);
    const minutes = parseInt((timestampInt / 60).toString(), 10);
    const minutesStr = minutes >= 10 ? minutes : '0' + minutes;
    const seconds = timestampInt % 60;
    const secondsStr = seconds >= 10 ? seconds : '0' + seconds;
    const millisStr = Number(timestamp).toFixed(3).split('\.')[1];
    return `[${minutesStr}:${secondsStr}.${millisStr}]`;
  }
}
