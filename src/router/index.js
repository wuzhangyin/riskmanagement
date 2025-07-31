import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import NonICTProjects from '@/views/NonICTProjects.vue'
import CustomerPerformanceWarning from '@/views/CustomerPerformanceWarning.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/non-ict-projects',
    name: 'NonICTProjects',
    component: NonICTProjects
  },
  {
    path: '/customer-performance-warning/:riskPointName?',
    name: 'CustomerPerformanceWarning',
    component: CustomerPerformanceWarning,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 