<template>
  <div class="flex justify-end items-center h-full">
    <el-icon class="cursor-pointer hover:text-blue mr-2" @click="emit('open-drawer')">
      <Setting />
    </el-icon>
    <el-popover placement="bottom-end" trigger="click">
      <template #reference>
        <el-avatar
          class="cursor-pointer"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          :size="24"
        />
      </template>
      <div class="flex justify-between bottom pb-3">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="flex-1 ml-4">
          <div class="mb-1">小明</div>
          <el-tag type="primary">最高管理员</el-tag>
        </div>
      </div>
      <div class="p-2 flex items-center cursor-pointer">
        <img src="@/assets/user.svg" class="h-4 w-4 mr-3" />个人信息
      </div>
      <div class="p-2 flex items-center cursor-pointer">
        <img src="@/assets/log-out.svg" class="h-4 w-4 mr-3" />退出登录
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'

const emit = defineEmits(['open-drawer'])
</script>

<style scoped lang="scss">
.bottom {
  border-bottom: 1px solid #d1d5db;
}

.el-icon {
  vertical-align: middle;
}
</style>
