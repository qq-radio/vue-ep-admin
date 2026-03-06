<template>
  <el-card header="防抖请求">
    <el-input
      v-model="keyword"
      class="mb-2"
      placeholder="请输入"
      @input="execute({ enumType: 'department', keyword })"
    />
    <p class="mb-2">接口响应数据:</p>
    <p>{{ data }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { queryEnums } from '@/apis/settlement-review'

const keyword = ref('')

const { data, execute } = useRequest(queryEnums, {
  debounce: true,
  debounceInterval: 500,
})
</script>
