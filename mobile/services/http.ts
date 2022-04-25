import axios, { Axios, AxiosRequestConfig } from "axios";
import tokenHandler from "./storage";
const URL = "http://localhost:5000";


class HttpService {
  baseUrl: string;
  fetchingService: Axios;
  apiVersion!: string;

  constructor(
      baseUrl = URL,
      fetchingService = axios,
      apiVersion = "api",
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url?: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private async populateTokenToHeaderConfig() {
    const token = await tokenHandler.getToken();
    return axios.defaults.headers.common.Authorization = token;
}

  private extractUrlAndDataFromConfig({
    // eslint-disable-next-line no-unused-vars
    data, url, ...configWithoutDataAndUrl }: any) {
    return configWithoutDataAndUrl;
  }

  async get(config: AxiosRequestConfig, withAuth: boolean = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    return this.fetchingService.get(this.getFullApiUrl(config.url), config);
  }
  async post(config: AxiosRequestConfig, withAuth: boolean = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    return this.fetchingService.post(this.getFullApiUrl(config.url),
        config.data, this.extractUrlAndDataFromConfig(config));
  }
  async put(config: AxiosRequestConfig, withAuth: boolean = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    return this.fetchingService.put(this.getFullApiUrl(config.url),
        config.data, this.extractUrlAndDataFromConfig(config));
  }
  async delete(config: AxiosRequestConfig, withAuth: boolean = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    return this.fetchingService.delete(
        this.getFullApiUrl(config.url), config);
  }
}

export default HttpService;
