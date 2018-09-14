export class AppSettings {
  networkSettings: NetworkSettings;
}

class NetworkSettings {
  // API base
  static apiBase = '/api/v1';

  // Default settings
  static defaultHostIp = '127.0.0.1';
  static defaultPort = 27636;

  // Settings
  hostIp: string = NetworkSettings.defaultHostIp;
  port: number = NetworkSettings.defaultPort;
}
