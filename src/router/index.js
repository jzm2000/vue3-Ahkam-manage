import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import layout from "@/layout/index.vue"
import Home from "@/views/Home.vue"
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    },
    {
      path:"/dragPage",
      name:"drag",
      component: () => import("@/views/dragPage/index.vue")
    },
  ]
})

export default router
