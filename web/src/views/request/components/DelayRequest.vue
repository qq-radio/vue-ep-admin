<template>
  <el-card header="延时响应">
    <p class="mb-2">接口响应数据:</p>
    <p v-if="isFinished">{{ data }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { queryEnums } from '@/apis/settlement-review'

const { data, isFinished } = useRequest(queryEnums, {
  immediate: true,
  initialParams: {
    enumType: 'department',
  },
  loadingDelay: 3000,
})
</script>
