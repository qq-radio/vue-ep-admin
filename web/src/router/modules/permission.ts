import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/permission',
  name: 'permission',
  component: () => import('@/views/permission-control.vue'),
  meta: {
    title: '权限设置',
    icon: 'Lock',
  },
} satisfies AppRouteRecordRaw
