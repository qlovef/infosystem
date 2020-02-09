import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        sessionStorage.removeItem('INFOSYSTEM_USER')
        next()
        return
    }
    if (sessionStorage) {
        const user: string | null = sessionStorage.getItem('INFOSYSTEM_USER')
        if (!user) {
            next({ path: '/login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
