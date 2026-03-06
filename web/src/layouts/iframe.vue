<template>
  <div v-loading="loading" class="h-full w-full" element-loading-text="加载中...">
    <iframe ref="frameRef" :src="src" class="h-full w-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, unref, onMounted } from 'vue'

interface Props {
  src?: string
}

defineProps<Props>()

const frameRef = ref<HTMLElement>()

const loading = ref(true)

function init() {
  const iframe = unref(frameRef)
  if (!iframe) return
  iframe.addEventListener('load', () => {
    hideLoading()
  })
  setTimeout(() => {
    hideLoading()
  }, 3000)
}

function hideLoading() {
  loading.value = false
}

onMounted(() => {
  init()
})
</script>
