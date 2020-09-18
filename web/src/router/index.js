import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (login.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/',
                name: 'Home',
                menu: {
                    title: '首页',
                    icon: 'md-planet'
                },
                component: () => import('@/views/main/Home.vue')
            },
            {
                path: '/my_general',
                menu: {
                    title: '我的武将',
                    icon: 'md-cube',
                    power: [1]
                },
                component: () => import('@/views/main/MyGeneral.vue')
            },
            {
                path: '*',
                component: () => import('@/views/main/404.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const { userType } = store.state
    // console.log('beforeEach', to, from, store)
    if (to.path === '/login') {
        if (!userType) {
            next()
        }
    } else {
        if (!to.menu || !to.menu.power) {
            next()
        } else if (to.menu.power.indexOf(userType) > -1) {
            next()
        }
    }
})

export default router
