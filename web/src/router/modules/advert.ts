import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/advert',
  name: 'advert',
  component: () => import('@/views/advert-manage.vue'),
  meta: {
    title: '广告管理(无权限页面)',
    icon: 'Position',
    forbidden: true,
    hideInMenu: true,
  },
} satisfies AppRouteRecordRaw
