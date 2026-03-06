import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/product',
  name: 'Product',
  meta: {
    title: '产品管理',
    icon: 'Goods',
    order: 2,
  },
  redirect: '/product/product-list',
  children: [
    {
      path: '/product/product-list',
      name: 'ProductList',
      component: () => import('@/views/product/list.vue'),
      meta: {
        title: '产品列表',
        icon: 'List',
        keepAlive: true,
        hideBreadcrumb: true,
      },
    },
    {
      path: '/product/product-category',
      name: 'ProductCategory',
      component: () => import('@/views/product/category.vue'),
      meta: {
        title: '分类管理',
        keepAlive: true,
      },
    },
    {
      path: '/product/product-analytic',
      name: 'ProductAnalytic',
      component: () => import('@/views/product/analytic.vue'),
      meta: {
        title: '数据分析',
        keepAlive: true,
      },
    },
  ],
} satisfies AppRouteRecordRaw
