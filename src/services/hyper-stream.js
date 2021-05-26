import axios from "axios";

class HyperStream {
  apiUrl = null;

  constructor() {
    this.apiUrl = "http://localhost:3001/api"
  }

  stream(name, encryptedMagnet) {
    const encode = (v) => encodeURIComponent(v);

    const endpoint = "/stream";
    const params = `?name=${encode(name)}&magnet=${encryptedMagnet}`;

    const url = this.apiUrl + endpoint + params;
    return axios.post(url);
  }
}

export default new HyperStream();
