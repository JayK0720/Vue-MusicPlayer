import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick';
import './common/css/index.scss';
import Axios from 'axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

Vue.use(VueAwesomeSwiper)

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.$axios = Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
