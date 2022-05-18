import Request from './request';
import Config from '../config/env';

const request = new Request({
  baseURL: Config.API_BASE_URL,
  timeout: 1000 * 10,
  interceptors: {
    requestInterceptors: config => {
      return config;
    },
    responseInterceptors: res => {
      return res;
    },
  },
});

export function cancelRequest(url: string) {
  return request.cancelRequest(url);
}
export function cancelAllRequest() {
  return request.cancelAllRequest();
}

export default request;
