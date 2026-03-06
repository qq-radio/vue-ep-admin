<template>
  <el-dropdown v-bind="getBindValues" :class="ns.b()">
    <slot />
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="(menu, index) in menus" :key="index">
          <el-dropdown-item v-bind="menu">
            <component :is="renderDropdownItem(menu)" v-if="isCustomRender(menu)" />
            <span v-else>
              {{ menu.name }}
            </span>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import type { BasicDropdownProps, DropdownItemSchema } from './type'

import { useCustomRender, useBasicNamespace } from '@center/composables'

import { useSlots, useAttrs, computed } from 'vue'

const ns = useBasicNamespace('dropdown')

defineOptions({
  name: 'BasicDropdown',
})

const attrs = useAttrs()
const slots = useSlots()

withDefaults(defineProps<BasicDropdownProps>(), {
  menus: () => [],
})

const getBindValues = computed(() => ({
  ...attrs,
}))

const { renderItem } = useCustomRender({ slots })

const isCustomRender = (item: DropdownItemSchema) => item.customRender || item.customSlot

const renderDropdownItem = (item: DropdownItemSchema) =>
  renderItem({
    customRender: item.customRender,
    customSlot: item.customSlot,
  })
</script>
