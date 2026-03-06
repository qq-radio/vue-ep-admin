import type { AppRouteRecordRaw} from '#/types/router'

export default {
  path: '/approval',
  name: 'approval',
  component: () => import('@/views/approval-center.vue'),
  meta: {
    title: '审批中心',
    icon: 'DocumentChecked',
  },
} satisfies AppRouteRecordRaw
