<template>
  <el-card header="刷新请求">
    <el-radio-group v-model="enumType" @change="onEnumTypeChange">
      <el-radio-button label="department" value="department" />
      <el-radio-button label="violationType" value="violationType" />
    </el-radio-group>
    <br />
    <el-button class="my-2" @click="refresh">刷新请求(以上一次的请求参数，发起新的请求)</el-button>
    <p class="mb-2">接口响应数据:</p>
    <p>{{ data }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { queryEnums } from '@/apis/settlement-review'

const { data, execute, refresh } = useRequest(queryEnums, {
  resetOnExecute: true,
})

const enumType = ref()

const onEnumTypeChange = () => {
  execute({ enumType: enumType.value })
}
</script>
