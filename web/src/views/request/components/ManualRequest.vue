<template>
  <el-card header="手动请求">
    <el-button class="mb-2" @click="manualExecute">手动获取数据</el-button>
    <p class="mb-2">接口响应数据:</p>
    <p>{{ data }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { queryEnums } from '@/apis/settlement-review'

const { data, execute } = useRequest(queryEnums)

const manualExecute = async () => {
  execute({
    enumType: 'department',
  })
}
</script>
