<template>
  <div class="flex items-center justify-center text-center overflow-hidden h-full">
    <img src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp" class="h-6 w-6" />
    <span v-show="!collapsed" class="truncate font-semibold ml-4">后台演示系统</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
})
</script>
