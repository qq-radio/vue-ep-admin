<template>
  <div class="h-screen w-screen bg-white pt-40 flex items-center flex-col">
    <div class="pb-4">
      <el-icon color="#1890ff" size="60"><QuestionFilled /></el-icon>
    </div>
    <p class="text-4xl pb-4">404</p>
    <p class="pb-4 text-gray-500">抱歉，你访问的页面不存在</p>
    <el-button type="primary" @click="router.push('/')">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'

defineOptions({
  name: '404',
})

const router = useRouter()
</script>
