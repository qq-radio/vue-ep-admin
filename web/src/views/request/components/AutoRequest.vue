<template>
  <el-card header="自动请求">
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
})
</script>
