import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/feedback',
  name: 'feedback',
  component: () => import('@/views/user-feedback.vue'),
  meta: {
    title: '用户反馈',
    icon: 'ChatLineSquare',
  },
} satisfies AppRouteRecordRaw
