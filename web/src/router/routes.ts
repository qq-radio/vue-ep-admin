import type { RouteRecordRaw } from 'vue-router'
import { ROOT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, ERROR_ROUTE, NOT_FOUND_ROUTE } from './base'

function globRouteModules() {
  return import.meta.glob('./modules/**/*.ts', {
    eager: true,
  }) as Record<string, { default: RouteRecordRaw }>
}

function normalizeRouteModuleList(modules: Record<string, { default: RouteRecordRaw }>) {
  const list: RouteRecordRaw[] = []
  Object.keys(modules).forEach((key) => {
    const module = modules[key].default
    const moduleList = Array.isArray(module) ? [...module] : [module]
    list.push(...moduleList)
  })
  return list
}

function sortRouteModuleList(list: RouteRecordRaw[]) {
  return list.sort((a, b) => (a.meta?.order || Infinity) - (b.meta?.order || Infinity))
}

function generateRouteModuleList() {
  return sortRouteModuleList(normalizeRouteModuleList(globRouteModules()))
}

export function generateRoutes() {
  return [LOGIN_ROUTE, NOT_FOUND_ROUTE, ERROR_ROUTE].concat([
    {
      ...ROOT_ROUTE,
      children: [HOME_ROUTE, ...generateRouteModuleList()],
    },
  ])
}
