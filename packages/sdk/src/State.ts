import Device from './Device';

interface Data {
  devices: Device[];
}

interface State<ExtenderType = {[name: string]: any}> {
  data: Data;
  extended: ExtenderType;
}

export {
  Data,
};

export default State;