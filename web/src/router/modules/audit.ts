import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/log',
  name: 'log',
  component: () => import('@/views/log.vue'),
  meta: {
    title: '操作日志',
    icon: 'Notebook',
  },
} satisfies AppRouteRecordRaw
