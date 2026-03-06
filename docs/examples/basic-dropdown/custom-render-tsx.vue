<template>
  <BasicDropdown :menus="menus" split-button @command="onCommand">账号状态</BasicDropdown>
</template>

<script setup lang="tsx">
import { BasicDropdown, DropdownItemSchema } from '@center/components'

import { Warning } from '@element-plus/icons-vue'

const menus: DropdownItemSchema[] = [
  {
    command: 'disabled',
    customRender: () => {
      return (
        <div>
          <el-icon style="color: #f16268; vertical-align: middle">
            <Warning />
          </el-icon>
          禁用账号
        </div>
      )
    },
  },
  {
    name: '查看详情',
    command: 'detail',
  },
]

const onCommand = (v) => {
  console.log('onCommand', v)
}
</script>
