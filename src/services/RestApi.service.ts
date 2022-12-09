import UseAxios from "../plugins/Axios.plugin";

type URL = string;
interface FetcherMethod {
  get: (url: URL) => any
}

const baseURL = 'https://api.github.com/search';

const axiosGet = (url: URL) => {
  return UseAxios({
    baseURL,
    responseType: 'json',
    method: 'get',
    url: baseURL + url,
  });
}

const Fetcher: FetcherMethod = {
  get:  axiosGet
}

export default Fetcher;