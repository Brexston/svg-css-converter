
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Frontpage',
        component: () => import('./components/HelloWorld.vue'),
    },
    {
        path: '/:lang',
        component: () => import("../components/HelloWorld.vue"),
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router