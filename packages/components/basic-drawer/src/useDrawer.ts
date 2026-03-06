import type { BasicDrawerProps, DrawerMethods, UseDrawer } from './type'

import { ErrorMessages, BasicComponentError } from '@center/components/error'

import { ref, unref, watch, onUnmounted } from 'vue'

export const useDrawer: UseDrawer = (props) => {
  const instanceRef = ref<Nullable<DrawerMethods>>(null)

  function getInstance() {
    const instance = unref(instanceRef)
    if (!instance) {
      throw new BasicComponentError(ErrorMessages.DRAWER_INSTANCE_NOT_OBTAINED)
    }
    return instance
  }

  function register(instance: DrawerMethods) {
    onUnmounted(() => {
      instanceRef.value = null
    })

    instanceRef.value = instance

    watch(
      () => props,
      () => {
        const propsValue = unref(props)
        if (propsValue) {
          getInstance().setDrawerProps(propsValue)
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )
  }

  const methods: DrawerMethods = {
    setDrawerProps: (props: Partial<BasicDrawerProps>) => {
      getInstance().setDrawerProps(props)
    },

    openDrawer: () => {
      getInstance().openDrawer()
    },

    closeDrawer: () => {
      getInstance().closeDrawer()
    },

    setDrawerTitle: (value) => {
      getInstance().setDrawerTitle(value)
    },

    setConfirmLoading: (loading) => {
      getInstance().setConfirmLoading(loading)
    },
  }

  return [register, methods]
}
