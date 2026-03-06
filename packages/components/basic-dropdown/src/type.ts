import { Component, MaybeRefOrGetter, ComputedRef } from 'vue'

export interface BasicDropdownProps {
  menus: DropdownItemSchema[]
}

export interface DropdownItemSchema {
  name?: string
  command?: string | number | object
  disabled?: boolean | ComputedRef<boolean | undefined> | MaybeRefOrGetter<boolean>
  divided?: boolean
  icon?: Component
  onClick?: (item: DropdownItemSchema) => void
  customRender?: (params) => RenderType
  customSlot?: string
}
