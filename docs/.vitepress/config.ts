import { defineConfig } from 'vitepress'
import mdPlugin from './plugins'
import autoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import checker from 'vite-plugin-checker'
import { markdownTransform } from './plugins/link'
import { fileURLToPath, URL } from 'url'
import type { AliasOptions } from 'vite'

const pathResolve = (dir: string): string => fileURLToPath(new URL(dir, import.meta.url))

const alias: AliasOptions = {
  '@components': pathResolve('../src/components'),
  '@mocks': pathResolve('./mocks'),
}

export default defineConfig({
  base: '/',
  title: 'SchemaDriven',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/components/overview' },
      { text: '工具', link: '/tools/storage' },
      { text: '变更日志', link: '/guide/change-log' },
    ],
    sidebar: {
      guide: [
        {
          text: '简介',
          items: [
            { text: '开发环境', link: '/guide/dev' },
            { text: '设计总则', link: '/guide/design-principle' },
            { text: '组件总览', link: '/components/overview' },
            { text: '常见问题', link: '/guide/common-issue' },
            { text: '变更日志', link: '/guide/change-log' },
          ],
        },
      ],
      components: [
        {
          text: '组件总览',
          link: '/components/overview',
        },
        {
          text: '高级',
          items: [
            {
              text: '表单',
              link: '/components/form-design',
              items: [
                { text: '基本使用', link: '/components/basic-form' },
                { text: '组件方法', link: '/components/basic-form-method' },
                { text: '弹窗表单', link: '/components/basic-form-with-dialog' },
                { text: '分组表单', link: '/components/basic-form-with-group' },
                { text: '分步表单', link: '/components/basic-form-with-step' },
              ],
            },
            {
              text: '表格',
              items: [
                { text: '基本使用', link: '/components/basic-table' },
                {
                  text: '组件方法',
                  link: '/components/basic-table-method',
                },
              ],
            },
            {
              text: '描述',
              link: '/components/basic-description',
            },
          ],
        },
        {
          text: '内置',
          items: [
            {
              text: '数据收集',
              items: [
                {
                  text: '输入框',
                  items: [
                    {
                      text: '只读选择输入框',
                      link: '/components/basic-readonly-input',
                    },
                    {
                      text: '数字范围输入框',
                      link: '/components/basic-input-number-range',
                    },
                  ],
                },
                { text: '单选', link: '/components/basic-radio-group' },
                { text: '多选', link: '/components/basic-checkbox-group' },
                { text: '下拉选择', link: '/components/basic-select' },
                { text: '树选择', link: '/components/basic-tree-select' },
                { text: '级联选择', link: '/components/basic-cascader' },
                { text: '图片上传', link: '/components/basic-image-upload' },
              ],
            },
            {
              text: '数据展示',
              items: [
                { text: '显示', link: '/components/basic-display' },
                { text: '列表', link: '/components/basic-list' },
                { text: '图片', link: '/components/basic-image' },
                { text: '状态', link: '/components/basic-status' },
                { text: '复制', link: '/components/basic-copy' },
                { text: '时间', link: '/components/basic-time' },
              ],
            },
            {
              text: '功能组件',
              items: [
                {
                  text: '弹窗',
                  items: [
                    { text: '基本使用', link: '/components/basic-dialog' },
                    {
                      text: '组件方法',
                      link: '/components/basic-dialog-composable',
                    },
                  ],
                },
                { text: '按钮组', link: '/components/basic-button-group' },
                { text: '导入', link: '/components/basic-import' },
                { text: '导出', link: '/components/basic-export' },
                { text: '分页器', link: '/components/basic-pagination' },
                { text: '路由菜单', link: '/components/basic-route-menu' },
                { text: '导航栏', link: '/components/basic-tabbar' },
                { text: '右键菜单', link: '/components/basic-context-menu' },
                { text: '下拉菜单', link: '/components/basic-dropdown' },
                { text: '面包屑', link: '/components/basic-breadcrumb' },
                { text: '文本', link: '/components/basic-text' },
              ],
            },
          ],
        },
      ],
      tools: [
        {
          text: '工具函数',
          items: [{ text: '缓存', link: '/tools/storage' }],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https:github.com/qq-radio/monorepo' }],
  },
  markdown: {
    lineNumbers: true,
    config: (md) => mdPlugin(md),
  },
  vite: {
    server: {
      port: 5000,
      host: true,
      open: true,
    },
    resolve: {
      alias,
    },
    plugins: [
      autoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: true,
        },
      }),
      vueJsx(),
      checker({
        typescript: true,
      }),
      markdownTransform(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
})
