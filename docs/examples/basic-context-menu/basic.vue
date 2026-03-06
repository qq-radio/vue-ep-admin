<template>
  <BasicContextMenu :menus="menus">
    <el-button>right click me</el-button>
  </BasicContextMenu>
</template>

<script setup lang="ts">
import { BasicContextMenu, ContextMenuItem } from '@center/components'
import { Plus, EditPen, Delete } from '@element-plus/icons-vue'

const menus: ContextMenuItem[] = [
  {
    name: '新增',
    key: 'add',
    icon: Plus,
    onClick: () => {
      console.log('点击了新增')
    },
    divided: true,
  },
  {
    name: '编辑',
    key: 'edit',
    icon: EditPen,
    onClick: () => {
      console.log('点击了编辑')
    },
    divided: true,
  },
  {
    name: '删除',
    key: 'delete',
    icon: Delete,
    onClick: () => {
      console.log('点击了删除')
    },
    disabled: true,
  },
]
</script>
