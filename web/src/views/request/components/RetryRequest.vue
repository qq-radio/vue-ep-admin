<template>
  <el-card header="失败时自动重试">
    <p class="mb-2">接口响应数据:</p>
    <p>{{ data }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { queryEnums } from '@/apis/settlement-review'

const { data } = useRequest(queryEnums, {
  immediate: true,
  initialParams: {
    enumType: 'department',
  },
  retryCount: 3,
})
</script>
