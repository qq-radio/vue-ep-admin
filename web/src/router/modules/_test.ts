export default {
  path: '/assets-center',
  meta: {
    title: '资产中心',
    order: 3,
  },
  children: [
    {
      path: 'structural-data',
      component: () => import('@/views/assets-center/structural-data/index.vue'),
      meta: {
        title: '结构化数据',
        order: 1,
      },
    },
    {
      path: 'structural-data/view/:id',
      component: () => import('@/views/assets-center/structural-data/view.vue'),
      meta: {
        title: '查看结构化数据',
        hideMenu: true,
      },
    },
  ],
}
