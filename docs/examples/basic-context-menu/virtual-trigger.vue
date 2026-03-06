<template>
  <BasicContextMenu v-model:visible="visible" :menus="menus" :position="position" />
  <el-button @click="openMenu">right click me (virtual-trigger)</el-button>
</template>

<script setup lang="ts">
import { BasicContextMenu, ContextMenuItem } from '@center/components'
import { Close, RefreshRight, FullScreen } from '@element-plus/icons-vue'

const position = ref()

const visible = ref(false)

const toggleVisible = () => {
  visible.value = !visible.value
}

const openMenu = (event) => {
  const { clientX, clientY } = event
  position.value = {
    left: clientX,
    top: clientY,
  }
  toggleVisible()
}

const menus: ContextMenuItem[] = [
  {
    name: '关闭',
    key: 'close',
    icon: Close,
    onClick: () => {
      console.log('点击了关闭')
    },
  },
  {
    name: '刷新',
    key: 'refresh',
    icon: RefreshRight,
    onClick: () => {
      console.log('点击了刷新')
    },
  },
  {
    name: '全屏',
    key: 'fullscreen',
    icon: FullScreen,
    onClick: () => {
      console.log('点击了全屏')
    },
  },
]
</script>
