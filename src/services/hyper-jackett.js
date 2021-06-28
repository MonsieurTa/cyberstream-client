class HyperJackett {
  apiUrl = null;

  constructor() {
    this.apiUrl = process.env.VUE_APP_API_URL + "/jackett";
  }

  search(pattern, categories) {
    const endpoint = "/search";
    const params = `?pattern=${pattern}${categories.map(c => `&category=${c}`).join('')}`;

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
