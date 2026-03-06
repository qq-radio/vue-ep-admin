<template>
  <div :class="ns.b()">
    <slot>{{ text }}</slot>
    <el-tooltip
      :visible="tooltipVisible"
      :content="tooltipContent"
      :popper-class="ns.b('tooltip')"
      :show-arrow="false"
      :raw-content="true"
      placement="right"
      :offset="5"
    >
      <el-icon :class="ns.e('icon')" @click="copyToClipboard">
        <DocumentCopy />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import type { BasicCopyProps } from './type'

import { useBasicNamespace } from '@center/composables'

import { ref, useSlots } from 'vue'
import { DocumentCopy } from '@element-plus/icons-vue'

const ns = useBasicNamespace('copy')

defineOptions({
  name: 'BasicCopy',
  inheritAttrs: false,
})

const slots = useSlots()

const props = withDefaults(defineProps<BasicCopyProps>(), {})

const getText = () => props.copyText || props.text || (slots && slots.default?.({})[0].children)

const tooltipVisible = ref(false)
const tooltipContent = ref('')

const copyToClipboard = async () => {
  try {
    const words = getText() as string
    await navigator.clipboard.writeText(words)
    tooltipContent.value = '<span style="color: #4caf50">复制成功</h1>'
  } catch (error) {
    tooltipContent.value = '<span style="color: #ff0000">复制失败</h1>'
    console.error('BasicCopy 复制失败:', error)
  } finally {
    tooltipVisible.value = true
    setTimeout(() => {
      tooltipVisible.value = false
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
@use './style.scss';
</style>

<style>
.basic-copy-tooltip {
  background: #f5f7fa !important;
  border: none !important;
  font-size: 14px;
  padding: 0 !important;
}
</style>
