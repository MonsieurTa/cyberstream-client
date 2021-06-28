import axios from "axios";

class HyperStream {
  apiUrl = null;

  constructor() {
    this.apiUrl = "http://localhost:3001/api"
  }

  stream(hash, encryptedMagnet) {
    const endpoint = "/stream";
    const params = `?info_hash=${hash}&magnet=${encryptedMagnet}`;

    const url = this.apiUrl + endpoint + params;
    return axios.post(url)
      .then(({ data: { media_url, subtitles_url, type } }) => {
        return ({
          src: { src: media_url, type },
          tracks: { src: subtitles_url }
        });
export class StreamResponse {
  _name = ""
  _mediaUrl = ""
  _subtitlesUrls = []
  _ext = ""
  _info_hash = ""
  _error = ""

  constructor(data) {
    const {
      name,
      media_url,
      subtitles_urls,
      ext,
      info_hash,
      error,
    } = data
    this._name = name
    this._mediaUrl = media_url
    this._subtitlesUrls = subtitles_urls
    this._ext = ext
    this._info_hash = info_hash
    this._error = error
  }

  get error() {
    return this._error;
  }

  hasSubtitles() {
    return Array.isArray(this._subtitlesUrls) && this._subtitlesUrls.length > 0;
  }

  toVideoJSContent() {
    return {
      src: { src: this._mediaUrl, type: this._type },
      tracks: { src: this._subtitlesUrls },
    }
  }
}

export default new HyperStream();
