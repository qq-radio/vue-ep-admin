import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/logistics',
  name: 'logistics',
  component: () => import('@/views/logistics-tracker.vue'),
  meta: {
    title: '物流追踪',
    icon: 'Van',
  },
} satisfies AppRouteRecordRaw
