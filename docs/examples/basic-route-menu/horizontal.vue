<template>
  <BasicRouteMenu
    v-model="activePath"
    v-model:active-menu="activeMenu"
    :menus="menus"
    mode="horizontal"
  />
  <div>当前点击路径: {{ activePath }}</div>
  <div>当前点击菜单: {{ activeMenu }}</div>
</template>

<script setup lang="ts">
import { BasicRouteMenu, RouteMenuItemSchema } from '@center/components'

const activePath = ref('/system')
const activeMenu = ref({
  path: '/system/users',
  name: 'UserManagement',
  meta: {
    title: '用户管理',
  },
})

const menus: RouteMenuItemSchema[] = [
  {
    path: '/system',
    name: 'SystemSettings',
    meta: {
      title: '系统设置',
      icon: 'el-icon-setting',
    },
    children: [
      {
        path: '/system/users',
        name: 'UserManagement',
        meta: {
          title: '用户管理',
          icon: 'el-icon-user',
        },
      },
      {
        path: '/system/roles',
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          icon: 'el-icon-lock',
        },
        children: [
          {
            path: '/system/roles/assign',
            name: 'PermissionAssign',
            meta: {
              title: '权限分配',
              icon: 'el-icon-key',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/administration',
    name: 'Administration',
    meta: {
      title: '行政管理',
      icon: 'el-icon-office-building',
    },
    children: [
      {
        path: '/administration/assets',
        name: 'AssetsManage',
        meta: {
          title: '资产管理',
          icon: 'el-icon-cpu',
        },
        children: [
          {
            path: '/administration/assets/records',
            name: 'AssetsRecords',
            meta: {
              title: '资产台账',
              icon: 'el-icon-notebook-2',
            },
          },
          {
            path: '/administration/assets/borrow',
            name: 'AssetsBorrow',
            meta: {
              title: '借用登记',
              icon: 'el-icon-document-copy',
            },
          },
        ],
      },
      {
        path: '/administration/vehicles',
        name: 'VehicleManagement',
        meta: {
          title: '车辆调度',
          icon: 'el-icon-truck',
        },
      },
    ],
  },
  {
    path: '/approval',
    name: 'ApprovalSystem',
    meta: {
      title: '审批流程',
      icon: 'el-icon-s-check',
    },
    children: [
      {
        path: '/approval/my',
        name: 'MyApproval',
        meta: {
          title: '我的审批',
          icon: 'el-icon-finished',
        },
        children: [
          {
            path: '/approval/my/created',
            name: 'CreatedApproval',
            meta: {
              title: '我发起的',
              icon: 'el-icon-s-promotion',
            },
          },
          {
            path: '/approval/my/pending',
            name: 'PendingApproval',
            meta: {
              title: '待我审批',
              icon: 'el-icon-message-solid',
            },
            children: [
              {
                path: '/approval/my/pending/urgent',
                name: 'UrgentApproval',
                meta: {
                  title: '加急审批',
                  icon: 'el-icon-alarm-clock',
                },
              },
            ],
          },
        ],
      },
      {
        path: '/approval/types',
        name: 'ApprovalTypes',
        meta: {
          title: '审批类型',
          icon: 'el-icon-set-up',
        },
        children: [
          {
            path: '/approval/types/leave',
            name: 'LeaveApproval',
            meta: {
              title: '请假审批',
              icon: 'el-icon-sunset',
            },
          },
          {
            path: '/approval/types/expense',
            name: 'ExpenseApproval',
            meta: {
              title: '费用报销',
              icon: 'el-icon-money',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/contacts',
    name: 'Contacts',
    meta: {
      title: '通讯录',
      icon: 'el-icon-notebook-2',
      hidden: false,
    },
    children: [
      {
        path: '/contacts/internal',
        name: 'InternalContacts',
        meta: {
          title: '内部通讯录',
          icon: 'el-icon-user-solid',
        },
      },
      {
        path: '/contacts/external',
        name: 'ExternalContacts',
        meta: {
          title: '外部联系人',
          icon: 'el-icon-link',
        },
      },
    ],
  },
  {
    path: '/todo',
    name: 'Todo',
    meta: {
      title: '待办事项',
      icon: 'el-icon-check',
    },
  },
]
</script>
