import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/customer',
  name: 'customer',
  component: () => import('@/views/customer-service.vue'),
  meta: {
    title: '客户服务',
    icon: 'Headset',
  },
} satisfies AppRouteRecordRaw
