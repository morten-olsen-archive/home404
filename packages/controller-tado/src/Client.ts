import axios from 'axios';
import querystring from 'querystring';

const CLIENT_ID = 'tado-web-app';
const CLIENT_SECRET = 'wZaRN7rpjn3FoNyF5IFuxg9uMzYJcvOoQ8QWiIqS3hfk6gLhVlG57j5YNoZL2Rtc';

class TadoClient {
  private accessToken?: string;
  private refreshToken?: string;
  private meData?: any;

  async startup(username: string, password: string) {
    const url = 'https://auth.tado.com/oauth/token';
    const data = querystring.stringify({
      client_id : CLIENT_ID,
      client_secret : CLIENT_SECRET,
      grant_type : 'password',
      scope : 'home.user',
      username : username,
      password : password,
    });
  
    const {
      data: result,
    } = await axios.post(url, data, {
      headers: {
        'Referer' : 'https://my.tado.com/',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    this.accessToken = result.access_token;
    this.refreshToken = result.refresh_token;
    this.meData = await this.me();
  }

  async call(method: string, path: string, data?: any) {
    const {
      data: result,
    } = await axios({
      url: `https://my.tado.com/api/v2${path}`,
      method,
      data,
      headers: {
        Referer : 'https://my.tado.com/',
        Authorization: `bearer ${this.accessToken}`,
      }
    });
    return result;
  }

  me() {
    return this.call('get', '/me');
  }

  getDevices() {
    const home = this.meData.homes[0];
    const { id } = home;
    return this.call('get', `/homes/${id}/devices`);
  }

  getZones() {
    const home = this.meData.homes[0];
    const { id } = home;
    return this.call('get', `/homes/${id}/zones`);
  }

  getZone(id: number) {
    console.log(id);
    const home = this.meData.homes[0];
    const { id: homeId } = home;
    return this.call('get', `/homes/${homeId}/zones/${id}/state`);
  }
}

export default TadoClient;