<template>
  <BasicTabbar
    v-model="activeTab"
    :tabs="tabs"
    @tab-change="handleTabChange"
    @tab-click="handleTabClick"
    @tab-close="handleTabClose"
    @tab-unpin="handleTabUnpin"
  />
</template>

<script setup lang="ts">
import { BasicTabbar, TabbarItemSchema } from '@center/components'

import { ref } from 'vue'

const activeTab = ref('about')

const tabs: Ref<TabbarItemSchema[]> = ref([
  {
    key: 'patient',
    title: '患者管理',
    fixed: true,
  },
  {
    key: 'medical-record',
    title: '病历管理',
    fixed: true,
  },
  {
    key: 'prescription',
    title: '处方管理',
  },
  {
    key: 'inventory',
    title: '药品库存',
  },
  {
    key: 'report',
    title: '检验报告',
  },
  {
    key: 'billing',
    title: '收费结算',
  },
  {
    key: 'appointment',
    title: '预约管理',
  },
])

const handleTabChange = (tabKey) => {
  console.log('tab-change', tabKey)
}

const handleTabClick = (tab, event) => {
  console.log('tab-click', tab, event)
}

const handleTabClose = (tabKey, tabIndex) => {
  console.log('tab-close', tabKey, tabIndex)

  if (tabKey === activeTab.value && tabs.value.length > 1) {
    const nextIndex = tabIndex === tabs.value.length - 1 ? tabIndex - 1 : tabIndex + 1
    activeTab.value = tabs.value[nextIndex].key
  }
  tabs.value.splice(tabIndex, 1)
}

const handleTabUnpin = (tabKey, tabIndex) => {
  console.log('tab-unpin', tabKey, tabIndex)

  const tab = tabs.value[tabIndex]
  tabs.value.splice(tabIndex, 1, {
    ...tab,
    fixed: false,
  })
}
</script>
