<template>
  <BasicImageUpload v-model="value" :max-size="1" />
  <div style="margin-top: 10px">双向绑定值：{{ value }}</div>
</template>

<script setup lang="ts">
import { BasicImageUpload } from '@center/components'

const value = ref()
</script>
