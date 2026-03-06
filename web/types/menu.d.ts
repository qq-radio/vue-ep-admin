export interface AppMenuItem {
  path: string
  name?: string
  meta: {
    title: string
    icon?: string
    hidden?: boolean
    disabled?: boolean
    link?: string
    openInNewWindow?: boolean
  }
  children?: RouteMenuItemSchema[]
}
