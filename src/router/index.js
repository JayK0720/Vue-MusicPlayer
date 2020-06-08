import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkActiveClass:"active",
    base: process.env.BASE_URL,
    routes:[
        {
            path:'/recommend',
            component:() => import('@/views/recommend')
        },
        {
            path:'/rank',
            component:() => import('@/views/rank')
        },
        {
            path:'/search',
            component:() => import('@/views/search')
        },
        {
            path:'/singer',
            component:() => import('@/views/singer')
        },
        {
            path:"/",
            redirect:'/recommend'
        }
    ],

})

export default router
