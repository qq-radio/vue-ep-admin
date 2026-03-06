<template>
  <div class="mt-40 flex items-center flex-col">
    <div class="mb-4">
      <el-icon color="#fb9c87" size="60"><WarningFilled /></el-icon>
    </div>
    <p class="text-4xl mb-4">500</p>
    <p class="mb-4 text-gray-500">抱歉，服务器出错了</p>
    <el-button type="primary" @click="router.push('/')">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue'

defineOptions({
  name: '500',
})

const router = useRouter()
</script>
