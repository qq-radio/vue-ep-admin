<template>
  <div>
    数据分析 {{ r }}
    <button @click="r = r + 1">点我加 >>>>>>></button>
  </div>
</template>

<script setup lang="ts">
const r = ref(1)

defineOptions({
  name: 'ProductAnalytic',
})
</script>
