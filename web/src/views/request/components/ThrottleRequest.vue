<template>
  <el-card header="节流请求">
    <el-button
      class="mb-2"
      @click="
        execute({
          enumType: 'department',
        })
      "
      >3秒内重复点击，只请求一次</el-button
    >
    <p class="mb-2">接口响应数据:</p>
    <p>{{ data }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { queryEnums } from '@/apis/settlement-review'

const { data, execute } = useRequest(queryEnums, {
  throttle: true,
  throttleInterval: 3000,
})
</script>
