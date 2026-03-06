import type { AppMenuItem } from '#/types/menu'
import type { RouteRecordRaw } from 'vue-router'

import { ROOT_ROUTE } from '@/router'

export const useMenuStore = defineStore('menu', () => {
  const router = useRouter()
  const route = useRoute()
  const { getPreferenceSetting } = storeToRefs(usePreferenceStore())

  const navType = computed(() => getPreferenceSetting.value.navType)

  const allRoutes: Readonly<RouteRecordRaw[]> = router.options.routes

  const rootRoutes: Readonly<RouteRecordRaw[]> =
    allRoutes.find((item) => item.path === ROOT_ROUTE.path)?.children || []

  const rootMenus: AppMenuItem[] = transformRoutesToMenus(rootRoutes)

  const headerMenus = ref<AppMenuItem[]>([])

  const sidebarMenus = ref<AppMenuItem[]>([])

  const getHeaderMenus = computed(() => headerMenus.value)

  const getSidebarMenus = computed(() => sidebarMenus.value)

  const activeHeaderMenuKey = ref<string>()

  const activSidebarMenuKey = ref<string>()

  const getActiveHeaderMenuKey = computed(() => activeHeaderMenuKey.value)

  const getActiveSidebarMenuKey = computed(() => activSidebarMenuKey.value)

  watch(
    () => navType.value,
    () => {
      setHeaderMenus()
      setSidebarMenus()
    },
    { immediate: true },
  )

  watch(
    () => [route.path, navType.value],
    () => {
      setActiveMenuKey()
    },
    { immediate: true },
  )

  function setHeaderMenus() {
    if (navType.value === 'vertical') {
      headerMenus.value = []
    } else if (navType.value === 'horizontal') {
      headerMenus.value = rootMenus
    } else if (navType.value === 'mixed') {
      headerMenus.value = rootMenus.map((m) => ({ ...m, children: [] }))
    }
  }

  function setSidebarMenus() {
    if (navType.value === 'vertical') {
      sidebarMenus.value = rootMenus
    } else if (navType.value === 'horizontal') {
      sidebarMenus.value = []
    } else if (navType.value === 'mixed') {
      sidebarMenus.value = []
    }
  }

  function handleHeaderMenuClick(key) {
    const rootMenu = rootMenus.find((m) => m.path === key)
    sidebarMenus.value = rootMenu?.children || []
  }

  function setActiveMenuKey() {
    if (navType.value === 'vertical') {
      activeHeaderMenuKey.value = undefined
      activSidebarMenuKey.value = route.path
    } else if (navType.value === 'horizontal') {
      activeHeaderMenuKey.value = route.path
      activSidebarMenuKey.value = undefined
    } else if (navType.value === 'mixed') {
      const matched = route.matched.slice(1, route.matched.length)
      activeHeaderMenuKey.value = matched[0].path
      activSidebarMenuKey.value = matched[matched.length - 1].path
      handleHeaderMenuClick(activeHeaderMenuKey.value)
    }
  }

  return {
    getHeaderMenus,
    getSidebarMenus,
    getActiveHeaderMenuKey,
    getActiveSidebarMenuKey,
    handleHeaderMenuClick,
  }
})

function transformRoutesToMenus(routes: Readonly<RouteRecordRaw[]>) {
  const menus: AppMenuItem[] = []

  const loop = (routeArray: Readonly<RouteRecordRaw[]>) => {
    for (const routeItem of routeArray) {
      const menuItem: AppMenuItem = {
        path: routeItem.path,
        name: routeItem.name as string,
        meta: {
          title: routeItem.meta?.title || '',
          icon: routeItem.meta?.icon,
          hidden: routeItem.meta?.hideInMenu,
          disabled: routeItem.meta?.forbidden,
        },
      }
      if (routeItem.children) {
        menuItem.children = transformRoutesToMenus(routeItem.children)
      }
      menus.push(menuItem)
    }
  }

  loop(routes)

  return menus
}
