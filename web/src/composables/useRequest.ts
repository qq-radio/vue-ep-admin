import type { CustomAxiosRequestConfig } from '@/utils/request'
import { ref, shallowRef, onUnmounted } from 'vue'

type UseRequestFunction = (params: any, config?: CustomAxiosRequestConfig) => Promise<any>

export interface UseRequestOptions<T = any> {
  immediate?: boolean
  shallow?: boolean

  initialData?: T
  initialParams?: any
  initialConfig?: CustomAxiosRequestConfig
  resetOnExecute?: boolean
  abortPrevious?: boolean
  loadingDelay?: number

  // 防抖
  debounce?: boolean
  debounceInterval?: number

  // 节流
  throttle?: boolean
  throttleInterval?: number

  // 轮询
  polling?: boolean
  pollingInterval?: number

  // 错误重试
  retryCount?: number

  onSuccess?: (data: T) => void
  onError?: (e) => void
  onFinally?: () => void
}

export function useRequest<T = any>(
  requestFunction: UseRequestFunction,
  options: UseRequestOptions<T> = {},
) {
  const defaultOptions: UseRequestOptions<T> = {
    shallow: true,
    abortPrevious: true,
  }

  const requestOptions: UseRequestOptions<T> = {
    ...defaultOptions,
    ...options,
  }

  const {
    immediate,
    shallow,

    initialData,
    initialParams,
    initialConfig,
    resetOnExecute,
    abortPrevious,
    loadingDelay,

    debounce,
    debounceInterval,

    throttle,
    throttleInterval,

    polling,
    pollingInterval,

    retryCount,

    onSuccess,
    onError,
    onFinally,
  } = requestOptions

  const requestParams = ref(initialParams)
  const requestConfig = ref(initialConfig)

  const data = (shallow ? shallowRef : ref)<T | undefined>(initialData)
  const error = shallowRef<any>(null)

  const isLoading = ref(false)
  const isAborted = ref(false)
  const isFailed = ref(false)
  const isFinished = ref(false)

  let executeCount = 0
  let retryAttemptCount = 0

  let debounceId: number | null = null
  let pollingId: number | null = null
  let throttlePause = false

  let abortController: AbortController = new AbortController()

  const resetData = () => {
    if (resetOnExecute) {
      data.value = initialData
    }
  }

  const abort = (message?: string) => {
    // if (isFinished.value || !isLoading.value) {
    //   return
    // }

    abortController.abort(message)
    abortController = new AbortController()
    isAborted.value = true
    isLoading.value = false
    isFinished.value = false

    if (pollingId) {
      clearTimeout(pollingId)
      pollingId = null
    }

    if (debounceId) {
      clearTimeout(debounceId)
      debounceId = null
    }
  }

  const refresh = () => {
    execute()
  }

  const execute = async (params?: any, config?: CustomAxiosRequestConfig) => {
    if (debounce) {
      if (debounceId) {
        clearTimeout(debounceId)
      }

      return new Promise((resolve) => {
        debounceId = setTimeout(() => {
          debounceId = null
          _execute(params, config).then(resolve)
        }, debounceInterval)
      })
    }

    if (throttle) {
      if (throttlePause) {
        return Promise.resolve({ data: data.value, error: error.value })
      }

      throttlePause = true
      setTimeout(() => {
        throttlePause = false
      }, throttleInterval)
    }

    return _execute(params, config)
  }

  const _execute = async (params?: any, config?: CustomAxiosRequestConfig) => {
    if (abortPrevious !== false) {
      abort()
    }

    resetData()

    isLoading.value = true
    isAborted.value = false
    isFinished.value = false
    isFailed.value = false
    error.value = undefined

    executeCount += 1
    const currentExecuteCounter = executeCount

    try {
      const finalParams = unref(params) ?? unref(requestParams)
      const finalConfig = unref(config) ?? unref(requestConfig)
      const responseData = await requestFunction(finalParams, finalConfig)

      if (isAborted.value) {
        return { data: data.value, error: null }
      }

      data.value = responseData
      onSuccess?.(responseData)

      requestParams.value = finalParams
      requestConfig.value = finalConfig

      retryAttemptCount = 0

      if (polling && pollingInterval) {
        pollingId = setTimeout(() => execute(params, config), pollingInterval)
      }

      return { data: data.value, error: null }
    } catch (e: any) {
      error.value = e
      isFailed.value = true
      onError?.(e)

      if (retryCount && retryAttemptCount < retryCount) {
        retryAttemptCount++
        return new Promise((resolve) => {
          resolve(_execute(params, config))
        })
      }

      return { data: undefined, error: e }
    } finally {
      onFinally?.()
      if (currentExecuteCounter === executeCount) {
        if (loadingDelay) {
          setTimeout(() => {
            isLoading.value = false
            isFinished.value = true
          }, loadingDelay)
        } else {
          isLoading.value = false
          isFinished.value = true
        }
      }
    }
  }

  if (immediate) {
    execute()
  }

  onUnmounted(() => {
    abort()
  })

  return {
    data,
    error,

    isLoading,
    isAborted,
    isFailed,
    isFinished,

    execute,
    abort,
    refresh,
  }
}
