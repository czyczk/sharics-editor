class NetworkSettings {
  // API base
  public static readonly apiBase = '/api/v1';

  // Default settings
  private static defaultHostIp = '127.0.0.1';
  private static defaultPort = 27636;

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

export class AppSettings {
  // Expose internal classes
  public static NetworkSettings = NetworkSettings;
  public static LocaleSettings = LocaleSettings;

  public networkSettings = new NetworkSettings();
  public localeSettings = new LocaleSettings();
}

