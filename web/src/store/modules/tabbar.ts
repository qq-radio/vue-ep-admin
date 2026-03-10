import type { AppTabItem } from '#/types/tabbar'
import type { ContextMenuItem, DropdownItemSchema } from '@center/components'

import { HOME_ROUTE } from '@/router'
import { startProgress, stopProgress } from '@/utils/nprogress'
import { cloneDeep } from 'lodash-es'

export const useTabbarStore = defineStore(
  'tabbar',
  () => {
    const router = useRouter()
    const { addKeepAliveName, deleteKeepAliveName, setKeepAliveNames } = useKeepAliveStore()

    const renderRouteView: Ref<boolean> = ref(true)
    const tabUsage: Ref<Record<string, number>> = ref({})
    const maxTabCount: ComputedRef<number> = computed(
      () => usePreferenceStore().getPreferenceSetting.maxTabCount,
    )

    /**
     * active tab
     */
    const activeTabKey: Ref<string | undefined> = ref()
    const getActiveTabKey: ComputedRef<string | undefined> = computed(() => activeTabKey.value)
    const getActiveTab: ComputedRef<AppTabItem | undefined> = computed(() =>
      tabs.value.find((item) => item.key === getActiveTabKey.value),
    )

    watch(
      () => getActiveTabKey.value,
      (key) => {
        if (key) {
          tabUsage.value[key] = Date.now()
        }
      },
      { immediate: true },
    )

    function setActiveTabKey(key: string) {
      activeTabKey.value = key
    }

    /**
     * target tab
     */
    const targetTab: Ref<AppTabItem | undefined> = ref()
    const getTargetTab: ComputedRef<AppTabItem | undefined> = computed(() => targetTab.value)

    function setTargetTab(tab: AppTabItem) {
      targetTab.value = tab
    }

    /**
     * tabs
     */
    const tabs: Ref<AppTabItem[]> = ref([])
    const getTabs: WritableComputedRef<AppTabItem[], AppTabItem[]> = computed({
      get: () => {
        return tabs.value
      },
      set: (v) => {
        tabs.value = [...v]
      },
    })
    const closable: ComputedRef<boolean> = computed(() => tabs.value.length > 1)

    /**
     * dropdown menus
     */
    const dropdownMenus: Ref<DropdownItemSchema[]> = ref([
      {
        name: '关闭',
        command: 'close',
        disabled: computed(() => {
          if (!closable.value) return true
          if (!getActiveTab.value) return true
          return isAffixTab(getActiveTab.value)
        }),
        onClick: () => {
          if (getActiveTab.value) {
            closeTab(getActiveTab.value)
          }
        },
      },
      {
        name: '固定',
        command: 'pin',
        disabled: computed(() => {
          if (getTargetTab.value) {
            return isAffixTab(getTargetTab.value)
          }
        }),
        onClick: () => {
          if (getActiveTab.value) {
            pinTab(getActiveTab.value)
          }
        },
      },
      {
        name: '取消固定',
        command: 'unpin',
        disabled: computed(() => {
          if (!getActiveTab.value) return true
          return !isAffixTab(getActiveTab.value)
        }),
        onClick: () => {
          if (getActiveTab.value) {
            unpinTab(getActiveTab.value)
          }
        },
      },
      {
        name: '刷新',
        command: 'refresh',
        disabled: computed(() => {
          if (!getActiveTab.value) return true
        }),
        onClick: () => {
          refreshTab()
        },
      },
      {
        name: '关闭左侧标签页',
        command: 'closeLeft',
        disabled: computed(() => {
          if (getActiveTab.value) {
            const leftTabs = tabs.value.slice(0, getTabIndexByKey(getActiveTab.value.key))
            return excludeAffixTabs(leftTabs).length === 0
          }
        }),
        divided: true,
        onClick: () => {
          if (getActiveTab.value) {
            closeLeftTabs(getActiveTab.value)
          }
        },
      },
      {
        name: '关闭右侧标签页',
        command: 'closeRight',
        disabled: computed(() => {
          if (getActiveTab.value) {
            const rightTabs = tabs.value.slice(getTabIndexByKey(getActiveTab.value.key) + 1)
            return excludeAffixTabs(rightTabs).length === 0
          }
        }),
        onClick: () => {
          if (getActiveTab.value) {
            closeRightTabs(getActiveTab.value)
          }
        },
      },
      {
        name: '关闭其它标签页',
        command: 'closeOthers',
        disabled: computed(() => {
          if (getActiveTab.value) {
            const leftTabs = tabs.value.slice(0, getTabIndexByKey(getActiveTab.value.key))
            const rightTabs = tabs.value.slice(getTabIndexByKey(getActiveTab.value.key) + 1)
            return (
              excludeAffixTabs(leftTabs).length === 0 && excludeAffixTabs(rightTabs).length === 0
            )
          }
        }),
        divided: true,
        onClick: () => {
          if (getActiveTab.value) {
            closeOtherTabs(getActiveTab.value)
          }
        },
      },
      {
        name: '关闭所有标签页',
        command: 'closeAll',
        disabled: computed(() => {
          if (!closable.value) return true
          return !excludeAffixTabs(tabs.value).length
        }),
        onClick: () => {
          closeAllTabs()
        },
      },
    ])

    const getDropdownMenus: ComputedRef<DropdownItemSchema[]> = computed(() => dropdownMenus.value)

    /**
     * context menus
     */
    const contextMenus: Ref<ContextMenuItem[]> = ref([
      {
        name: '关闭',
        key: 'close',
        disabled: computed(() => {
          if (!closable.value) return true
          if (!getTargetTab.value) return true
          return isAffixTab(getTargetTab.value)
        }),
        onClick: () => {
          if (getTargetTab.value) {
            closeTab(getTargetTab.value)
          }
        },
      },
      {
        name: '固定',
        key: 'pin',
        disabled: computed(() => {
          if (getTargetTab.value) {
            return isAffixTab(getTargetTab.value)
          }
        }),
        onClick: () => {
          if (getTargetTab.value) {
            pinTab(getTargetTab.value)
          }
        },
      },
      {
        name: '取消固定',
        key: 'unpin',
        disabled: computed(() => {
          if (getTargetTab.value) {
            return !isAffixTab(getTargetTab.value)
          }
        }),
        onClick: () => {
          if (getTargetTab.value) {
            unpinTab(getTargetTab.value)
          }
        },
      },
      {
        name: '刷新',
        key: 'refresh',
        disabled: computed(() => getTargetTab.value?.key !== getActiveTabKey.value),
        onClick: () => {
          refreshTab()
        },
      },
      {
        name: '关闭左侧标签页',
        key: 'closeLeft',
        disabled: computed(() => {
          if (getTargetTab.value) {
            const leftTabs = tabs.value.slice(0, getTabIndexByKey(getTargetTab.value.key))
            return excludeAffixTabs(leftTabs).length === 0
          }
        }),
        divided: true,
        onClick: () => {
          if (getTargetTab.value) {
            closeLeftTabs(getTargetTab.value)
          }
        },
      },
      {
        name: '关闭右侧标签页',
        key: 'closeRight',
        disabled: computed(() => {
          if (getTargetTab.value) {
            const rightTabs = tabs.value.slice(getTabIndexByKey(getTargetTab.value.key) + 1)
            return excludeAffixTabs(rightTabs).length === 0
          }
        }),
        onClick: () => {
          if (getTargetTab.value) {
            closeRightTabs(getTargetTab.value)
          }
        },
      },
      {
        name: '关闭其它标签页',
        key: 'closeOthers',
        disabled: computed(() => {
          if (getTargetTab.value) {
            const leftTabs = tabs.value.slice(0, getTabIndexByKey(getTargetTab.value?.key))
            const rightTabs = tabs.value.slice(getTabIndexByKey(getTargetTab.value?.key) + 1)
            return (
              excludeAffixTabs(leftTabs).length === 0 && excludeAffixTabs(rightTabs).length === 0
            )
          }
        }),
        divided: true,
        onClick: () => {
          if (getTargetTab.value) {
            closeOtherTabs(getTargetTab.value)
          }
        },
      },
      {
        name: '关闭所有标签页',
        key: 'closeAll',
        disabled: computed(() => {
          if (!closable.value) return true
          return excludeAffixTabs(tabs.value).length === 0
        }),
        onClick: () => {
          closeAllTabs()
        },
      },
    ])

    const getContextMenus: ComputedRef<ContextMenuItem[]> = computed(() => contextMenus.value)

    /**
     * tab methods
     */
    function addTab(tab: AppTabItem) {
      if (!isExistedTab(tab.key) && tab.title) {
        if (maxTabCount.value && tabs.value.length >= maxTabCount.value) {
          const earliestTab = findEarliestUsedTab()
          if (earliestTab) {
            closeTab(earliestTab)
          }
        }
        tabs.value.push(cloneDeep(tab))
      }
    }

    function clearTabs() {
      tabs.value = []
    }

    function closeTab(tab: AppTabItem) {
      const tabIndex = getTabIndexByKey(tab.key)
      if (tabIndex !== -1) {
        if (tab.key === getActiveTabKey.value) {
          const newIndex = tabIndex === tabs.value.length - 1 ? tabIndex - 1 : tabIndex + 1
          const newTab = tabs.value[newIndex]
          activeTabKey.value = newTab.key
          router.push(newTab.fullPath)
        }
        tabs.value.splice(tabIndex, 1)
      }

      deleteKeepAliveName(tab.name)
    }

    function closeCurrentTab() {
      if (getActiveTab.value) {
        closeTab(getActiveTab.value)
      }
    }

    function closeLeftTabs(tab: AppTabItem) {
      const tabIndex = getTabIndexByKey(tab.key)
      const waitCloseTabs = excludeAffixTabs(tabs.value.slice(0, tabIndex))
      const waitCloseKeys = mapTabKeys(waitCloseTabs)
      batchCloseTabs(waitCloseKeys)
    }

    function closeRightTabs(tab: AppTabItem) {
      const tabIndex = getTabIndexByKey(tab.key)
      const waitCloseTabs = excludeAffixTabs(tabs.value.slice(tabIndex + 1))
      const waitCloseKeys = mapTabKeys(waitCloseTabs)
      batchCloseTabs(waitCloseKeys)
    }

    function closeOtherTabs(tab: AppTabItem) {
      const tabIndex = getTabIndexByKey(tab.key)
      const waitCloseTabs = [
        ...excludeAffixTabs(tabs.value.slice(0, tabIndex)),
        ...excludeAffixTabs(tabs.value.slice(tabIndex + 1)),
      ]
      const waitCloseKeys = mapTabKeys(waitCloseTabs)
      batchCloseTabs(waitCloseKeys)
    }

    function closeAllTabs() {
      const waitCloseTabs = excludeAffixTabs(tabs.value)
      const waitCloseKeys = mapTabKeys(waitCloseTabs)
      batchCloseTabs(waitCloseKeys)
    }

    function batchCloseTabs(keys: string[]) {
      const clonedTabs = cloneDeep(tabs.value)
      const oldActiveTabIndex = getTabIndexByKey(getActiveTabKey.value as string)
      const oldTabs = [
        ...clonedTabs.slice(oldActiveTabIndex, oldActiveTabIndex + 1),
        ...clonedTabs.slice(oldActiveTabIndex + 1),
        ...clonedTabs.slice(0, oldActiveTabIndex).reverse(),
      ]
      const newTabs = tabs.value.filter((item) => !keys.includes(item.key))

      if (newTabs.length) {
        tabs.value = newTabs
        const newTabKeys = newTabs.map((t) => t.key)
        for (const item of oldTabs) {
          if (newTabKeys.includes(item.key)) {
            activeTabKey.value = item.key
            router.push(item.fullPath)
            break
          }
        }
      } else {
        tabs.value = [
          {
            key: HOME_ROUTE.path,
            fullPath: HOME_ROUTE.path,
            name: HOME_ROUTE.name,
            title: HOME_ROUTE.meta.title,
            icon: HOME_ROUTE.meta.icon,
          },
        ]
        router.push('/')
      }

      setKeepAliveNames(tabs.value.map((tab) => tab.name))
    }

    async function refreshTab() {
      if (getActiveTab.value) {
        deleteKeepAliveName(getActiveTab.value.name)
        renderRouteView.value = false
        startProgress()
        await new Promise((resolve) => setTimeout(resolve, 200))
        addKeepAliveName(getActiveTab.value.name)
        renderRouteView.value = true
        stopProgress()
      }
    }

    function pinTab(tab: AppTabItem) {
      const tabIndex = getTabIndexByKey(tab.key)
      const newTab = {
        ...tabs.value[tabIndex],
        fixed: true,
      }
      tabs.value.splice(tabIndex, 1, newTab)
      sortTabs()
    }

    function unpinTab(tab: AppTabItem) {
      const tabIndex = getTabIndexByKey(tab.key)
      const newTab = {
        ...tabs.value[tabIndex],
        fixed: false,
      }
      tabs.value.splice(tabIndex, 1, newTab)
      sortTabs()
    }

    function sortTabs() {
      const affixTabs: AppTabItem[] = []
      const nonAffixTabs: AppTabItem[] = []
      tabs.value.forEach((tab) => {
        if (isAffixTab(tab)) {
          affixTabs.push(tab)
        } else {
          nonAffixTabs.push(tab)
        }
      })
      tabs.value = [...affixTabs, ...nonAffixTabs]
    }

    function setTabTitle(key: string, title: string) {
      const tab = getTabByKey(key)
      if (tab) {
        setTabAttribute({
          key: tab.key,
          title,
        })
      }
    }

    function setTabAttribute(tab: PickRequired<AppTabItem, 'key'> & Partial<AppTabItem>) {
      const tabIndex = getTabIndexByKey(tab.key)
      if (tabIndex !== -1) {
        tabs.value[tabIndex] = {
          ...tabs.value[tabIndex],
          ...tab,
        }
      }
    }

    /**
     * tab utils
     */
    function getTabByKey(key: string) {
      return tabs.value.find((item) => item.key === key)
    }

    function getTabIndexByKey(key: string) {
      return tabs.value.findIndex((item) => item.key === key)
    }

    function isExistedTab(key: string) {
      return tabs.value.some((item) => item.key === key)
    }

    function isAffixTab(tab: AppTabItem) {
      return tab.fixed === true
    }

    function excludeAffixTabs(tabs: AppTabItem[]) {
      return tabs.filter((tab) => !isAffixTab(tab))
    }

    function mapTabKeys(tabs: AppTabItem[]) {
      return tabs.map((tab) => tab.key)
    }

    function findEarliestUsedTab() {
      let minUsage = 0
      let candidate: AppTabItem | undefined

      if (tabs.value) {
        tabs.value.forEach((tab) => {
          const time = tabUsage.value[tab.key]
          if (!isAffixTab(tab) && time) {
            const diffTime = Date.now() - time
            if (diffTime > minUsage) {
              minUsage = diffTime
              candidate = tab
            }
          }
        })
      }

      return candidate
    }

    return {
      renderRouteView,
      tabUsage,

      /**
       * active tab
       */
      getActiveTabKey,
      setActiveTabKey,

      /**
       * target tab
       */
      getTargetTab,
      setTargetTab,

      /**
       * tabs
       */
      tabs,
      getTabs,

      /**
       * tab menus
       */
      getDropdownMenus,
      getContextMenus,

      /**
       * tab methods
       */
      addTab,
      clearTabs,
      closeTab,
      closeCurrentTab,
      closeLeftTabs,
      closeRightTabs,
      closeOtherTabs,
      closeAllTabs,
      refreshTab,
      pinTab,
      unpinTab,
      setTabTitle,
    }
  },
  {
    persist: usePiniaPersist({
      storageType: 'sessionStorage',
      pick: ['tabs', 'tabUsage'],
    }),
  },
)
