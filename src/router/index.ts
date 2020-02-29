import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/system/menu-manage',
                name: 'menuManage',
                component: () => import(/* webpackChunkName: "menuManage" */ '@/views/system/MenuManage.vue')
            },
            {
                path: '/vacation/approved-record',
                name: 'approvedRecord',
                component: () => import(/* webpackChunkName: "approvedRecord" */ '@/views/vacation/ApprovedRecordList.vue')
            },
            {
                path: '/approval/not-approved',
                name: 'notApproved',
                component: () => import(/* webpackChunkName: "notApproved" */ '@/views/approval/NotApprovedList.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
