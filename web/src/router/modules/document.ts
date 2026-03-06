import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/document',
  name: 'document',
  component: () => import('@/views/document-center.vue'),
  meta: {
    title: '文档中心',
    icon: 'FolderOpened',
  },
} satisfies AppRouteRecordRaw
