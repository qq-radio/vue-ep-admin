<template>
  <div :class="[ns.b()]">
    <div v-if="slots.prefix" :class="[ns.e('prefix')]"><slot name="prefix" /></div>
    <div
      v-if="showScrollArrow"
      :class="[ns.e('arrow'), 'left', { disabled: leftDisabled }]"
      @click="scrollByLeft"
    >
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div ref="scrollContainer" :class="[ns.e('container'), ns.m(type)]" @wheel="onWheelScroll">
      <TabbarItem
        v-for="(tab, index) in tabs"
        :key="tab.key"
        :tab="tab"
        :type="type"
        :data-tab-key="tab.key"
        :active="activeTab === tab.key"
        :closable="closable"
        :show-icon="showIcon"
        @click="clickTab(index, tab.key, tab, $event)"
        @close="closeTab(index, tab.key, tab)"
        @unpin="unpinTab(index, tab.key, tab)"
        @contextmenu.prevent="contextmenuTab(index, tab.key, tab, $event)"
      />
    </div>
    <div
      v-if="showScrollArrow"
      :class="[ns.e('arrow'), 'right', { disabled: rightDisabled }]"
      @click="scrollByRight"
    >
      <el-icon><ArrowRight /></el-icon>
    </div>
    <div v-if="slots.suffix" :class="[ns.e('suffix')]"><slot name="suffix" /></div>
  </div>
</template>

<script lang="ts" setup>
import { BasicTabbarProps, TabbarItemSchema } from './type'

import { useBasicNamespace } from '@center/composables'

import { ref, computed, onMounted, useSlots, watch } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import { isUndefined } from 'lodash'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import TabbarItem from './TabbarItem.vue'

defineOptions({
  name: 'BasicTabbar',
  inheritAttrs: false,
})

const ns = useBasicNamespace('tabbar')

const slots = useSlots()

const props = withDefaults(defineProps<BasicTabbarProps>(), {
  type: 'normal',
  tabs: () => [],
  showIcon: true,
  closable: true,
})

const emit = defineEmits([
  'update:modelValue',
  'tab-change',
  'tab-click',
  'tab-close',
  'tab-unpin',
  'tab-contextmenu',
  'tabs-sort',
])

const scrollContainer = ref<HTMLElement>()
const maxScroll = ref(0)
const showScrollArrow = computed(() => maxScroll.value > 0)
const leftDisabled = ref(true)
const rightDisabled = ref(true)

const activeTab = ref()

const tabbarTabs = ref<TabbarItemSchema[]>([])

const closable = computed(() => props.closable && props.tabs.length > 1)

watch(
  () => props.modelValue,
  (value) => {
    activeTab.value = value
    if (value) {
      scrollToTab(value)
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => props.tabs,
  (value) => {
    tabbarTabs.value = value
    updateScrollState()
    setTimeout(() => {
      scrollToTab(activeTab.value)
    })
  },
  {
    immediate: true,
    deep: true,
  },
)

/**
 * 导航栏滚动
 */
function scrollByLeft() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: -200, behavior: 'smooth' })
}

function scrollByRight() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: 200, behavior: 'smooth' })
}

function onWheelScroll(event: WheelEvent) {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: event.deltaY > 0 ? 100 : -100 })
  event.preventDefault()
}

function updateScrollState() {
  if (!scrollContainer.value) return

  const scrollLeft = scrollContainer.value.scrollLeft

  maxScroll.value = scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth

  leftDisabled.value = scrollLeft <= 0
  rightDisabled.value = scrollLeft >= maxScroll.value - 1
}

function scrollToTab(tabKey: string) {
  const tabElement = scrollContainer.value?.querySelector(`[data-tab-key="${tabKey}"]`)
  if (tabElement) {
    tabElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', updateScrollState)

    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(scrollContainer.value)
  }
  scrollToTab(activeTab.value)
})

/**
 * 导航栏标签
 */
function clickTab(tabIndex: number, tabKey: string, tab: TabbarItemSchema, $event: MouseEvent) {
  activeTab.value = tab.key
  emit('update:modelValue', activeTab.value)
  emit('tab-change', activeTab.value)
  emit('tab-click', {
    tabIndex,
    tabKey,
    tab,
    $event,
  })
  scrollToTab(activeTab.value)
}

function closeTab(tabIndex: number, tabKey: string, tab: TabbarItemSchema) {
  emit('tab-close', {
    tabIndex,
    tabKey,
    tab,
  })
}

function unpinTab(tabIndex: number, tabKey: string, tab: TabbarItemSchema) {
  emit('tab-unpin', {
    tabIndex,
    tabKey,
    tab,
  })
}

function contextmenuTab(
  tabIndex: number,
  tabKey: string,
  tab: TabbarItemSchema,
  $event: MouseEvent,
) {
  emit('tab-contextmenu', {
    tabIndex,
    tabKey,
    tab,
    $event,
  })
}

/**
 * 导航栏拖拽
 */
const draggable = useDraggable(scrollContainer, tabbarTabs, {
  animation: 150,
  ghostClass: 'ghost',
  onUpdate(event) {
    const { newIndex } = event
    if (!isUndefined(newIndex)) {
      const newTab = {
        ...tabbarTabs.value[newIndex],
      }
      if (newTab.fixed) {
        newTab.fixed = tabbarTabs.value[newIndex - 1]?.fixed
      } else {
        newTab.fixed = tabbarTabs.value[newIndex + 1]?.fixed
      }
      const newTabs = [...tabbarTabs.value]
      newTabs.splice(newIndex, 1, newTab)
      emit('tabs-sort', newTabs)
    }
  },
})

watch(
  () => props.draggable,
  (v) => {
    v ? draggable.start() : draggable.pause()
  },
)
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
