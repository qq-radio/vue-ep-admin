<template>
  <el-config-provider>
    <el-watermark v-bind="watermarkConfig" :content="watermarkContent">
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>

<script setup lang="ts">
const { getPreferenceSetting } = storeToRefs(usePreferenceStore())

const watermarkContent = computed(() =>
  getPreferenceSetting.value.showWatermark ? 'Admin System' : '',
)

const watermarkConfig = ref({
  offset: [0, 0] as [number, number],
  font: {
    color: 'rgba(0, 0, 0, .1)',
    fontSize: 14,
  },
})
</script>

<style lang="scss">
:root {
  // vxe-table 变量
  --vxe-ui-table-border-color: #f0f0f0 !important;
  --vxe-ui-font-primary-color: #1677ff !important;
  --vxe-ui-table-row-checkbox-checked-background-color: #e6f4ff !important;
}
</style>
