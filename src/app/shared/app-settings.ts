import {KeyShortcut} from './key-shortcut';
import {KeyShortcutSet} from './key-shortcut-set';

class NetworkSettings {
  // API base
  public static readonly apiBase = '/api/v1';

  // Default settings
  private static readonly defaultHostIp = '127.0.0.1';
  private static readonly defaultPort = 27636;

  // Settings
  hostIp: string = NetworkSettings.defaultHostIp;
  port: number = NetworkSettings.defaultPort;
}

class LocaleSettings {
  // Default settings
  public static readonly localeFallback = 'en-US';
  private static defaultLocale = 'en-US';

  // Settings
  locale: string = LocaleSettings.defaultLocale;
}

class PlaybackControlKeymap {
  // Default settings
  private static readonly defaultPlayOrPause = new KeyShortcutSet(new KeyShortcut('F5'));
  private static readonly defaultStop = new KeyShortcutSet(new KeyShortcut('F6'));
  private static readonly defaultPlayPreviousTrack = new KeyShortcutSet(new KeyShortcut('ArrowLeft', false, true));
  private static readonly defaultPlayNextTrack = new KeyShortcutSet(new KeyShortcut('ArrowRight', false, true));

  public playOrPause = PlaybackControlKeymap.defaultPlayOrPause;
  public stop = PlaybackControlKeymap.defaultStop;
  public playPreviousTrack = PlaybackControlKeymap.defaultPlayPreviousTrack;
  public playNextTrack = PlaybackControlKeymap.defaultPlayNextTrack;
}

class EditorKeymap {
  // Default settings
  private static readonly defaultInsertTimestamp = new KeyShortcutSet(new KeyShortcut('F9'), new KeyShortcut('+'));
  private static readonly defaultReplaceTimestamp = new KeyShortcutSet(new KeyShortcut('F10'), new KeyShortcut('Clear'));
  private static readonly defaultRemoveTimestamp = new KeyShortcutSet(new KeyShortcut('F11'), new KeyShortcut('-'));

  public insertTimestamp = EditorKeymap.defaultInsertTimestamp;
  public replaceTimestamp = EditorKeymap.defaultReplaceTimestamp;
  public removeTimestamp = EditorKeymap.defaultRemoveTimestamp;
}

export class EditorTheme {
  // Default settings
  private static readonly defaultTimestampColor = '#FF8C00';
  private static readonly defaultTimestampFont = 'monospace';
  private static readonly defaultWordBreakerColor = '#FFC885';

  public timestampColor = EditorTheme.defaultTimestampColor;
  public timestampFont = EditorTheme.defaultTimestampFont;
  public wordBreakerColor = EditorTheme.defaultWordBreakerColor;
}

export class BreakpointStrategy {
  // Default settings
  private static readonly defaultSkipEndOfLine = false;
  private static readonly defaultStopBeforeUncommonSymbols = true;
  private static readonly defaultSkipToRespectJapaneseRules = true;
  private static readonly defaultStopBeforeLeftSymbols = true;

  public skipEndOfLine = BreakpointStrategy.defaultSkipEndOfLine;
  public stopBeforeUncommonSymbols = BreakpointStrategy.defaultStopBeforeUncommonSymbols;
  public skipToRespectJapaneseRules = BreakpointStrategy.defaultSkipToRespectJapaneseRules;
  public stopBeforeLeftSymbols = BreakpointStrategy.defaultStopBeforeLeftSymbols;
}

export class AppSettings {
  // Expose internal classes
  public static NetworkSettings = NetworkSettings;
  public static LocaleSettings = LocaleSettings;

  public networkSettings = new NetworkSettings();
  public localeSettings = new LocaleSettings();
  public playbackControlKeymap = new PlaybackControlKeymap();
  public editorKeymap = new EditorKeymap();
  public editorTheme = new EditorTheme();
  public breakpointStrategy = new BreakpointStrategy();
}

