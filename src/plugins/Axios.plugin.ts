import axios from "axios";

interface AxiosConfig {
  baseURL: string | undefined;
  responseType: any;
  method: string;
  url: string;
}

const UseAxios = (config: AxiosConfig) => {
  const { baseURL, responseType, method, url } = config;
  return axios({
    baseURL,
    responseType,
    method,
    url
  });
}

export default UseAxios;