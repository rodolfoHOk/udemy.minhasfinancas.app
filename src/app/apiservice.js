import axios from 'axios';
import AuthService from './service/authService';

const httpClient = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'https://minhasfinancas-rho-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * JWT: interceptar as requests para adicionar o token ao header (cabecalho) se existir
 */
httpClient.interceptors.request.use(async (config) => {
  if (AuthService.getToken()) {
    const token = AuthService.getToken();
    // eslint-disable-next-line no-param-reassign
    config.headers.autorizacao = `Portador ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

class ApiService {
  constructor(apiurl) {
    this.apiurl = apiurl;
  }

  post(url, objeto) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.post(requestUrl, objeto);
  }

  put(url, objeto) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.put(requestUrl, objeto);
  }

  delete(url) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.delete(requestUrl);
  }

  get(url) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.get(requestUrl);
  }
}

export default ApiService;
