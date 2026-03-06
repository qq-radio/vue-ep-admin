import type { Component } from 'vue'

export interface BasicBreadcrumbProps {
  breadcrumbs?: BreadcrumbItemSchema[]
  showIcon?: boolean
  separator?: string
}

export interface BreadcrumbItemSchema {
  path: string
  title: string
  icon?: Component | string
  style?: Recordable
}
