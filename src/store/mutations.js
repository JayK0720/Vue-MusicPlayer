const mutations = {
	SET_SINGER(state,singer){
		state.singer = singer
	},
	SET_PLAYING(state,flag){
		state.playing = flag
	},
	SET_FULL_SCREEN(state,flag){
		state.fullScreen = flag
	},
	SET_PLAY_LIST(state,list){
		state.playList = list
	},
	SET_MODE(state, mode){
		state.mode = mode
	},
	SET_SEQUENCE_LIST(state,list){
		state.sequenceList = list
	},
	SET_CURRENT_INDEX(state,index){
		state.currentIndex = index
	},
	SET_DISC(state,disc){
		state.disc = disc;
	}
}

export default mutations;