const actions = {
	selectPlay({commit,state},{list,index}){
		commit('SET_PLAYING',true);
		commit('SET_PLAY_LIST',list);
		commit('SET_FULL_SCREEN',true);
		commit('SET_SEQUENCE_LIST',list);
		commit('SET_CURRENT_INDEX',index);
	}
} 
export default actions;