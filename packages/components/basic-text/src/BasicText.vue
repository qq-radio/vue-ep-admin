<template>
  <component
    v-bind="$attrs"
    :is="tag"
    ref="text"
    :class="{
      [ns.b()]: true,
      [ns.m('truncated')]: truncated,
      [ns.m('line-clamp')]: !!lineClamp,
    }"
    :style="{ '-webkit-line-clamp': lineClamp, width: widthPx }"
  >
    <slot>{{ text }}</slot>
  </component>
  <el-popover
    v-if="hasPopover"
    ref="popoverRef"
    :virtual-ref="textRef"
    :width="popoverWidthPx"
    virtual-triggering
  >
    <span><slot /></span>
  </el-popover>
</template>

<script lang="ts" setup>
import type { BasicTextProps } from './type'
import { computed, onMounted, onUpdated, ref, useTemplateRef } from 'vue'
import { useBasicNamespace } from '@center/composables'

import { isUndefined, isNumber } from 'lodash'

defineOptions({
  name: 'BasicText',
})

const ns = useBasicNamespace('text')

const props = withDefaults(defineProps<BasicTextProps>(), {
  tag: 'div',
  text: '',
  width: '',
  popoverWidth: '',
})

const widthPx = computed(() => (isNumber(props.width) ? props.width + 'px' : props.width))

const popoverWidthPx = computed(() =>
  isNumber(props.popoverWidth) ? props.popoverWidth + 'px' : props.popoverWidth,
)

const textRef = useTemplateRef('text')

const hasPopover = ref(false)

const checkHasPopover = () => {
  if (props.truncated) {
    const width = textRef.value?.offsetWidth
    const scrollWidth = textRef.value?.scrollWidth
    if (width && scrollWidth && scrollWidth > width) {
      hasPopover.value = true
    }
  } else if (!isUndefined(props.lineClamp)) {
    const height = textRef.value?.offsetHeight
    const scrollHeight = textRef.value?.scrollHeight
    if (height && scrollHeight && scrollHeight > height) {
      hasPopover.value = true
    }
  }
}

onMounted(checkHasPopover)
onUpdated(checkHasPopover)
</script>

<style lang="scss">
@use './style.scss';
</style>
