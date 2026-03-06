import { Component } from 'vue'

export interface BasicTabbarProps {
  tabs: TabbarItemSchema[]
  modelValue?: string
  closable?: boolean
  draggable?: boolean
  showIcon?: boolean
  type?: TabType
  tabStyle?: Recordable
}

export interface TabbarItemSchema {
  title: string
  key: string
  icon?: string | Component
  fixed?: boolean
  closable?: boolean
}

export type TabType = 'normal' | 'card'
