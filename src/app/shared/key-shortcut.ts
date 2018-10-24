export class KeyShortcut {
  public key: string;
  public altKey: boolean;
  public ctrlKey: boolean;
  public shiftKey: boolean;

  constructor(key: string, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false) {
    this.key = key;
    this.altKey = altKey;
    this.ctrlKey = ctrlKey;
    this.shiftKey = shiftKey;
  }

  toString(): string {
    let result = '';
    if (this.ctrlKey) {
      result += 'Ctrl + ';
    }
    if (this.altKey) {
      result += 'Alt + ';
    }
    if (this.shiftKey) {
      result += 'Shift + ';
    }
    if (this.key !== 'Ctrl' && this.key !== 'Alt' && this.key !== 'Shift') {
      result += this.key;
    }
    return result;
  }
}
