<template>
  <div>朴素风格</div>
  <BasicTabbar v-model="activeTab1" :tabs="tabs" />
  <el-divider />
  <div>卡片风格</div>
  <BasicTabbar v-model="activeTab2" :tabs="tabs" type="card" />
</template>

<script setup lang="ts">
import { BasicTabbar, TabbarItemSchema } from '@center/components'

import { ref, shallowRef } from 'vue'
import { House, InfoFilled, Service, Picture, Phone } from '@element-plus/icons-vue'

const activeTab1 = ref('about')
const activeTab2 = ref('service')

const tabs: Ref<TabbarItemSchema[]> = shallowRef([
  {
    key: 'home',
    title: '首页',
    path: '/',
    icon: House,
  },
  {
    key: 'about',
    title: '关于我们',
    path: '/about',
    icon: InfoFilled,
  },
  {
    key: 'service',
    title: '服务项目',
    path: '/service',
    icon: Service,
  },
  {
    key: 'portfolio',
    title: '案例展示',
    path: '/portfolio',
    icon: Picture,
  },
  {
    key: 'contact',
    title: '联系我们',
    path: '/contact',
    icon: Phone,
  },
])
</script>
