import { createRouter, createWebHistory } from 'vue-router'
import layout from "@/layout/index.vue"
import Home from "@/views/Home.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout
    },
    {
      path:"/home",
      name:"home",
      component: Home
    },
    {
      path:"/AI",
      name:"AI",
      component: () => import("@/views/AI/index.vue")
    }
  ]
})

export default router
