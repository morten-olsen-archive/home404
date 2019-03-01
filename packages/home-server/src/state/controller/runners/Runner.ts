import { EventEmitter } from 'events';
import { MiddlewareAPI } from 'redux';

export interface Options<ConfigType> {
  name: string;
  options: ConfigType;
  config: any;
  store: MiddlewareAPI;
  emitter: EventEmitter;
}

type Runner<ConfigType = any> = (options: Options<ConfigType>) => void;

export default Runner;
