import axios from "axios";

class HyperStream {
  apiUrl = null;

  constructor() {
    this.apiUrl = "http://localhost:3001/api"
  }

  stream(name, hash, encryptedMagnet) {
    const encode = (v) => encodeURIComponent(v);

    const endpoint = "/stream";
    const params = `?name=${encode(name)}&hash=${hash}&magnet=${encryptedMagnet}`;

    const url = this.apiUrl + endpoint + params;
    return axios.post(url)
      .then(({ data: { media_url, subtitles_url, type } }) => {
        return ({
          src: { src: media_url, type },
          tracks: { src: subtitles_url }
        });
      });
  }
}

export default new HyperStream();
