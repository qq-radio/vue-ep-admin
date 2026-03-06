<template>
  <Layout
    :nav-type="getPreferenceSetting.navType"
    :collapsed="getPreferenceSetting.collapsed"
    :show-aside="getPreferenceSetting.navType === 'vertical' || !!getSidebarMenus.length"
    :show-breadcrumb="getPreferenceSetting.showBreadcrumb"
    :show-footer="getPreferenceSetting.showFooter"
    :content-fullscreen="contentFullscreen"
  >
    <template #logo>
      <Logo
        :collapsed="getPreferenceSetting.collapsed && getPreferenceSetting.navType === 'vertical'"
      />
    </template>
    <template #extra>
      <Extra :nav-type="getPreferenceSetting.navType" @open-drawer="settingDrawerVisible = true" />
    </template>
    <template #header-menu>
      <BasicRouteMenu
        :model-value="getActiveHeaderMenuKey"
        :menus="getHeaderMenus"
        mode="horizontal"
        router
        @update:active-menu="handleHeaderMenuClick"
        @click-menu-item="handleMenuClick"
      />
    </template>
    <template #sidebar-menu>
      <BasicRouteMenu
        :model-value="getActiveSidebarMenuKey"
        :menus="getSidebarMenus"
        show-collapse-button
        router
        :collapse-transition="false"
        :collapsed="getPreferenceSetting.collapsed"
        @update:collapsed="(v) => updatePreferenceSetting('collapsed', v)"
        @click-menu-item="handleMenuClick"
      />
    </template>
    <template v-if="getPreferenceSetting.showBreadcrumb" #breadcrumb>
      <BasicBreadcrumb
        :breadcrumbs="breadcrumbs"
        :show-icon="getPreferenceSetting.showBreadcrumbIcon"
      />
    </template>
    <template v-if="getPreferenceSetting.showTabBar" #tabbar>
      <BasicTabbar
        :model-value="getActiveTabKey"
        :tabs="getTabs"
        :type="getPreferenceSetting.tabStyle"
        :draggable="getPreferenceSetting.enableTabDrag"
        :show-icon="getPreferenceSetting.showTabIcon"
        @tab-contextmenu="handleTabRightClick"
        @tab-click="handleTabClick"
        @tab-close="handleTabClose"
        @tab-unpin="handleTabUnpin"
        @tabs-sort="handleTabsSort"
      >
        <template #suffix>
          <div class="flex items-center gap-1 h-full">
            <BasicDropdown
              v-if="getPreferenceSetting.showTabMoreButton"
              :menus="getDropdownMenus"
              trigger="click"
              class="h-full"
            >
              <el-icon class="suffix-icon">
                <ArrowDown />
              </el-icon>
            </BasicDropdown>
            <el-icon
              v-if="getPreferenceSetting.showTabRefreshButton"
              class="suffix-icon"
              @click="refreshTab"
            >
              <RefreshRight />
            </el-icon>
            <el-icon
              v-if="getPreferenceSetting.showTabMaximizeButton"
              class="suffix-icon"
              @click="contentFullscreen = !contentFullscreen"
            >
              <img v-if="contentFullscreen" src="@/assets/exit-fullscreen.svg" class="h-4 w-4" />
              <img v-else src="@/assets/fullscreen.svg" class="h-4 w-4" />
            </el-icon>
          </div>
        </template>
      </BasicTabbar>
      <BasicContextMenu
        v-model:visible="contextMenuVisible"
        :menus="getContextMenus"
        :position="contextMenuPosition"
      />
    </template>
    <template #content>
      <RouterView v-slot="{ Component, route }">
        <template v-if="route.meta.forbidden">
          <Forbidden />
        </template>
        <template v-else>
          <IFrameView
            v-show="route.meta.iframeSrc"
            :current-component="Component"
            :current-route="route"
          />
          <Transition name="fade" mode="out-in">
            <KeepAlive :include="getKeepAliveNames">
              <component
                :is="Component"
                v-if="!route.meta.iframeSrc && renderRouteView"
                :key="route.fullPath"
              />
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </template>
    <template #footer>
      <Footer />
    </template>
  </Layout>
  <SettingDrawer
    v-model="settingDrawerVisible"
    :setting="getPreferenceSetting"
    @update="updatePreferenceSetting"
    @reset="resetPreferenceSetting"
  />
