import {playMode} from '@/common/js/config'
import {shuffle} from '@/common/js/util'

/*
1. 当播放歌曲后,切换模式为随机播放的时候,此时已经修改了playList为 打乱后的播放列表 
2. 当点击播放列表的歌曲时,此时点击的歌曲 和 实际播放列表里的歌曲不一致,比如点击的是第二首歌,实际可能点击的歌曲在打乱后的列表里的序号为第10 个 或 20

解决方法:
找到当前点击的序号为index的歌曲 在打乱后列表里在第几项，然后实际播放打乱列表里 找到的这首歌曲。
*/
function findIndex(list,song){
	return list.findIndex((item) => {
		return item.songid === song.songid;
	})
}

const actions = {
	selectPlay({commit,state},{list,index,song}){
		commit('SET_SEQUENCE_LIST',list);
		if(state.mode === playMode.random){
			let randomList = shuffle(list);
			commit('SET_PLAY_LIST',randomList);
			index = findIndex(randomList,list[index]);
		}else{
			commit('SET_PLAY_LIST',list);
		}
		commit('SET_PLAYING',true);
		commit('SET_CURRENT_INDEX',index);
	},
	/*
	点击按钮全部播放的时候,如果此时播放模式是随机播放,打款播放歌曲的顺序
	*/
	playAllMusic({commit,state},{list,index}){
		if(state.mode === playMode.random){
			let randomList = shuffle(list);
			commit('SET_PLAY_LIST',randomList);
		}else{
			commit('SET_PLAY_LIST',list);
		}
		commit('SET_PLAYING',true);
		commit('SET_SEQUENCE_LIST',list);
		commit('SET_CURRENT_INDEX',index);
		commit('SET_FULL_SCREEN',true);
	}
} 
export default actions;