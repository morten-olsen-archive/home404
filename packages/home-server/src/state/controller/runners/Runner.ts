import { MiddlewareAPI } from 'redux';

type Runner<ConfigType = any> = (name: string, options: ConfigType, config: any, store: MiddlewareAPI) => void;

export default Runner;
