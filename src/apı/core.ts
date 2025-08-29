import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

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

  const config: AxiosRequestConfig = {
    url: generateURL(option),
    method: option.method,
    data: option.method === 'GET' ? undefined : option.body,
  };

  return instance.request(config);
};
export { callAPI };
