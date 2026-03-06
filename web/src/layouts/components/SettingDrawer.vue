<template>
  <BasicDrawer v-model="drawvisible" title="偏好设置" size="400px">
    <div v-for="(groupItem, index) in settingGroup" :key="index" class="mb-4">
      <div class="font-bold border-solid border-b-1 border-0 border-gray-300 mb-1">
        {{ groupItem.title }}
      </div>
      <template v-for="item in groupItem.settings" :key="item.prop">
        <div v-if="!item.hidden" class="flex items-center justify-between py-2">
          <span v-if="item.label" class="text-sm">
            {{ item.label }}
            <el-tooltip v-if="item.tip" :content="item.tip" placement="top">
              <el-icon><InfoFilled /></el-icon>
            </el-tooltip>
          </span>
          <component
            :is="componentsmap[item.component || 'switch']"
            v-bind="item.componentProps"
            v-model="settingModel[item.prop]"
            @update:model-value="(v) => emit('update', item.prop, v)"
          />
        </div>
      </template>
    </div>
    <template #footer>
      <el-button @click="emit('reset')">重置</el-button>
    </template>
  </BasicDrawer>
</template>

<script setup lang="ts">
import type { AppTabStyle } from '#/types/preference'

import { BasicDrawer } from '@center/components'
import { InfoFilled } from '@element-plus/icons-vue'
import { ElSwitch, ElInputNumber, ElSegmented } from 'element-plus'
import NavTypeSelect from './nav-type-select/NavTypeSelect.vue'

const emit = defineEmits(['update', 'reset'])

const props = defineProps({
  setting: {
    type: Object,
    default: () => ({}),
  },
})

const drawvisible = defineModel({ default: false })

const settingModel = ref<Recordable>({})

watch(
  () => props.setting,
  () => {
    settingModel.value = props.setting
  },
  { immediate: true },
)

type ComponentType = 'switch' | 'segmented' | 'input-number' | 'nav-type-select'

interface SettingItem {
  title: string
  settings: {
    prop: string
    label?: string
    hidden?: boolean | ComputedRef<boolean>
    tip?: string
    component?: ComponentType
    componentProps?: Recordable
  }[]
}

type TabStyleOption = {
  label: string
  value: AppTabStyle
}

const tabStyleOptions: TabStyleOption[] = [
  { label: '简约', value: 'normal' },
  { label: '卡片', value: 'card' },
]

const settingGroup = ref<SettingItem[]>([
  {
    title: '导航栏',
    settings: [{ prop: 'navType', component: 'nav-type-select' }],
  },
  {
    title: '标签栏',
    settings: [
      { label: '显示标签栏', prop: 'showTabBar' },
      {
        label: '持久化标签页',
        prop: 'enablePersistentTab',
        tip: '当启用持久化标签页时，已打开的标签页会被保存在本地存储中，刷新页面不会丢失',
      },
      {
        label: '标签页风格',
        prop: 'tabStyle',
        component: 'segmented',
        componentProps: {
          options: tabStyleOptions,
          style: {
            width: '50%',
          },
        },
      },
      {
        label: '最大标签数',
        prop: 'maxTabCount',
        component: 'input-number',
        tip: '限制打开的标签页数量，当超过最大数量时，会自动关闭最早的标签页（设置为0则不限制）',
      },
      { label: '启动拖拽排序', prop: 'enableTabDrag' },
      { label: '显示标签栏图标', prop: 'showTabIcon' },
      { label: '显示下拉菜单图标', prop: 'showTabMoreButton' },
      { label: '显示刷新图标', prop: 'showTabRefreshButton' },
      { label: '显示最大化图标', prop: 'showTabMaximizeButton' },
    ],
  },
  {
    title: '其他',
    settings: [
      {
        label: '折叠侧边栏',
        prop: 'collapsed',
        hidden: computed(() => settingModel.value.navType === 'horizontal'),
      },
      {
        label: '显示面包屑',
        prop: 'showBreadcrumb',
        hidden: computed(() => settingModel.value.navType !== 'vertical'),
      },
      {
        label: '显示面包屑图标',
        prop: 'showBreadcrumbIcon',
        hidden: computed(() => settingModel.value.navType !== 'vertical'),
      },
      { label: '显示页脚', prop: 'showFooter' },
      { label: '显示水印', prop: 'showWatermark' },
    ],
  },
])

const componentsmap = {
  switch: ElSwitch,
  segmented: ElSegmented,
  'input-number': ElInputNumber,
  'nav-type-select': NavTypeSelect,
}
</script>
