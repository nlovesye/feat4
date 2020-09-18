import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import './app.less'

Vue.config.productionTip = false
Vue.use(ViewUI, {
    transfer: true,
    size: 'small'
    // capture: false,
    // select: {
    //     arrow: 'md-arrow-dropdown',
    //     arrowSize: 20
    // }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
