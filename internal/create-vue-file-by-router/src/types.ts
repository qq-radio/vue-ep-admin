export interface RouteMeta {
  title: string
  icon?: any
  order?: number
  hideMenu?: boolean
  [key: string]: any
}

export interface AppRouteRecordRaw {
  path: string
  name: string
  component?: any
  meta?: RouteMeta
  children?: AppRouteRecordRaw[]
}

export interface CreateOptions {
  template?: string
  overwrite?: boolean
  silent?: boolean
}
