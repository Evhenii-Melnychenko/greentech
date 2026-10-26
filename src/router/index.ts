import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

declare module 'vue-router' {
  interface RouteMeta {
    titleKey?: 'home' | 'about' | 'projects' | 'contacts'
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: Home, meta: { titleKey: 'home' } },
    { path: '/about', name: 'about', component: () => import('@/views/About.vue'), meta: { titleKey: 'about' } },
    { path: '/projects', name: 'projects', component: () => import('@/views/Projects.vue'), meta: { titleKey: 'projects' } },
    { path: '/contacts', name: 'contacts', component: () => import('@/views/Contacts.vue'), meta: { titleKey: 'contacts' } },
  ],
})

export default router
