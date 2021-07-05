import baseClient from "@/services/base-client";

class HyperJackett {
  apiUrl = null;
  client = null;

  constructor(client) {
    this.apiUrl = process.env.VUE_APP_API_URL + "/jackett";
    this.client = client;
  }

  search(pattern, categories) {
    const endpoint = "/search";
    const params = `?pattern=${pattern}${categories.map(c => `&category=${c}`).join('')}`;

    const url = this.apiUrl + endpoint + params;
    return this.client.get(url)
      .then(({ data }) => data)
  }

  fetchCategories() {
    const endpoint = "/categories";
    const url = this.apiUrl + endpoint;
    return this.client.get(url)
      .then(({ data }) => data)
  }
}

export default new HyperJackett(baseClient)
