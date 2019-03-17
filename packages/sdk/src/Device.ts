interface Device<StateType = any, InfoType = any> {
  owner: string;
  id: string;
  state?: StateType;
  info?: InfoType;
}

export default Device;
