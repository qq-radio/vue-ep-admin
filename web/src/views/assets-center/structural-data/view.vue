<template>
  <div class="page-container">
    <h1>{{ pageTitle }}</h1>
    <div class="content">
      <p>页面内容待完善</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageTitle = ref('页面标题')
</script>

<style scoped>
.page-container {
  padding: 20px;
}
.content {
  margin-top: 20px;
}
</style>