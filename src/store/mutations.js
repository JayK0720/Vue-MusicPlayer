import {deleteSearchHistory} from '@/common/js/cache.js';
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
	},
	SET_TOP_LIST(state,toplist){
		state.toplist = toplist;
	},
	SET_SEARCH_HISTORY(state,searchHistory){
		state.searchHistory = searchHistory;
	},
	SET_PLAY_HISTORY(state,playHistory){
		state.playHistory = playHistory;
	},
	DELETE_SEARCH_HISTORY(state,index){
		state.searchHistory.splice(index,1);
		deleteSearchHistory(index);
	},
	SET_FAVORITE_LIST(state,list){
		state.favoriteList = list;
	}
}

export default mutations;