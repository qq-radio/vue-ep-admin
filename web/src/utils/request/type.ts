import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  onError?: () => void
  cancelRepeat?: boolean
}

export interface InternalAxiosRequestConfig extends CustomAxiosRequestConfig {
  headers: AxiosRequestHeaders
}

export interface CustomAxiosResponse extends AxiosResponse {
  config: InternalAxiosRequestConfig & {
    ignoreErrMsg?: boolean
  }
}
