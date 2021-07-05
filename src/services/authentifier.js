import baseClient from "@/services/base-client";

class authentifier {
  apiUrl = null;
  client = null;

  constructor(client) {
    this.client = client;
    this.apiUrl = process.env.VUE_APP_API_URL + "/oauth";
  }

  logIn(username, password) {
    const endpoint = "/login";
    const payload = { username, password };
    return this.client.post(this.apiUrl + endpoint, payload);
  }

  logInFortyTwo() {
    const endpoint = '/fortytwo/authorize_uri';
    return this.client.get(this.apiUrl + endpoint);
  }

  getFortyTwoToken(code, state) {
    const endpoint = '/fortytwo/callback';
    const params = `?code=${code}&state=${state}`;
    return this.client.get(this.apiUrl + endpoint + params);
  }

  newAccessToken() {
    const endpoint = "/token";
    return this.client.post(this.apiUrl + endpoint);
  }
}

export default new authentifier(baseClient);
