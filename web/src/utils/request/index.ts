import type { CustomAxiosRequestConfig, CustomAxiosResponse } from './type'
import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { requestInterceptor, responseInterceptor } from './interceptor'
export * from './type'

import axios from 'axios'

class CustomAxios {
  private axiosInstance: AxiosInstance

  constructor(options: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  registerRequestInterceptor({ fulfilled, rejected }) {
    this.axiosInstance.interceptors.request.use(fulfilled, rejected)
  }

  registerResponseInterceptor({ fulfilled, rejected }) {
    this.axiosInstance.interceptors.response.use(fulfilled, rejected)
  }

  private setupInterceptors() {
    this.registerRequestInterceptor(requestInterceptor())
    this.registerResponseInterceptor(responseInterceptor())
  }

  public get<R = any>(url: string, params?: Recordable, config?: CustomAxiosRequestConfig) {
    const r = this.axiosInstance.get<R>(url, {
      ...config,
      params,
    })
    return r as unknown as Promise<Awaited<typeof r>['data']>
  }

  public post<R>(url: string, data?: Recordable | null, config?: CustomAxiosRequestConfig) {
    const r = this.axiosInstance.post<R>(url, data, {
      ...config,
    })
    // return r as unknown as Promise<Awaited<typeof r>['data']>
    return r as any
  }

  public put<R>(url: string, data?: Recordable | null, config?: CustomAxiosRequestConfig) {
    const r = this.axiosInstance.put<R>(url, {
      ...config,
      data,
    }) as Promise<CustomAxiosResponse>
    return r as unknown as Promise<Awaited<typeof r>['data']>
  }

  public delete<R>(url: string, data?: Recordable | null, config?: CustomAxiosRequestConfig) {
    const r = this.axiosInstance.delete<{ data: R }>(url, {
      ...config,
      data,
    })
    return r as unknown as Promise<Awaited<typeof r>['data']>
  }
}

export type { CustomAxios }

export default new CustomAxios({ baseURL: '/api' })
