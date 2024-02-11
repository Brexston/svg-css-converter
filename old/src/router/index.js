import {createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Frontpage',
        component: () => import("../views/Frontpage"),
    },
    {
        path: '/:lang',
        component: () => import("../views/Frontpage"),
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router