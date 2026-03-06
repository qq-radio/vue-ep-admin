<template>
  <BasicDropdown :menus="menus" @command="onCommand">
    历史记录
    <template #log>
      <el-icon>
        <Document /> </el-icon
      >查看日志
    </template>
  </BasicDropdown>
</template>

<script setup lang="ts">
import { BasicDropdown, DropdownItemSchema } from '@center/components'

import { Document, Clock } from '@element-plus/icons-vue'

const menus: DropdownItemSchema[] = [
  {
    command: 'log',
    customSlot: 'log',
  },
  {
    name: '所有历史记录',
    command: 'history',
    icon: Clock,
  },
]

const onCommand = (v) => {
  console.log('onCommand', v)
}
</script>
