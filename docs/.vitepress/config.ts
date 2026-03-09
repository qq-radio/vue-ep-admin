import { defineConfig } from 'vitepress'
import mdPlugin from './plugins'
import autoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import checker from 'vite-plugin-checker'
import { markdownTransform } from './plugins/link'

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
      { text: '组件', link: '/contents/components/overview' },
      { text: '工具', link: '/contents/tools/storage' },
      { text: '变更日志', link: '/contents/guide/change-log' },
    ],
    sidebar: {
      guide: [
        {
          text: '简介',
          items: [
            { text: '开发环境', link: '/contents/guide/dev' },
            { text: '设计总则', link: '/contents/guide/design-principle' },
            { text: '组件总览', link: '/contents/components/overview' },
            { text: '常见问题', link: '/contents/guide/common-issue' },
            { text: '变更日志', link: '/contents/guide/change-log' },
          ],
        },
      ],
      components: [
        {
          text: '组件总览',
          link: '/contents/components/overview',
        },
        {
          text: '高级',
          items: [
            {
              text: '表单',
              link: '/contents/components/form-design',
              items: [
                { text: '基本使用', link: '/contents/components/basic-form' },
                { text: '组件方法', link: '/contents/components/basic-form-method' },
                { text: '弹窗表单', link: '/contents/components/basic-form-with-dialog' },
                { text: '分组表单', link: '/contents/components/basic-form-with-group' },
                { text: '分步表单', link: '/contents/components/basic-form-with-step' },
              ],
            },
            {
              text: '表格',
              items: [
                { text: '基本使用', link: '/contents/components/basic-table' },
                {
                  text: '组件方法',
                  link: '/contents/components/basic-table-method',
                },
              ],
            },
            {
              text: '描述',
              link: '/contents/components/basic-description',
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
                      link: '/contents/components/basic-readonly-input',
                    },
                    {
                      text: '数字范围输入框',
                      link: '/contents/components/basic-input-number-range',
                    },
                  ],
                },
                { text: '单选', link: '/contents/components/basic-radio-group' },
                { text: '多选', link: '/contents/components/basic-checkbox-group' },
                { text: '下拉选择', link: '/contents/components/basic-select' },
                { text: '树选择', link: '/contents/components/basic-tree-select' },
                { text: '级联选择', link: '/contents/components/basic-cascader' },
                { text: '图片上传', link: '/contents/components/basic-image-upload' },
              ],
            },
            {
              text: '数据展示',
              items: [
                { text: '显示', link: '/contents/components/basic-display' },
                { text: '列表', link: '/contents/components/basic-list' },
                { text: '图片', link: '/contents/components/basic-image' },
                { text: '状态', link: '/contents/components/basic-status' },
                { text: '复制', link: '/contents/components/basic-copy' },
                { text: '时间', link: '/contents/components/basic-time' },
              ],
            },
            {
              text: '功能组件',
              items: [
                {
                  text: '弹窗',
                  items: [
                    { text: '基本使用', link: '/contents/components/basic-dialog' },
                    {
                      text: '组件方法',
                      link: '/contents/components/basic-dialog-composable',
                    },
                  ],
                },
                { text: '按钮组', link: '/contents/components/basic-button-group' },
                { text: '导入', link: '/contents/components/basic-import' },
                { text: '导出', link: '/contents/components/basic-export' },
                { text: '分页器', link: '/contents/components/basic-pagination' },
                { text: '路由菜单', link: '/contents/components/basic-route-menu' },
                { text: '导航栏', link: '/contents/components/basic-tabbar' },
                { text: '右键菜单', link: '/contents/components/basic-context-menu' },
                { text: '下拉菜单', link: '/contents/components/basic-dropdown' },
                { text: '面包屑', link: '/contents/components/basic-breadcrumb' },
                { text: '文本', link: '/contents/components/basic-text' },
              ],
            },
          ],
        },
      ],
      tools: [
        {
          text: '工具函数',
          items: [{ text: '缓存', link: '/contents/tools/storage' }],
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
    plugins: [
      vueJsx(),
      autoImport({
        imports: ['vue'],
        dts: './auto-import.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './auto-import-eslintrc.json',
        },
      }),
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
