import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import useLoaderStore from '../store/loaderStore';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

type Option = {
  hideLoading?: boolean;
  endPoint: string;
  method: Method;
  body?: Object;
  query?: Map<string, string>;
};

const generateURL = (option: Option) => {
  let URL = BASE_URL + option.endPoint;

  if (option.query) {
    URL = URL + '/?';
    const list: String[] = [];
    option.query.forEach((key, value) => {
      list.push(key + '=' + value);
    });
    URL = URL + list.join('&');
  }
  console.log(URL);
  return URL;
};

const callAPI = (option: Option): Promise<AxiosResponse> => {
  const instance = axios.create();

  const { setLoading } = useLoaderStore.getState(); //.getState() ile store'a erişiyorum.

  // -----Request intercepter-----
  instance.interceptors.request.use(
    config => {
      setLoading(true);
      return config;
    },
    error => {
      setLoading(false);
      return Promise.reject(error);
    },
  );

  // -----Response intercepter-----
  instance.interceptors.response.use(
    response => {
      setLoading(false);
      return response;
    },
    error => {
      setLoading(false);
      return Promise.reject(error);
    },
  );

  const config: AxiosRequestConfig = {
    url: generateURL(option),
    method: option.method,
    data: option.method === 'GET' ? undefined : option.body,
  };

  return instance.request(config);
};
export { callAPI };
