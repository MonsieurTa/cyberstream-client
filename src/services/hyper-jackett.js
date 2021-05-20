class HyperJackett {
  apiUrl = null;

  constructor() {
    this.apiUrl = "http://localhost:3000/api/jackett"
  }

  search(pattern, categories) {
    const endpoint = "/";
    const params = `&pattern=${pattern}${categories?.map(c => `&category=${c}`) || ""}`;

    const url = this.apiUrl + endpoint + params;
    return fetch(url)
      .then(data => data.json())
      .then(data => data)
  }
}

export default new HyperJackett()
