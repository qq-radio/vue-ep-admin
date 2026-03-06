<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="documentIssueId" label="单据疑点ID" width="180" />
      <el-table-column prop="medicalInsuranceItemName" label="医保项目名称" width="180" />
      <el-table-column prop="violationContent" label="违规内容" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'

const tableData = ref()

request
  .get('/daily-check/appeal/list', {
    pageNum: 1,
    pageSize: 10,
  })
  .then((res = {}) => {
    tableData.value = res.list
  })
  .finally(() => {})
</script>
