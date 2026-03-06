import type { Ref } from 'vue'

export interface BasicDrawerProps {
  modelValue?: boolean
  title?: string
  size?: string | number
  height?: string | number
  loading?: boolean
  disabled?: boolean | Ref<boolean>
  hasFooter?: boolean
  hasDebounce?: boolean
  closeText?: string
  cancelText?: string
  confirmText?: string
}

export interface DrawerMethods {
  setDrawerProps: (props: Partial<BasicDrawerProps>) => void
  openDrawer: () => void
  closeDrawer: () => void
  setDrawerTitle: (value: string) => void
  setConfirmLoading: (loading: boolean) => void
}

type UseDrawerReturn = [(instance: DrawerMethods) => void, DrawerMethods]

export interface UseDrawer {
  (props?: Partial<BasicDrawerProps>): UseDrawerReturn
}
