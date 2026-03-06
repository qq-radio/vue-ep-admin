import App from './App.vue'
import { createApp } from 'vue'

import { setupRouter } from '@/router'
import { setupStore } from '@/store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'vxe-table/styles/cssvar.scss'
import 'vxe-table/es/style.css'
import 'virtual:uno.css'
import './assets/main.css'
import './styles/vxe-table-modified.scss'
import { VxeGrid } from 'vxe-table'
import './demo1.table.renderer'

function setupComponent(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus)
}

function setup() {
  const app = createApp(App)

  setupStore(app)
  setupRouter(app)
  setupComponent(app)
  app.component(VxeGrid.name, VxeGrid)

  app.mount('#app')
}

setup()
