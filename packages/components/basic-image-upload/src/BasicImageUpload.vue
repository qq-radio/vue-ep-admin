<template>
  <div v-if="disabled">
    <BasicImage
      :src="previewImages"
      v-bind="{
        style: {
          width: '130px',
          height: '130px',
        },
        ...previewImageProps,
      }"
    />
  </div>
  <div v-else>
    <el-upload
      v-bind="getBindValues"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
    >
      <div v-if="drag" class="text-center">
        <el-icon size="26"><UploadFilled /></el-icon>
        <div>拖拽文件或点击上传</div>
      </div>
      <el-icon v-else><Plus /></el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { BasicImageUploadProps, BasicImageUploadEmits, ImageItem } from './type'
import type { UploadFile, UploadRawFile } from 'element-plus'

import { ref, computed, useAttrs, watchEffect } from 'vue'
import { isArray, isFunction } from 'lodash-es'

import { BasicImage } from '@center/components/basic-image'
import { ElMessage } from 'element-plus'
import { UploadFilled, Plus } from '@element-plus/icons-vue'

defineOptions({
  name: 'BasicImageUpload',
})

const attrs = useAttrs()

const props = withDefaults(defineProps<BasicImageUploadProps>(), {
  limit: 1,
  maxSize: 2,
  previewImageProps: {} as any,
})

const emit = defineEmits<BasicImageUploadEmits>()

// const action = import.meta.env.VITE_BASE_URL + props.uploadUrl || '//httpbin.org/post'
const action = '//httpbin.org/post'

const getBindValues = computed(() => ({
  action,
  listType: 'picture-card',
  limit: props.limit,
  disabled: props.disabled,
  drag: props.drag,
  ...attrs,
}))

const fileList = ref<ImageItem[]>([])

watchEffect(() => {
  fileList.value = isArray(props.modelValue) ? [...props.modelValue] : []
})

const bytesToMB = (bytes) => {
  return bytes / 1024 / 1024
}

const handleBeforeUpload = (file: UploadRawFile) => {
  const { maxSize } = props
  const { type, size } = file

  const isValidType = type.startsWith('image/')
  if (!isValidType) {
    ElMessage.error('只能上传图片文件')
    return false
  }

  const isValidSize = bytesToMB(size) < maxSize
  if (!isValidSize) {
    ElMessage.error(`图片大小不能超过${maxSize}MB`)
    return false
  }

  return true
}

const handleExceed = () => {
  const { limit } = props
  const isValidLimit = fileList.value.length < limit
  if (!isValidLimit) {
    ElMessage.error(`只允许上传${limit}张图片，请删除后重新上传`)
  }
}

const handleSuccess = (response: any, file: UploadFile) => {
  const fn = props.formatUploadResponse
  const newFile = {
    name: file.name,
    url: file.url,
    ...(isFunction(fn) ? fn(response.data) : response.data),
  }

  if (!props.multiple || (props.multiple && props.limit === 1)) {
    fileList.value = [newFile]
  } else {
    fileList.value.push(newFile)
  }

  emitChange()
}

const handleRemove = (_uploadFile, uploadFiles: ImageItem[]) => {
  emit('update:modelValue', uploadFiles)
}

const emitChange = () => {
  emit('update:modelValue', fileList.value)
  emit('change', fileList.value)
}

const dialogVisible = ref(false)
const dialogImageUrl = ref('')

const handlePreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url || ''
  dialogVisible.value = true
}

const previewImages = computed(() => (props.disabled ? fileList.value.map((f) => f.url) : []))
</script>

<style scoped>
:deep(.el-upload-list .el-upload-dragger) {
  border: 0px;
  padding-bottom: calc(var(--el-upload-dragger-padding-horizontal) - 4px);
}
</style>
