import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import useHttp from '@/store/http'
import httpErrorStatusHandle from './error'

interface RequestInterceptors {
  requestInterceptors?: (config: RequestConfig) => RequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: <T = AxiosResponse>(res: T) => T
  responseInterceptorsCatch?: (err: any) => any
}
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
}
// 获取useHttp 函数的返回值类型
/* type HttpStore = ReturnType<typeof useHttp> */
/* 
  拦截器运行顺序
  洋葱模型
   接口请求拦截器 --> 全局请求拦截器 --> 实例请求拦截器 --> 实例响应拦截器 --> 全局响应拦截器 --> 接口响应拦截器
*/
class Request {
  instance: AxiosInstance
  interceptorsObj?: RequestInterceptors
  cancelRequestSourceList: Map<string, () => void>
  requestCount: number
  hasLoading: boolean
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptorsObj = (config.interceptors as RequestInterceptors)
    this.cancelRequestSourceList = new Map();
    this.requestCount = 0;
    this.hasLoading = (config.headers?.hasLoading as boolean) || true
    // 实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    )
    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (req: RequestConfig) => {
        this.hasLoading && this.showLoading()
        return req;
      },
      (err: any) => err
    )
    // 实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    )
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res;
      },
      (err: any) => err
    )
  }
  private delUrl(url: string) {
    this.cancelRequestSourceList.delete(url)
  }
  private showLoading() {
    if (this.requestCount === 0) {
      // useHttp().changeIsLoading(true)
    }
    this.requestCount++
  }
  private hideLoading() {
    this.requestCount--;
    if (this.requestCount === 0) {
      // useHttp().changeIsLoading(false)
    }
  }
  private request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 接口请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      const url = config.url;
      if (url) {
        config.cancelToken = new axios.CancelToken(c => {
          this.cancelRequestSourceList.set(url, c)
        })
      }
      this.instance.request<any, T>(config)
        .then((res) => {
          // 接口响应拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          this.hasLoading && this.hideLoading()
          httpErrorStatusHandle(res)
          resolve(res);
        })
        .catch((err: any) => {
          this.hasLoading && this.hideLoading()
          reject(err)
        })
        .finally(() => {
          url && this.delUrl(url)
        })
    })
  }
  get(config: RequestConfig) {
    config.params = config.data;
    return this.request({
      method: 'GET',
      ...config
    })
  }
  post(config: RequestConfig) {
    return this.request({
      method: 'POST',
      ...config
    })
  }
  cancelAllRequest() {
    console.log('请求全部取消了')
    this.cancelRequestSourceList.forEach((value, key, map) => {
      value();
    })
  }
  cancelRequest(url: string) {
    console.log(`${url} 改请求已被取消`)
    const cancel = this.cancelRequestSourceList.get(url);
    cancel && cancel();
  }
}

export default Request;