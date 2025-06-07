// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ApplicationView from '../views/ApplicationView.vue'
import WorkView from '../views/WorkView.vue'
import HistoryView from '../views/HistoryView.vue'
import SupportView from '../views/SupportView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/application', component: ApplicationView },
  { path: '/work', component: WorkView },
  { path: '/history', component: HistoryView },
  { path: '/support', component: SupportView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
