<template>
  <div class="flex flex-wrap gap-5">
    <div
      v-for="item in navTypeOptions"
      :key="item.value"
      class="flex w-[100px] cursor-pointer flex-col"
      @click.stop="menuType = item.value"
    >
      <div
        class="type-item"
        :class="{
          active: item.value === menuType,
        }"
      >
        <component :is="components[item.value]" />
      </div>
      <div class="mt-2 text-center text-xs">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppNavType } from '#/types/preference'

import SvgVertical from './SvgVertical.vue'
import SvgHorizontal from './SvgHorizontal.vue'
import SvgMixed from './SvgMixed.vue'

interface NavTypeOption {
  name: string
  value: AppNavType
}

const navTypeOptions: NavTypeOption[] = [
  { name: '侧边垂直菜单', value: 'vertical' },
  { name: '顶部水平菜单', value: 'horizontal' },
  { name: '水平垂直混合菜单', value: 'mixed' },
]

const components: Record<AppNavType, Component> = {
  vertical: SvgVertical,
  horizontal: SvgHorizontal,
  mixed: SvgMixed,
}

const menuType = defineModel<AppNavType>({ default: 'vertical' })
</script>

<style scoped lang="scss">
.type-item {
  &.active,
  &:hover {
    outline: 2px solid #006be6;
    outline-offset: 6px;
  }
}
</style>
