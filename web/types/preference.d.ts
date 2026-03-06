export type AppNavType = 'vertical' | 'horizontal' | 'mixed'

export type AppTabStyle = 'normal' | 'card'

export interface AppSetting {
  navType: AppNavType
  showTabBar: boolean
  enablePersistentTab: boolean
  tabStyle: AppTabStyle
  maxTabCount: number
  enableTabDrag: boolean
  showTabIcon: boolean
  showTabMoreButton: boolean
  showTabRefreshButton: boolean
  showTabMaximizeButton: boolean
  collapsed: boolean
  showBreadcrumb: boolean
  showBreadcrumbIcon: boolean
  showFooter: boolean
  showWatermark: boolean
}
