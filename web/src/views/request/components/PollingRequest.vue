<template>
  <el-card header="轮询请求">
    <el-button :type="pollingActive ? 'danger' : 'primary'" @click="togglePolling">
      {{ pollingActive ? '停止' : '开始' }}轮询
    </el-button>
    <p class="mb-2">接口响应数据:</p>
    <p>{{ data }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { queryEnums } from '@/apis/settlement-review'

const {
  data,
  execute: startPolling,
  abort: stopPolling,
} = useRequest(queryEnums, {
  polling: true,
  pollingInterval: 1000,
})

const pollingActive = ref(false)

const togglePolling = () => {
  if (pollingActive.value) {
    stopPolling()
    pollingActive.value = false
  } else {
    startPolling({
      enumType: 'department',
    })
    pollingActive.value = true
  }
}

onUnmounted(() => {
  stopPolling()
})
</script>
