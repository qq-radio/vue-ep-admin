<template>
  <BasicDropdown :menus="menus" split-button @command="onCommand">操作数据</BasicDropdown>
</template>

<script setup lang="ts">
import { BasicDropdown, DropdownItemSchema } from '@center/components'

import { Download, Upload, Refresh } from '@element-plus/icons-vue'

const menus: DropdownItemSchema[] = [
  {
    name: '导入数据',
    command: 'import',
    icon: Upload,
  },
  {
    name: '导出数据',
    command: 'export',
    icon: Download,
  },
  {
    name: '同步数据',
    command: 'sync',
    icon: Refresh,
    divided: true,
  },
]

const onCommand = (v) => {
  console.log('onCommand', v)
}
</script>
