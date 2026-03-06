import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/marketing',
  name: 'marketing',
  component: () => import('@/views/marketing-campaign.vue'),
  meta: {
    title: '营销活动(新窗口打开)',
    icon: 'Promotion',
    openInNewWindow: true,
  },
} satisfies AppRouteRecordRaw
