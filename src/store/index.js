import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import mutations from './mutations'
import getters from './getters'
import {playMode} from '@/common/js/config'
import actions from './actions'

export default new Vuex.Store({
	state:{
		singer:{},
		playing:false,
		fullScreen:false,
		playList:[],
		sequenceList:[],
		mode:playMode.sequence,
		currentIndex:-1,
		disc:{},
		toplist:{}
	},
	mutations,
	getters,
	actions
})