</template>

<script setup lang="ts">
import type { AppTabItem } from '#/types/tabbar'

import {
  getRouteBreadcrumb,
  getFixedTabsFromRoutes,
  normalizeRouteToTab,
  openWindow,
} from './utils'
import { ArrowDown, RefreshRight } from '@element-plus/icons-vue'

import {
  BasicRouteMenu,
  BasicBreadcrumb,
  BasicTabbar,
  BasicDropdown,
  BasicContextMenu,
} from '@center/components'
import Layout from './components/Layout.vue'
import Logo from './components/Logo.vue'
import Extra from './components/Extra.vue'
import Footer from './components/Footer.vue'
import SettingDrawer from './components/SettingDrawer.vue'
import IFrameView from './components/IframeView.vue'
import Forbidden from '@/views/error/403.vue'
import type { AppMenuItem } from '#/types/menu'

const router = useRouter()
const route = useRoute()

const { getPreferenceSetting } = storeToRefs(usePreferenceStore())
const { updatePreferenceSetting, resetPreferenceSetting } = usePreferenceStore()

const { getHeaderMenus, getSidebarMenus, getActiveHeaderMenuKey, getActiveSidebarMenuKey } =
  storeToRefs(useMenuStore())
const { handleHeaderMenuClick } = useMenuStore()

const { getTabs, getActiveTabKey, renderRouteView } = storeToRefs(useTabbarStore())
const {
  setActiveTabKey,
  setTargetTab,
  getDropdownMenus,
  getContextMenus,

  addTab,
  clearTabs,
  closeTab,
  refreshTab,
  pinTab,
  unpinTab,
} = useTabbarStore()

const { getKeepAliveNames } = storeToRefs(useKeepAliveStore())

const contextMenuVisible = ref(false)
const contextMenuPosition = ref()

const settingDrawerVisible = ref(false)

const contentFullscreen = ref(false)

const breadcrumbs = computed(() => getRouteBreadcrumb(route))

watch(
  () => route.fullPath,
  () => {
    addTab(normalizeRouteToTab(route))
    setActiveTabKey(route.fullPath)
  },
  { immediate: true },
)

function handleMenuClick(item: AppMenuItem) {
  if (item.meta.link) {
    openWindow(item.meta.link)
    return
  }

  if (item.meta.openInNewWindow) {
    openWindow(item.path)
    return
  }

  router.push(item.path)
}

function handleTabRightClick(params) {
  openContextMenu(params.$event as MouseEvent)
  setTargetTab(params.tab as AppTabItem)
}

function openContextMenu(event: MouseEvent) {
  const { clientX, clientY } = event
  contextMenuPosition.value = {
    left: clientX,
    top: clientY,
  }
  contextMenuVisible.value = true
}

function handleTabClick(params) {
  const tab = params.tab as AppTabItem
  router.push(tab.key)
}

function handleTabClose(params) {
  const tab = params.tab as AppTabItem
  closeTab(tab)
}

function handleTabUnpin(params) {
  const tab = params.tab as AppTabItem
  unpinTab(tab)
}

function handleTabsSort(tabs: AppTabItem[]) {
  getTabs.value = tabs
}

function initFixedTabs() {
  const fixedTabRoutes = getFixedTabsFromRoutes()
  fixedTabRoutes.forEach((tab) => {
    addTab(tab)
    pinTab(tab)
  })
}

if (!getPreferenceSetting.value.enablePersistentTab) {
  clearTabs()
}

onMounted(() => {
  initFixedTabs()
})
</script>

<style scoped lang="scss">
.suffix-icon {
  height: 100%;
  width: 36px;
  border-left: 1px solid #f0f0f0;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
}
</style>
