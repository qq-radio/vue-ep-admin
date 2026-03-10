<template>
  <el-drawer v-bind="getBindValues" v-model="drawerVisible" :before-close="handleCancel">
    <div>
      <slot />
    </div>
    <template v-if="getProps.hasFooter" #footer>
      <slot name="footer">
        <template v-if="getProps.disabled">
          <el-button @click="handleClose">{{ getProps.closeText }}</el-button>
        </template>
        <template v-else>
          <el-button @click="handleCancel">{{ getProps.cancelText }}</el-button>
          <el-button
            type="primary"
            :loading="confirmLoading"
            @click="getProps.hasDebounce ? handleDebounceConfirm() : handleConfirm()"
          >
            {{ getProps.confirmText }}
          </el-button>
        </template>
      </slot>
    </template>
    <template #header>
      <slot name="header" />
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { BasicDrawerProps, DrawerMethods } from './type'

import { ref, watchEffect, computed, useAttrs, onMounted } from 'vue'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'BasicDrawer',
})

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue', 'register', 'close', 'cancel', 'confirm'])

const props = withDefaults(defineProps<BasicDrawerProps>(), {
  title: '',
  size: '980px',
  hasFooter: true,
  closeText: '关闭',
  cancelText: '取消',
  confirmText: '确定',
})

const propsRef = ref<Partial<BasicDrawerProps>>({})

const getProps = computed<BasicDrawerProps>(() => {
  return {
    ...props,
    ...propsRef.value,
  }
})

function setDrawerProps(partialProps: Partial<BasicDrawerProps>) {
  propsRef.value = {
    ...propsRef.value,
    ...partialProps,
  }
}

const getBindValues = computed(() => ({
  ...attrs,
  ...getProps.value,
  title: drawerTitle.value,
}))

const drawerTitle = ref('')
const drawerVisible = ref(false)
const confirmLoading = ref(false)

watchEffect(() => {
  drawerTitle.value = props.title
  drawerVisible.value = props.modelValue
  confirmLoading.value = props.loading
})

const openDrawer = () => {
  drawerVisible.value = true
}

const closeDrawer = () => {
  drawerVisible.value = false
}

const setDrawerTitle = (value) => {
  drawerTitle.value = value
}

const setConfirmLoading = (value) => {
  confirmLoading.value = value
}

const handleConfirm = () => {
  if (confirmLoading.value) {
    return
  }
  emit('confirm')
}

const handleDebounceConfirm = debounce(handleConfirm, 2000)

const handleClose = () => {
  closeDrawer()
  emit('update:modelValue', false)
  emit('close')
}

const handleCancel = () => {
  closeDrawer()
  emit('update:modelValue', false)
  emit('cancel')
}

const drawerMethods: DrawerMethods = {
  setDrawerProps,
  openDrawer,
  closeDrawer,
  setDrawerTitle,
  setConfirmLoading,
}

onMounted(() => {
  emit('register', drawerMethods)
})

defineExpose({
  ...drawerMethods,
})
</script>
