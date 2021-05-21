class HyperJackett {
  apiUrl = null;

  constructor() {
    this.apiUrl = "http://localhost:3001/api/jackett"
  }

  search(pattern, categories) {
    const endpoint = "/search";
    const params = `?pattern=${pattern}${categories?.map(c => `&category=${c}`) || ""}`;

    const url = this.apiUrl + endpoint + params;
    return fetch(url)
      .then(data => data.json())
      .then(data => data)
  }

  fetchCategories() {
    const endpoint = "/categories";
    const url = this.apiUrl + endpoint;

    return fetch(url)
      .then(data => data.json())
      .then(data => data)
  }
}

export default new HyperJackett()
