<template>
  <BasicBreadcrumb :breadcrumbs="breadcrumbs" show-icon />
</template>

<script setup lang="ts">
import { BasicBreadcrumb, type BreadcrumbItemSchema } from '@center/components'

import { User, Setting } from '@element-plus/icons-vue'

const breadcrumbs: BreadcrumbItemSchema[] = [
  {
    path: '/system',
    title: '系统管理',
    icon: Setting,
  },
  {
    path: '/system/user',
    title: '用户管理',
    icon: User,
  },
]
</script>
