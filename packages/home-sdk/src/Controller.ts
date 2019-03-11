import Api from './Api';

const jsondiffpatch = require('jsondiffpatch');

abstract class Controller<ConfigType = any, DataType = any, StateType = any> {
  protected api: Api;
  protected config: ConfigType;
  protected data: DataType;
  public state?: StateType;

  public stateDidChange?(state: StateType): void;

  abstract get defaultData(): DataType;

  constructor(api: Api, config: ConfigType, data?: DataType) {
    this.api = api;
    this.config = config;
    this.data = data as DataType;
  }

  abstract setup(): Promise<void>;

  setData(data: DataType) {
    this.data = data;
  }

  async patchState(diff: any) {
    const state = jsondiffpatch.patch(this.state, diff);
    this.state = state;
    if (this.stateDidChange) {
      this.stateDidChange(state);
    }
  }

  async save() {
    await this.api.saveData(this.data);
  }
}

export default Controller;