<template>
  <li
    :class="{
      [ns.b()]: true,
      [ns.m('disabled')]: item.disabled,
      [ns.m('divided')]: item.divided,
    }"
  >
    <span v-if="item.icon" :class="ns.e('icon')">
      <component :is="item.icon" />
    </span>
    <span :class="ns.e('name')">{{ item.name }}</span>
  </li>
</template>

<script lang="ts" setup>
import type { ContextMenuItem } from './type'
import type { PropType } from 'vue'

import { useBasicNamespace } from '@center/composables'

const ns = useBasicNamespace('context-menu-item')

defineProps({
  item: {
    type: Object as PropType<ContextMenuItem>,
    default: () => ({}),
  },
})
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
