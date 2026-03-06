<template>
  <div class="h-full">
    <template v-for="[key, item] in Object.entries(componentList)" :key="key">
      <component
        :is="item.component"
        v-show="key === currentRoute.path"
        class="h-full"
        :src="item.src"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef, watch, computed } from 'vue'

const { getTabs } = storeToRefs(useTabbarStore())

const props = defineProps<{
  currentRoute: any
  currentComponent: Component
}>()

const componentList = shallowRef<
  Record<
    string,
    {
      component: Component
      src: string
    }
  >
>({})

const iframeTabs = computed(() => getTabs.value.filter((tab) => !!tab.iframeSrc))
const iframePaths = computed(() => iframeTabs.value.map((tab) => tab.fullPath))

watch(
  () => [props.currentRoute, props.currentComponent],
  ([route, component]) => {
    if (iframePaths.value.includes(route.path) && route.meta?.keepAlive) {
      componentList.value[route.path] = {
        component,
        src: route.meta.iframeSrc,
      }
    }
  },
  {
    immediate: true,
  },
)
</script>
