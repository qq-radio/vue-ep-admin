import type { Router } from 'vue-router'
import { startProgress, stopProgress } from '@/utils/nprogress'

export function createRouterGuard(router: Router) {
  const loadedPaths = new Set<string>()

  router.beforeEach((to) => {
    const { addKeepAliveName } = useKeepAliveStore()

    if (to.name && to.meta?.keepAlive) {
      addKeepAliveName(to.name as string)
    }

    const isLoaded = loadedPaths.has(to.path)
    if (!isLoaded) {
      startProgress()
    }
  })

  router.afterEach((to) => {
    loadedPaths.add(to.path)
    stopProgress()
  })
}
