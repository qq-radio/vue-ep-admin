<template>
  <div>
    <AutoRequest />
    <ManualRequest />
    <DebounceRequest />
    <ThrottleRequest />
    <PollingRequest />
    <RetryRequest />
    <RefreshRequest />
    <DelayRequest />
  </div>
</template>

<script setup lang="ts">
import AutoRequest from './components/AutoRequest.vue'
import ManualRequest from './components/ManualRequest.vue'
import DebounceRequest from './components/DebounceRequest.vue'
import ThrottleRequest from './components/ThrottleRequest.vue'
import PollingRequest from './components/PollingRequest.vue'
import RetryRequest from './components/RetryRequest.vue'
import RefreshRequest from './components/RefreshRequest.vue'
import DelayRequest from './components/DelayRequest.vue'
</script>

<style lang="scss">
.el-card {
  margin: 10px 0;
}
</style>
