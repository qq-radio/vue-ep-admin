export interface BasicImageUploadProps {
  modelValue?: ImageItem[]
  uploadUrl?: string
  disabled?: boolean
  drag?: boolean
  multiple?: boolean
  limit?: number
  maxSize?: number
  formatUploadResponse?: (response: any) => ImageItem

  previewImageProps?: Recordable
}

export interface BasicImageUploadEmits {
  (e: 'update:modelValue', modelValue: ImageItem[]): void
  (e: 'change', modelValue: ImageItem[]): void
}

export interface ImageItem {
  url: string
  name: string
}
