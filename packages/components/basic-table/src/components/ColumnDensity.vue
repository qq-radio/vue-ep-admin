<template>
  <el-popover v-model:visible="visible" placement="bottom-end" trigger="click">
    <div>
      <span class="setting-title">密度</span>
      <div class="button-group">
        <el-button
          v-for="item in densityArray"
          :key="item.size"
          type="primary"
          size="small"
          :plain="size !== item.size"
          @click="clickDensity(item.size)"
        >
          {{ item.text }}
        </el-button>
      </div>
    </div>
    <template #reference>
      <span>
        <el-tooltip content="密度" effect="dark" placement="top">
          <el-icon>
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              data-icon="column-height"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 00-11.3 0L403.6 366.3a7.23 7.23 0 005.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z"
              />
            </svg>
          </el-icon>
        </el-tooltip>
      </span>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import type { TableSize } from '../types'
import { ref } from 'vue'

interface Props {
  size: TableSize
}

withDefaults(defineProps<Props>(), {
  size: () => 'default',
})

const emit = defineEmits(['density-change'])

interface DensityItem {
  size: TableSize
  text: string
}

const densityArray: DensityItem[] = [
  {
    size: 'default',
    text: '默认',
  },
  {
    size: 'large',
    text: '放大',
  },
  {
    size: 'small',
    text: '紧凑',
  },
]

const visible = ref(false)

const clickDensity = (size: TableSize) => {
  visible.value = false
  emit('density-change', size)
}
</script>

<style lang="scss" scoped>
.setting-title {
  color: var(--el-text-color-secondary);
  font-weight: 500;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .el-button {
    margin: 10px;
    padding: 0;
  }
}
</style>
