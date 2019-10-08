import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import mutations from './mutations'
import getters from './getters'

export default new Vuex.Store({
	state:{
		singer:{}
	},
	mutations,
	getters
})