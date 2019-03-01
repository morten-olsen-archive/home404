import path from 'path';
class Config {
  get storageLocation() {
    return path.join(process.cwd(), '.configs');
  }
}

export default new Config();