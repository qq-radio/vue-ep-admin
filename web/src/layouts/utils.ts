import type { AppTabItem } from '#/types/tabbar'
import type { BreadcrumbItemSchema } from '@center/components'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export function getRouteBreadcrumb(route: RouteLocationNormalizedLoaded): BreadcrumbItemSchema[] {
  const matched = route.matched.slice(1, route.matched.length)

  const resultBreadcrumb: BreadcrumbItemSchema[] = []

  for (const match of matched) {
    const { meta, path } = match
    const { hideBreadcrumb, title, icon } = meta || {}
    if (hideBreadcrumb || !path) {
      continue
    }
    resultBreadcrumb.push({
      path: path || route.path,
      title: title as string,
      icon: icon as string,
    })
  }

  return resultBreadcrumb
}

export function getFixedTabsFromRoutes() {
  const router = useRouter()
  return router
    .getRoutes()
    .filter((r) => !!r.meta?.fixedTab)
    .sort(
      (a, b) => (Number(a.meta.fixedOrder) || Infinity) - (Number(b.meta.fixedOrder) || Infinity),
    )
    .map((route) => normalizeRouteToTab(route))
}

export function normalizeRouteToTab(route): AppTabItem {
  return {
    name: route.name,
    key: route.path,
    fullPath: route.path,
    ...route.meta,
  }
}

export function openWindow(path) {
  window.open(path, '_blank', 'noopener=yes,noreferrer=yes')
}
