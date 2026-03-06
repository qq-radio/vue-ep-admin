import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/workflow',
  name: 'workflow',
  component: () => import('@/views/workflow-designer.vue'),
  meta: {
    title: '流程引擎 - 最后一个菜单',
    icon: 'Connection',
  },
} satisfies AppRouteRecordRaw
