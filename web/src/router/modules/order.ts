import type { AppRouteRecordRaw} from '#/types/router'

export default {
  path: '/order',
  name: 'order',
  component: () => import('@/views/order-list.vue'),
  meta: {
    title: '订单管理',
  },
} satisfies AppRouteRecordRaw
