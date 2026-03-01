import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/flow',
            name: 'flow',
            component: () => import('../views/FlowView.vue')
        },
        {
            path: '/forge',
            name: 'forge',
            component: () => import('../views/ForgeView.vue')
        },
        {
            path: '/reveal',
            name: 'reveal',
            component: () => import('../views/RevealView.vue')
        }
    ]
})

export default router
