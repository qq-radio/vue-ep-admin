<template>
  <el-breadcrumb :class="ns.b()" :separator="separator">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="{ path: item.path }">
      <div :class="ns.e('item')">
        <el-icon v-if="showIcon && item.icon" :class="ns.e('icon')">
          <component :is="item.icon" />
        </el-icon>
        {{ item.title }}
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import type { BasicBreadcrumbProps } from './type'

import { useBasicNamespace } from '@center/composables'

const ns = useBasicNamespace('breadcrumb')

defineOptions({
  name: 'BasicBreadcrumb',
})

withDefaults(defineProps<BasicBreadcrumbProps>(), {
  breadcrumbs: () => [],
  separator: '>',
})
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
