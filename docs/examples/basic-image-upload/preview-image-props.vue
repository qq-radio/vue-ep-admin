<template>
  <BasicImageUpload
    :model-value="value"
    disabled
    :preview-image-props="{
      hideOnClickModal: false,
      fit: 'contain',
    }"
  />
</template>

<script setup lang="ts">
import { BasicImageUpload } from '@center/components'

const value = [
  {
    name: '示例图片1',
    url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    name: '示例图片2',
    url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  },
]
</script>
