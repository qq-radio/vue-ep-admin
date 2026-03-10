<template>
  <el-popover v-model:visible="visible" placement="bottom-end" trigger="click">
    <div>
      <span class="setting-title">列展示设置</span>
      <div>
        <div v-if="isEmptyColumn" class="empty-tip">暂无可用列配置</div>
        <template v-else>
          <div class="checkbox-header">
            <el-checkbox
              :model-value="isCheckAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >全选
            </el-checkbox>
            <el-button v-bind="buttonProps" @click="handleReset">重置</el-button>
          </div>
          <div class="setting-container">
            <el-checkbox-group
              v-model="selectedValues"
              v-draggable="[
                columnOptions,
                {
                  animation: 150,
                  ghostClass: 'ghost',
                },
              ]"
            >
              <el-checkbox v-for="item in columnOptions" v-bind="item" />
            </el-checkbox-group>
          </div>
        </template>
      </div>
      <div class="action-buttons">
        <el-button v-bind="buttonProps" @click="handleCancel">取消</el-button>
        <el-button v-bind="buttonProps" type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </div>
    <template #reference>
      <span>
        <el-tooltip effect="dark" content="列展示设置" placement="top">
          <el-icon class="setting-icon">
            <Setting />
          </el-icon>
        </el-tooltip>
      </span>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import type { TableSchema, TableColumnSettingItem } from '../types'

import { ref, computed, watch, watchEffect } from 'vue'
import { cloneDeep } from 'lodash-es'
import { vDraggable } from 'vue-draggable-plus'
import { Setting } from '@element-plus/icons-vue'

const buttonProps = {
  text: true,
  type: 'primary' as const,
  style: {
    margin: '0',
    padding: '0 10px',
  },
}

interface Props {
  schemas: TableSchema[]
}

const props = withDefaults(defineProps<Props>(), {
  schemas: () => [],
})

const emit = defineEmits(['change'])

const visible = ref(false)
const preColumnOptions = ref<TableColumnSettingItem[]>([])
const columnOptions = ref<TableColumnSettingItem[]>([])
const isEmptyColumn = computed(() => !columnOptions.value.length)

const selectedValues = ref<any[]>([])
const preSelectedValues = ref<any[]>([])

const isCheckAll = computed(() => {
  return selectedValues.value.length === columnOptions.value.length && !isEmptyColumn.value
})

const isIndeterminate = computed(() => {
  return selectedValues.value.length > 0 && selectedValues.value.length < columnOptions.value.length
})

watch(
  () => visible.value,
  (v) => {
    if (v) {
      preColumnOptions.value = cloneDeep(columnOptions.value)
      preSelectedValues.value = cloneDeep(selectedValues.value)
    }
  },
)

function initColumnOptions() {
  columnOptions.value = props.schemas.map((schema) => ({
    label: schema.label || '',
    value: schema.prop || '',
    headerIsChecked: schema.headerIsChecked ?? true,
  }))
}

function initSelectedKeys() {
  selectedValues.value = props.schemas
    .filter((schema) => schema.headerIsChecked !== false)
    .map((schema) => schema.prop)
}

watchEffect(() => {
  initColumnOptions()
  initSelectedKeys()
})

emit('change', cloneDeep(columnOptions.value))

function handleCheckAllChange(checked: boolean) {
  selectedValues.value = checked ? columnOptions.value.map((option) => option.value) : []
}

// function handleDragChange(event) {
//   const { newIndex, oldIndex } = event
//   const newTabs = cloneDeep(preColumnOptions.value)
//   newTabs.splice(oldIndex, 1)
//   newTabs.splice(newIndex, 0, preColumnOptions.value[oldIndex])
//   columnOptions.value = newTabs
// }

function handleReset() {
  initColumnOptions()
  initSelectedKeys()
}

function handleCancel() {
  visible.value = false
  columnOptions.value = cloneDeep(preColumnOptions.value)
  selectedValues.value = cloneDeep(preSelectedValues.value)
}

function handleConfirm() {
  visible.value = false
  const newColumnOptions = columnOptions.value.map((o) => ({
    ...o,
    headerIsChecked: selectedValues.value.includes(o.value),
  }))
  emit('change', cloneDeep(newColumnOptions))
}
</script>

<style lang="scss" scoped>
.setting-title {
  color: var(--el-text-color-secondary);
  font-weight: 500;
}

.empty-tip {
  text-align: center;
  padding: 30px 0 10px 0;
  color: var(--el-text-color-placeholder);
  font-size: var(--el-font-size-small);
}

.setting-container {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 30px 0;
}

.checkbox-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color-light);
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
