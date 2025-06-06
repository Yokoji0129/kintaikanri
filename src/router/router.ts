// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ManagementView from '../views/ManagementView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/management', component: ManagementView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
