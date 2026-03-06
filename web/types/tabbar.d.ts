export interface AppTabItem {
  key: string
  fullPath: string
  name: string
  title: string

  icon?: string
  fixed?: boolean
  closable?: boolean

  iframeSrc?: string
}
