import {KeyShortcut} from './key-shortcut';

export class KeyShortcutSet {
  public primary: KeyShortcut;
  public secondary: KeyShortcut;

  constructor(primary: KeyShortcut = null, secondary: KeyShortcut = null) {
    this.primary = primary;
    this.secondary = secondary;
  }

  public toStringArr(): string[] {
    const result: string[] = [];
    if (this.primary) {
      result.push(this.primary.toString());
    }
    if (this.secondary) {
      result.push(this.secondary.toString());
    }
    return result;
  }
}
