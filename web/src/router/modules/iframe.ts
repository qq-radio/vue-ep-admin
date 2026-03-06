import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/iframe',
  name: 'Iframe',
  meta: {
    title: '内嵌文档',
    icon: 'Position',
    order: 3,
  },
  redirect: '/iframe/tailwindcss',
  children: [
    {
      path: '/iframe/tailwindcss',
      name: 'Tailwindcss',
      meta: {
        title: 'Tailwindcss在线文档',
        icon: 'Position',
        keepAlive: true,
        iframeSrc: 'https://tailwindcss.com/',
      },
      component: () => import('@/layouts/iframe.vue'),
    },
    {
      path: '/iframe/vue-router',
      name: 'VueRouter',
      meta: {
        title: 'VueRouter在线文档',
        icon: 'Position',
        keepAlive: true,
        iframeSrc: 'https://router.vuejs.org',
      },
      component: () => import('@/layouts/iframe.vue'),
    },
  ],
} satisfies AppRouteRecordRaw
