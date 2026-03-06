import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/request',
  name: 'Request',
  component: () => import('@/views/request/index.vue'),
  meta: {
    title: '网络请求',
    icon: 'Connection',
    order: 1,
  },
} satisfies AppRouteRecordRaw
