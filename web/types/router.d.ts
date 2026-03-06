import 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export type AppRouteRecordRaw = RouteRecordRaw & {
  name: string
  path: string
  meta: AppRouteMeta
}

export interface AppRouteMeta {
  title: string
  icon?: string
  keepAlive?: boolean
  order?: number

  iframeSrc?: string
  link?: string
  openInNewWindow?: boolean

  hideInBreadcrumb?: boolean
  hideInMenu?: boolean
  hideInTab?: boolean
  forbidden?: boolean

  fixedTab?: boolean
  fixedOrder?: number

  // 之后做..
  roles?: Array<string>
  auths?: Array<string>
}

declare module 'vue-router' {
  interface RouteMeta extends AppRouteMeta {
    title: string
  }
}

export {}
