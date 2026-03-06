import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/notification',
  name: 'notification',
  component: () => import('@/views/notification-center.vue'),
  meta: {
    title: '消息中心(新窗口打开)',
    icon: 'Bell',
    openInNewWindow: true,
  },
} satisfies AppRouteRecordRaw
