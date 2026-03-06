<template>
  <BasicTabbar v-model="activeTab" :tabs="tabs">
    <template #prefix>
      <el-icon style="margin-left: 8px"><User /></el-icon>
    </template>
    <template #suffix>
      <BasicDropdown :menus="menus" @command="onCommand">
        <el-icon><ArrowDown /></el-icon>
      </BasicDropdown>
      <el-icon style="margin: 0 8px"><RefreshRight /></el-icon>
      <el-icon style="margin-right: 8px" @click="fullscreen = !fullscreen">
        <Rank v-if="fullscreen" />
        <FullScreen v-else />
      </el-icon>
    </template>
  </BasicTabbar>
</template>

<script setup lang="ts">
import {
  BasicTabbar,
  BasicDropdown,
  DropdownItemSchema,
  TabbarItemSchema,
} from '@center/components'

import {
  ArrowDown,
  RefreshRight,
  FullScreen,
  Rank,
  Download,
  Upload,
  Refresh,
  User,
} from '@element-plus/icons-vue'
import { ref, shallowRef } from 'vue'

const fullscreen = ref()

const activeTab = ref('order')

const tabs: Ref<TabbarItemSchema[]> = shallowRef([
  {
    key: 'order',
    title: '订单管理',
  },
  {
    key: 'product',
    title: '产品管理',
  },
  {
    key: 'product-list',
    title: '产品列表',
  },
  {
    key: 'product-category',
    title: '分类管理',
  },
  {
    key: 'product-brand',
    title: '品牌管理',
  },
  {
    key: 'product-review',
    title: '评价管理',
  },
  {
    key: 'analytic',
    title: '数据分析',
  },
  {
    key: 'setting',
    title: '系统设置',
  },
])

const menus: DropdownItemSchema[] = [
  {
    name: '导入数据',
    command: 'import',
    icon: Upload,
  },
  {
    name: '导出数据',
    command: 'export',
    icon: Download,
  },
  {
    name: '同步数据',
    command: 'sync',
    icon: Refresh,
    divided: true,
  },
]

const onCommand = (v) => {
  console.log('onCommand', v)
}
</script>

<style scoped lang="scss">
.el-icon {
  cursor: pointer;
}
</style>
