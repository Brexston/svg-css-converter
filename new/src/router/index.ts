
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/' as string,
        name: 'MainLayout' as string,
        component: () => import('@/components/layouts/MainLayout.vue'),
    },
    // {
    //     path: '/:lang',
    //     component: () => import("@/components/layouts/MainLayout.vue"),
    // }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router