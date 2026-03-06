<template>
  <BasicDropdown :menus="menus" @command="onCommand">
    <span style="color: #0072ff"
      >个人中心<el-icon><ArrowDown /></el-icon
    ></span>
  </BasicDropdown>
</template>

<script setup lang="ts">
import { BasicDropdown, DropdownItemSchema } from '@center/components'

import { ElIcon, ElBadge } from 'element-plus'
import { Bell, Setting, ArrowDown } from '@element-plus/icons-vue'

const menus: DropdownItemSchema[] = [
  {
    name: '消息通知',
    command: 'notification',
    customRender: () =>
      h('div', [
        h(ElIcon, { style: 'margin-right: 8px' }, h(Bell)),
        h('span', '消息通知'),
        h(ElBadge, { value: 5, style: 'margin-left: 8px' }),
      ]),
  },
  {
    name: '系统设置',
    command: 'setting',
    icon: Setting,
  },
]

const onCommand = (v) => {
  console.log('onCommand', v)
}
</script>
