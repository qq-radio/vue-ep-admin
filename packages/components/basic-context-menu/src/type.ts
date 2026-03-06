import type { Component, MaybeRefOrGetter } from 'vue'

export interface BasicContextMenuProps {
  menus: ContextMenuItem[]
  visible?: boolean
  trigger?: ContextMenuTrigger
  position?: ContextMenuPosition
}

export interface BasicContextMenuEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'click', item: ContextMenuItem): void
}

export interface ContextMenuItem {
  name: string
  key: string
  icon?: Component
  hidden?: boolean
  disabled?: boolean | MaybeRefOrGetter<boolean | undefined>
  divided?: boolean
  onClick?: (item: ContextMenuItem) => void
}

export type ContextMenuTrigger = 'hover' | 'click' | 'contextmenu'

export interface ContextMenuPosition {
  left?: number | string
  right?: number | string
  top?: number | string
  bottom?: number | string
}
