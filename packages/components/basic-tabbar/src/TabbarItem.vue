<template>
  <div
    :class="{
      [ns.b()]: true,
      [ns.m('active')]: active,
    }"
  >
    <el-icon v-if="showIcon && tab.icon" :class="ns.e('icon')">
      <component :is="tab.icon" />
    </el-icon>
    <span :class="ns.e('text')">{{ tab.title }}</span>
    <template v-if="tab.fixed">
      <img src="./pin.svg" :class="ns.e('fixed')" @click.stop="emit('unpin')" />
    </template>
    <template v-else>
      <el-icon v-if="closable" :class="ns.e('close')" @click.stop="emit('close')">
        <Close />
      </el-icon>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { BasicTabbarProps, TabbarItemSchema } from './type'

import { computed } from 'vue'
import { isUndefined } from 'lodash'
import { Close } from '@element-plus/icons-vue'
import { useBasicNamespace } from '@center/composables'

defineOptions({
  name: 'TabbarItem',
})

interface Props extends Pick<BasicTabbarProps, 'type' | 'tabStyle' | 'showIcon'> {
  tab: TabbarItemSchema
  active: boolean
  closable: boolean
  showIcon: boolean
}

const emit = defineEmits(['close', 'unpin'])

const props = withDefaults(defineProps<Props>(), {
  type: 'card',
})

const ns = useBasicNamespace('tabbar-item-' + props.type)

const closable = computed(() => {
  if (!isUndefined(props.tab.closable)) {
    return props.tab.closable
  }
  return props.closable
})
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
