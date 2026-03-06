<template>
  <div
    :class="{
      [ns.b()]: true,
      collapsed,
      top: showCollapseButton && getCollapseButtonPosition.top,
      bottom: showCollapseButton && getCollapseButtonPosition.bottom,
    }"
    :style="{
      width: mode === 'vertical' ? (isCollapsed ? collapsedWidth : expandedWidth || width) : '100%',
    }"
  >
    <div
      v-if="showCollapseButton && mode === 'vertical' && getCollapseButtonPosition.top"
      :class="{ [ns.e('collapse-button')]: true, collapsed, ...getCollapseButtonPosition }"
    >
      <el-icon @click="toggleCollapse">
        <DArrowRight v-if="isCollapsed" />
        <DArrowLeft v-else />
      </el-icon>
    </div>
    <el-menu v-bind="getBindValues" @select="handleMenuSelect">
      <MenuItem
        v-for="route in visibleRoutes"
        :key="route.path"
        :item="route"
        @click="emit('click-menu-item', route)"
      >
        <template #menu-icon="slotProps">
          <slot name="menu-icon" :item="slotProps.item" />
        </template>
        <template #menu-title="slotProps">
          <slot name="menu-title" :item="slotProps.item" />
        </template>
      </MenuItem>
    </el-menu>
    <div
      v-if="showCollapseButton && mode === 'vertical' && getCollapseButtonPosition.bottom"
      :class="{ [ns.e('collapse-button')]: true, collapsed, ...getCollapseButtonPosition }"
    >
      <el-icon @click="toggleCollapse">
        <DArrowRight v-if="isCollapsed" />
        <DArrowLeft v-else />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BasicRouteMenuProps, RouteMenuItemSchema } from './type'

import { useBasicNamespace } from '@center/composables'

import { provide, ref, computed, useAttrs } from 'vue'
import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue'

import MenuItem from './MenuItem.vue'

const ns = useBasicNamespace('route-menu')

defineOptions({
  name: 'BasicRouteMenu',
})

const attrs = useAttrs()

const emit = defineEmits([
  'update:modelValue',
  'update:activeMenu',
  'update:collapsed',
  'click-menu-item',
])

const props = withDefaults(defineProps<BasicRouteMenuProps>(), {
  menus: () => [],
  mode: 'vertical',
  showCollapseButton: false,
  collapsed: false,
  width: '100%',
  expandedWidth: '100%',
  collapsedWidth: '64px',
  collapseButtonPosition: 'bottom-start',
})

const getBindValues = computed(() => ({
  menuTrigger: 'click' as const,
  ...attrs,
  mode: props.mode,
  collapse: isCollapsed.value,
  defaultActive: props.modelValue,
}))

const visibleRoutes = computed(() => {
  return props.menus
    .filter((route) => !route.meta?.hidden)
    .map((route) => ({
      ...route,
      children: route.children?.filter((child) => !child.meta?.hidden) || [],
    }))
})

const getCollapseButtonPosition = computed(() => {
  const words = props.collapseButtonPosition.split('-')
  const firstWord = words[0]
  const secondWord = words[1]

  return {
    top: firstWord === 'top',
    bottom: firstWord === 'bottom',
    start: secondWord === 'start',
    end: secondWord === 'end',
  }
})

const isCollapsed = ref(props.collapsed)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}

const findMenuItem = (
  routes: RouteMenuItemSchema[],
  targetPath: string,
): RouteMenuItemSchema | undefined => {
  for (const route of routes) {
    if (route.path === targetPath) return route
    if (route.children) {
      const found = findMenuItem(route.children, targetPath)
      if (found) return found
    }
  }
}

const handleMenuSelect = (path: string) => {
  const activeMenu = findMenuItem(props.menus, path)
  emit('update:modelValue', path)
  emit('update:activeMenu', activeMenu)
}
</script>

<style lang="scss" scoped>
@use './style.scss';
</style>
