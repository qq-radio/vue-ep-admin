<template>
  <span @click="emitRefresh">
    <el-tooltip content="刷新" effect="dark" placement="top">
      <el-icon>
        <RefreshRight />
      </el-icon>
    </el-tooltip>
  </span>
</template>

<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue'

const emit = defineEmits(['refresh'])

const emitRefresh = () => {
  emit('refresh')
}
</script>
