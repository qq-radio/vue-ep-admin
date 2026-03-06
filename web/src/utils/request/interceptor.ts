import type { CustomAxiosRequestConfig, CustomAxiosResponse } from './type'
import { ResponseCodeEnum } from './constant'
import { ElMessage } from 'element-plus'
import { router, LOGIN_ROUTE } from '@/router'

export function requestInterceptor() {
  const fulfilled = (config: CustomAxiosRequestConfig) => {
    const { getToken } = useUserStore()
    config.headers = config.headers ?? {}
    config.headers.Authorization = 'Bearer ' + getToken()
    return config
  }

  const rejected = (error) => {
    throw error
  }

  return { fulfilled, rejected }
}

export function responseInterceptor() {
  const fulfilled = (response: CustomAxiosResponse) => {
    const { headers, data } = response

    if (headers['content-disposition']) {
      const fileName = headers['content-disposition']?.match(/(?<=filename=).+/)?.[0]
      return { data, fileName }
    }

    if (headers['content-type'].startsWith('image/')) {
      return response
    }

    if (headers['content-type'] === 'application/octet-stream') {
      return response
    }

    return processResponse(response)
  }

  const rejected = (error) => {
    const { message } = error
    ElMessage.error(message)
    throw new Error(error)
  }

  return { fulfilled, rejected }
}

function processResponse(response: CustomAxiosResponse) {
  const { config, data } = response
  const { clearToken } = useUserStore()

  switch (data.code) {
    case ResponseCodeEnum.SUCCESS:
      return data.data
    case ResponseCodeEnum.UNAUTHORIZED: {
      ElMessage.error('请重新登录')
      clearToken()
      router.push({
        path: LOGIN_ROUTE.path,
        query: {
          redirect: encodeURIComponent(router.currentRoute.value.fullPath),
        },
      })
      return
    }
    default:
      if (config.ignoreErrMsg !== true) {
        ElMessage.error(data.msg)
        return Promise.reject(data)
      }
  }
}
