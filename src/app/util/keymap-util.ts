import {KeyShortcut} from '../shared/key-shortcut';

export class KeymapUtil {
  public static toKeyShortcut(event: KeyboardEvent): KeyShortcut {
    return new KeyShortcut(event.key, event.altKey, event.ctrlKey, event.shiftKey);
  }
}
