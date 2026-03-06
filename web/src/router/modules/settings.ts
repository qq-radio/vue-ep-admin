import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/settings',
  name: 'settings',
  component: () => import('@/views/system-settings.vue'),
  meta: {
    title: '系统设置',
    icon: 'Setting',
  },
} satisfies AppRouteRecordRaw
