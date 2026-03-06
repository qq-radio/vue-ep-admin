<template>
  <div class="mt-40 flex items-center flex-col">
    <div class="mb-4 bg-[#c4a1fc] h-14 w-14 flex items-center justify-center rounded-full">
      <el-icon color="#fff" size="30"><Lock /></el-icon>
    </div>
    <p class="text-4xl mb-4">403</p>
    <p class="mb-4 text-gray-500">抱歉，你无权访问该页面</p>
    <div>
      <el-button class="mr-4" type="primary" @click="router.push('/')">返回首页</el-button>
      <el-button @click="closeCurrentTab">关闭</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock } from '@element-plus/icons-vue'

defineOptions({
  name: '403',
})

const router = useRouter()

const { closeCurrentTab } = useTabbarStore()
</script>

<style lang="scss" scoped>
.el-icon {
  vertical-align: middle;
}
</style>
