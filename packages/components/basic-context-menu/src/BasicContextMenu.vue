<template>
  <template v-if="isVirtualTrigger">
    <div v-show="menuVisible">
      <div ref="menuRef" :class="ns.b()" :style="menuPosition">
        <ul :class="ns.e('list')">
          <MenuItem
            v-for="(item, index) in visibleMenus"
            :key="item.key || index"
            :item="item"
            @click="clickMenuItem(item)"
          />
        </ul>
      </div>
    </div>
  </template>
  <template v-else>
    <span @contextmenu.prevent="onContextmenu">
      <slot />
    </span>
    <div v-show="menuVisible">
      <div ref="menuRef" :class="ns.b()" :style="menuPosition">
        <ul :class="ns.e('list')">
          <MenuItem
            v-for="(item, index) in visibleMenus"
            :key="item.key || index"
            :item="item"
            @click="clickMenuItem(item)"
          />
        </ul>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import type { BasicContextMenuProps, ContextMenuPosition, ContextMenuItem } from './type'

import { useBasicNamespace } from '@center/composables'
import { ref, computed, watch, useSlots } from 'vue'
import { onClickOutside } from '@vueuse/core'

import MenuItem from './MenuItem.vue'
import { isFunction, isNumber } from 'lodash'

const ns = useBasicNamespace('context-menu')

defineOptions({
  name: 'BasicForm',
  inheritAttrs: false,
})

const slots = useSlots()
const isVirtualTrigger = !slots.default

const props = withDefaults(defineProps<BasicContextMenuProps>(), {
  trigger: 'contextmenu',
})

const emit = defineEmits(['update:visible', 'click'])

const menuRef = ref<HTMLElement | null>(null)

const menuPosition = ref<ContextMenuPosition>()

const innerVisible = ref(false)

const menuVisible = computed(() => (isVirtualTrigger ? props.visible : innerVisible.value))

const visibleMenus = computed(() => props.menus.filter((item) => item.hidden !== false))

watch(
  () => props.position,
  (value) => {
    if (value) {
      menuPosition.value = normalizePosition(value)
    }
  },
)

const normalizePosition = (position: ContextMenuPosition) => {
  const { left, right, top, bottom } = position
  const toPx = (n) => (isNumber(n) ? n + 'px' : n)

  return {
    left: toPx(left),
    right: toPx(right),
    top: toPx(top),
    bottom: toPx(bottom),
  }
}

const closeMenu = () => {
  innerVisible.value = false
  emit('update:visible', innerVisible.value)
}

const openMenu = () => {
  innerVisible.value = true
  emit('update:visible', innerVisible.value)
}

const onContextmenu = (event: MouseEvent) => {
  const { clientX, clientY } = event
  menuPosition.value = {
    left: clientX + 'px',
    top: clientY + 'px',
  }
  openMenu()
}

const clickMenuItem = (item: ContextMenuItem) => {
  const { disabled, onClick } = item
  if (disabled) {
    return
  }
  if (isFunction(onClick)) {
    onClick(item)
  }
  emit('click', item)
  closeMenu()
}

onClickOutside(menuRef, closeMenu)
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
