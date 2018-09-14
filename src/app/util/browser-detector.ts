// noinspection TsLint
export class BrowserDetector {
  // Opera 8.0+
  static isOpera(): boolean {
    // @ts-ignore
    return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  }

  // Firefox 1.0+
  static isFirefox(): boolean {
    // @ts-ignore
    return typeof InstallTrigger !== 'undefined';
  }

  // Safari 3.0+ "[object HTMLElementConstructor]"
  static isSafari(): boolean {
    // @ts-ignore
    return /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === '[object SafariRemoteNotification]';
        // @ts-ignore
      })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  }

  // Internet Explorer 6-11
  static isIE(): boolean {
    // @ts-ignore
    return /*@cc_on!@*/false || !!document.documentMode;
  }

  // Edge 20+
  static isEdge(): boolean {
    // @ts-ignore
    return !this.isIE() && !!window.StyleMedia;
  }

  // Chrome 1+
  static isChrome(): boolean {
    // @ts-ignore
    return !!window.chrome && !!window.chrome.webstore;
  }

  // Blink engine detection
  static isBlink(): boolean {
    // @ts-ignore
    return (this.isChrome() || this.isOpera()) && !!window.CSS;
  }
}
