<template>
  <div class="flex h-full flex-col overflow-hidden bg-white p-10px">
    <div class="my-1">用户管理</div>
    <div class="flex min-h-0 flex-1">
      <VxeGrid class="h-full w-full" v-bind="tableOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SystemUser',
})

const tableOptions = reactive({
  height: '400px',
  autoResize: true,
  rowConfig: {
    keyField: 'id',
  },
  columns: [
    {
      title: '日期',
      field: 'date',
    },
    {
      title: '姓名',
      field: 'name',
    },
    {
      title: '地址',
      field: 'address',
    },
  ],
  data: Array.from({ length: 50 })
    .fill({
      date: null,
      name: undefined,
      address: 'No. 189, Grove St, Los Angeles',
    })
    .concat({
      key: Math.random(),
      date: 'data 最后一个',
      name: 'name 最后一个',
      address: 'address 最后一个',
    }),
})
</script>

<style scoped>
@import '../../styles/vxe-table-modified.scss';
</style>
