export interface BasicRouteMenuProps {
  menus: RouteMenuItemSchema[]

  modelValue?: string
  activeMenu?: RouteMenuItemSchema

  mode?: 'vertical' | 'horizontal'
  showCollapseButton?: boolean
  collapsed?: boolean
  collapsedWidth?: string | number
  expandedWidth?: string | number
  width?: string | number
  collapseButtonPosition?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
}

export interface RouteMenuItemProps {
  item: RouteMenuItemSchema
  basePath?: string
}

export interface RouteMenuItemSchema {
  path: string
  name?: string
  meta: {
    title: string
    icon?: string
    hidden?: boolean
    disabled?: boolean
  }
  children?: RouteMenuItemSchema[]
}
