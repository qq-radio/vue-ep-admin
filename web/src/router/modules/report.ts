import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/report',
  name: 'report',
  component: () => import('@/views/business-report.vue'),
  meta: {
    title: '业务报表',
    icon: 'DataBoard',
  },
} satisfies AppRouteRecordRaw
