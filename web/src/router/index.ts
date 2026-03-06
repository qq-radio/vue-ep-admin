import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuard } from './guard'
import { generateRoutes } from './routes'
export { ROOT_ROUTE, LOGIN_ROUTE, HOME_ROUTE, ERROR_ROUTE } from './base'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: generateRoutes(),
})

export function setupRouter(app: App) {
  createRouterGuard(router)
  app.use(router)
}

export { router }
