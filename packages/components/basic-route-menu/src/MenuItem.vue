<template>
  <template v-if="!itemMeta.hidden">
    <el-sub-menu v-if="hasChildren" :class="ns.b()" :index="itemPath" :disabled="itemMeta.disabled">
      <template #title>
        <el-icon v-if="itemMeta.icon"><component :is="itemMeta.icon" /></el-icon>
        <component :is="MenuIcon" v-else />
        <BasicText truncated style="width: 120px">{{ itemMeta.title }}</BasicText>
      </template>
      <MenuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="itemPath"
      />
    </el-sub-menu>
    <el-menu-item
      v-else
      :class="ns.b()"
      :index="itemPath"
      :disabled="itemMeta.disabled"
      @click="emit('click')"
    >
      <el-icon v-if="itemMeta.icon"><component :is="itemMeta.icon" /></el-icon>
      <component :is="MenuIcon" v-else />
      <template #title>
        <BasicText truncated style="width: 120px">{{ itemMeta.title }}</BasicText>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteMenuItemProps } from './type'

import { useBasicNamespace } from '@center/composables'
import { BasicText } from '@center/components'

import { computed } from 'vue'
import path from 'path-browserify'

import MenuIcon from './MenuIcon.vue'

const ns = useBasicNamespace('route-menu-item')

const emit = defineEmits(['click'])

const props = withDefaults(defineProps<RouteMenuItemProps>(), {})

const itemPath = resolvePath(props.item.path)

const itemMeta = computed(() => props.item.meta || {})

const hasChildren = computed(() => {
  return props.item.children?.some((child) => !child.meta?.hidden)
})

function resolvePath(routePath: string) {
  if (routePath.startsWith('/')) {
    return routePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>

<style lang="scss" scoped>
@use './style.scss';
</style>
