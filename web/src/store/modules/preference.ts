import type { AppSetting } from '#/types/preference'

import { cloneDeep } from 'lodash-es'

const DEFAULT_SETTING: AppSetting = {
  navType: 'vertical',
  showTabBar: true,
  enablePersistentTab: true,
  tabStyle: 'normal',
  maxTabCount: 0,
  enableTabDrag: true,
  showTabIcon: true,
  showTabMoreButton: true,
  showTabRefreshButton: true,
  showTabMaximizeButton: true,
  collapsed: true,
  showBreadcrumb: true,
  showBreadcrumbIcon: true,
  showFooter: false,
  showWatermark: false,
}

export const usePreferenceStore = defineStore(
  'preference',
  () => {
    const preferenceSetting = ref(cloneDeep(DEFAULT_SETTING))

    const getPreferenceSetting = computed(() => preferenceSetting.value)

    function updatePreferenceSetting(key: string, value: any) {
      preferenceSetting.value[key] = value
    }

    function resetPreferenceSetting() {
      preferenceSetting.value = cloneDeep(DEFAULT_SETTING)
    }

    return {
      preferenceSetting,
      getPreferenceSetting,
      updatePreferenceSetting,
      resetPreferenceSetting,
    }
  },
  {
    persist: usePiniaPersist({
      pick: ['preferenceSetting'],
    }),
  },
)
