import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard.vue'),
  meta: {
    title: '控制台概览',
  },
} satisfies AppRouteRecordRaw
