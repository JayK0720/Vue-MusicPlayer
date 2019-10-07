import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index.js'
import store from './store/index.js'
Vue.config.productionTip = false
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import '@/common/scss/index.scss';
// click delay 300ms
fastclick.attach(document.body);
Vue.use(VueLazyload,{
	loading:require('@/common/imgs/loading.png')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
