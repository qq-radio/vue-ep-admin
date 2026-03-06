import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/inventory',
  name: 'inventory',
  component: () => import('@/views/inventory-control.vue'),
  meta: {
    title: '库存管理',
    icon: 'Box',
  },
} satisfies AppRouteRecordRaw
