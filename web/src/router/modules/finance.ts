import type { AppRouteRecordRaw} from '#/types/router'

export default {
  path: '/finance',
  name: 'finance',
  component: () => import('@/views/finance-report.vue'),
  meta: {
    title: '财务报表',
  },
} satisfies AppRouteRecordRaw
