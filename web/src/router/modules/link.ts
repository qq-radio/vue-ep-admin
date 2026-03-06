import type { AppRouteRecordRaw} from '#/types/router'

export default {
  path: '/iframe/element-plus',
  name: 'ElementPlus',
  meta: {
    title: 'ElementPlus在线文档',
    icon: 'Position',
    keepAlive: true,
    link: 'https://element-plus.org/zh-CN',
  },
  component: () => import('@/layouts/iframe.vue'),
} satisfies AppRouteRecordRaw
