import type { AppRouteRecordRaw } from '#/types/router'

export default {
  path: '/system',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'Setting',
    order: 1,
  },
  redirect: '/system/user',
  children: [
    {
      path: '/system/user',
      name: 'User',
      component: () => import('@/views/system/user.vue'),
      meta: {
        title: '用户管理',
        icon: 'User',
        // fixedTab: true,
        fixedOrder: 2,
      },
    },
    {
      path: '/system/role',
      name: 'Role',
      component: () => import('@/views/system/role.vue'),
      meta: {
        title: '角色管理',
        icon: 'UserFilled',
        // fixedTab: true,
        fixedOrder: 1,
      },
    },
  ],
} satisfies AppRouteRecordRaw
