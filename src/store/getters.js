const getters = {
	singer: (state) => state.singer,
	playing: (state) => state.playing,
	fullScreen: (state) => state.fullScreen,
	playList: (state) => state.playList,
	sequenceList: (state) => state.sequenceList,
	mode: (state) => state.mode,
	currentIndex : (state) => state.currentIndex,
	currentSong : (state) => {
		return state.playList[state.currentIndex] || {  
			image:require('@/common/imgs/loading.png'),
			songname:'让生活充满音乐',
			singer:''
		}
	}
}

export default getters;