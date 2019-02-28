import Api from './Api';

abstract class Controller<ConfigType = any> {
  protected api: Api;
  protected config: ConfigType;

  constructor(api: Api, config: ConfigType) {
    this.api = api;
    this.config = config;
  }

  abstract setup(): Promise<void>;
}

export default Controller;