import axios from 'axios';

export const baseUrl = 'https://challenge.crossmint.io/api/';

const api = axios.create({
  baseURL: baseUrl,
});

export default api;