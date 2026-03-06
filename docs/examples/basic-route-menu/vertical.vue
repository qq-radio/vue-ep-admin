<template>
  <div style="width: 260px">
    <BasicRouteMenu v-model="activePath" v-model:active-menu="activeMenu" :menus="menus" />
  </div>
  <div>当前点击路径: {{ activePath }}</div>
  <div>当前点击菜单: {{ activeMenu }}</div>
</template>

<script setup lang="ts">
import { BasicRouteMenu, RouteMenuItemSchema } from '@center/components'

const activePath = ref('/supply-chain/purchase')
const activeMenu = ref({
  path: '/supply-chain/purchase',
  name: 'PurchaseManage',
  meta: {
    title: '采购管理',
    icon: 'el-icon-shopping-cart-2',
  },
})

const menus: RouteMenuItemSchema[] = [
  {
    path: '/goods',
    name: 'GoodsCenter',
    meta: {
      title: '商品中心',
      icon: 'el-icon-goods',
    },
    children: [
      {
        path: '/goods/manage',
        name: 'GoodsManage',
        meta: {
          title: '商品管理',
          icon: 'el-icon-box',
        },
        children: [
          {
            path: '/goods/manage/list',
            name: 'GoodsList',
            meta: {
              title: '商品列表',
              icon: 'el-icon-tickets',
            },
          },
          {
            path: '/goods/manage/expired',
            name: 'GoodsExpired',
            meta: {
              title: '过期商品',
              icon: 'el-icon-delete',
              // hidden: true,
            },
          },
        ],
      },
      {
        path: '/goods/categories',
        name: 'CategoryManager',
        meta: {
          title: '分类体系',
          icon: 'el-icon-menu',
        },
        children: [
          {
            path: '/goods/categories/main',
            name: 'MainCategories',
            meta: {
              title: '主分类',
              icon: 'el-icon-star-off',
            },
          },
          {
            path: '/goods/categories/tags',
            name: 'TagManagement',
            meta: {
              title: '标签管理',
              icon: 'el-icon-collection-tag',
            },
          },
        ],
      },
      {
        path: '/goods/brands',
        name: 'BrandCenter',
        meta: {
          title: '品牌管理',
          icon: 'el-icon-office-building',
        },
      },
    ],
  },
  {
    path: '/orders',
    name: 'OrderSystem',
    meta: {
      title: '订单交易',
      icon: 'el-icon-sold-out',
    },
    children: [
      {
        path: '/orders/transaction',
        name: 'TransactionCenter',
        meta: {
          title: '交易管理',
          icon: 'el-icon-s-order',
        },
        children: [
          {
            path: '/orders/transaction/list',
            name: 'OrderList',
            meta: {
              title: '订单列表',
              icon: 'el-icon-document',
            },
          },
          {
            path: '/orders/transaction/abnormal',
            name: 'AbnormalOrders',
            meta: {
              title: '异常订单',
              icon: 'el-icon-warning-outline',
            },
            children: [
              {
                path: '/orders/transaction/abnormal/unpaid',
                name: 'UnpaidOrders',
                meta: {
                  title: '超时未支付',
                  icon: 'el-icon-clock',
                },
              },
              {
                path: '/orders/transaction/abnormal/undelivered',
                name: 'UndeliveredOrders',
                meta: {
                  title: '待发货异常',
                  icon: 'el-icon-ship',
                },
              },
            ],
          },
        ],
      },
      {
        path: '/orders/aftersale',
        name: 'AfterSaleSystem',
        meta: {
          title: '售后处理',
          icon: 'el-icon-refresh-left',
        },
        children: [
          {
            path: '/orders/aftersale/refund',
            name: 'RefundManagement',
            meta: {
              title: '退款审核',
              icon: 'el-icon-money',
            },
          },
          {
            path: '/orders/aftersale/return',
            name: 'ReturnGoods',
            meta: {
              title: '退货管理',
              icon: 'el-icon-box',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/marketing',
    name: 'MarketingCenter',
    meta: {
      title: '营销中心',
      icon: 'el-icon-present',
      hidden: false,
    },
    children: [
      {
        path: '/marketing/coupons',
        name: 'CouponCenter',
        meta: {
          title: '优惠券管理',
          icon: 'el-icon-discount',
        },
      },
      {
        path: '/marketing/seckill',
        name: 'SeckillActivity',
        meta: {
          title: '秒杀活动',
          icon: 'el-icon-alarm-clock',
        },
      },
    ],
  },
  {
    path: '/supply-chain',
    name: 'SupplyChain',
    meta: {
      title: '供应链',
      icon: 'el-icon-connection',
    },
    children: [
      {
        path: '/supply-chain/inventory',
        name: 'InventoryManagement',
        meta: {
          title: '库存管理',
          icon: 'el-icon-house',
        },
        children: [
          {
            path: '/supply-chain/inventory/alert',
            name: 'InventoryAlert',
            meta: {
              title: '库存预警',
              icon: 'el-icon-bell',
            },
          },
          {
            path: '/supply-chain/inventory/logs',
            name: 'InventoryLogs',
            meta: {
              title: '库存流水',
              icon: 'el-icon-notebook-2',
            },
          },
        ],
      },
      {
        path: '/supply-chain/purchase',
        name: 'PurchaseManage',
        meta: {
          title: '采购管理',
          icon: 'el-icon-shopping-cart-2',
        },
      },
    ],
  },
]
</script>
