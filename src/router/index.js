import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
const routes = [
    {
        path:"/",
        component:Index
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes:routes
})

export default router
