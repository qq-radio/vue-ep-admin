<template>
  <BasicCheckboxGroup v-model="value" :options="options" vertical />
  <div style="margin-top: 10px">双向绑定值：{{ value }}</div>
</template>

<script setup lang="ts">
import { BasicCheckboxGroup } from '@center/components'

const value = ref()

const options = [
  {
    label: '乐园',
    value: 'park',
  },
  {
    label: '博物馆',
    value: 'museum',
  },
  {
    label: '音乐会',
    value: 'concert',
  },
]
</script>
