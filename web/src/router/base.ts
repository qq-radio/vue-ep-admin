import type { RouteRecordRaw } from 'vue-router'
import type { AppRouteRecordRaw } from '#/types/router'

import Layout from '@/layouts/index.vue'

export const HOME_ROUTE: AppRouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: () => import('@/views/home.vue'),
  meta: {
    title: '首页',
    icon: 'Home',
  },
}

export const ROOT_ROUTE: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  component: Layout,
  children: [],
}

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login.vue'),
}

export const ERROR_ROUTE: RouteRecordRaw = {
  path: '/error',
  name: 'Error',
  redirect: '/error/403',
  meta: {
    icon: 'information-line',
    title: '异常页面',
    hideInMenu: true,
  },
  children: [
    {
      path: '/error/403',
      name: '403',
      component: () => import('@/views/error/403.vue'),
      meta: {
        title: '403',
        hideInMenu: true,
      },
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '404',
        hideInMenu: true,
      },
    },
    {
      path: '/error/500',
      name: '500',
      component: () => import('@/views/error/500.vue'),
      meta: {
        title: '500',
        hideInMenu: true,
      },
    },
  ],
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/error/404.vue'),
}
