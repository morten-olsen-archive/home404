interface Api {
  addDevice: (id: string, info: any) => Promise<void>;
  setDeviceInfo: (id: string, info: any) => Promise<void>;
  setDeviceState: (id: string, state: any) => Promise<void>;
  removeDevice: (id: string) => Promise<void>;
}

export default Api;