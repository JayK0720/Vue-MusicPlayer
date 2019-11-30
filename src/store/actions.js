import {playMode} from '@/common/js/config'
import {shuffle} from '@/common/js/util'
import {
	savePlayHistory,
	saveSearchHistory,
	clearSearchHistory,
	clearPlayHistory,
	saveFavoriteList,
	deleteFavoriteList
	}
from '@/common/js/cache'
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
	点击按钮全部播放的时候,如果此时播放模式是随机播放,打乱播放歌曲的顺序
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
	},
	/*
	点击搜索列表项时插入歌曲
	1. 先获取当前的播放列表, playList sequenceList 以及当前歌曲在播放列表中的位置 currentIndex 
	2. 将歌曲插入当前播放歌曲的下一个位置
	3. 判断添加的歌曲是否已经存在于当前播放列表中,如果存在则删除已经存在的歌曲
	*/
   insertSong({commit,state},song){
	   let playList = [...state.playList];
	   let sequenceList = state.sequenceList.slice();
	   let currentIndex = state.currentIndex;
	   // 当前歌曲
	   let currentSong = playList[currentIndex];
	   /*
	    判断添加的歌曲是否已经存在于当前的播放列表，如果存在，则求出已存在的歌曲在播放列表中的序号
		tips: 应该先判断,然后再添加歌曲
	    */
	   const fdIndex = playList.findIndex((item) => {
	   		 return item.songid === song.songid;
	   });
	   currentIndex++;	// 添加到当前播放歌曲的下一首,否则添加的是当前歌曲的前一个位置
	   playList.splice(currentIndex,0,song);
	  /*
	  如果大于-1,说明当前歌曲播放列表中有此歌曲. 此时有两种情况:
	  1. 已经存在的歌曲在插入到播放列表位置的前面 
		当前播放的列表			插入一首搜索歌曲后的列表  		删除重复的歌曲
		currentIndex:4   fdIndex:1
	  [1,2,3,4,5,6,7] -----> [1,2,3,4,5,2,6,7]	------> [1,3,4,5,2,6,7]
	  
	  2. 已经存在的歌曲在插入到播放列表位置的后面
	  currentIndex:0	fdIndex:5
	  [1,2,3,4,5,6,7] -----> [1,6,2,3,4,5,6,7]  ------> [1,6,2,3,4,5,7]
	  */
	  if(fdIndex > -1){
		if(currentIndex > fdIndex){
			playList.splice(fdIndex,1);
			currentIndex--;
		}else{
			playList.splice(fdIndex+1,1);
		}
	  }
	  
	  // 当前播放的歌曲在顺序列表的位置+1,表示点击的歌曲要插入到播放列表里的位置.
	  let currentSIndex = findIndex(sequenceList,currentSong) + 1;
	  // 点击的歌曲是否已经存在于sequenceList
	  let fdSIndex = findIndex(sequenceList,song);
	  sequenceList.splice(currentSIndex,0,song);
	  
	  if(fdSIndex > -1){
		  if(currentSIndex > fdSIndex){
			  sequenceList.splice(fdSIndex,1);
		  }else{
			  sequenceList.splice(fdSIndex+1,1);
		  }
	  }
	  commit('SET_PLAY_LIST',playList);
	  commit('SET_SEQUENCE_LIST',sequenceList);
	  commit('SET_CURRENT_INDEX',currentIndex);
	  commit('SET_PLAYING',true);
	  commit('SET_FULL_SCREEN',true)
   },
   removeSong({commit,state},song){
	   let sequencelist = [...state.sequenceList];
	   let playlist = [...state.playList];
	   let currentIndex = state.currentIndex;
	   let pIndex = findIndex(playlist,song);
	   playlist.splice(pIndex,1);
	   let sIndex = findIndex(sequencelist,song);
	   sequencelist.splice(sIndex,1);
	   if(currentIndex > pIndex || currentIndex === playlist.length){
		   currentIndex--;
	   }
	   commit('SET_PLAY_LIST',playlist);
	   commit('SET_SEQUENCE_LIST',sequencelist);
	   commit('SET_CURRENT_INDEX',currentIndex);
	   if(!playlist.length){
		   commit('SET_PLAYING',false);
	   }
   },
   clearPlayList({commit,state}){
		commit('SET_PLAY_LIST',[]);
		commit('SET_SEQUENCE_LIST',[]);
		commit('SET_CURRENT_INDEX',-1);
		commit('SET_PLAYING',false);
   },
   savePlayHistory({commit,state},song){
	   commit('SET_PLAY_HISTORY',savePlayHistory(song));
   },
   saveSearchHistory({commit,state},song){
	   commit('SET_SEARCH_HISTORY',saveSearchHistory(song));
   },
   /* 清除搜索历史,需要清空缓存里的搜索历史,并将search_history设置为空数组*/
   clearSearchHistory({commit,state}){
	   commit('SET_SEARCH_HISTORY',clearSearchHistory())
   },
   clearPlayHistory({commit,state}){
	   commit('SET_PLAY_HISTORY',clearPlayHistory());
   },
   addSong({commit,state},song){
   		let playlist = [...state.playList];
   		let sequencelist = [...state.sequenceList];
   		playlist.push(song);
   		sequencelist.push(song);
   		commit('SET_PLAY_LIST',playlist);
   		commit('SET_SEQUENCE_LIST',sequencelist);
   },
   saveFavoriteList({commit},song){
		commit('SET_FAVORITE_LIST',saveFavoriteList(song))
   },
   deleteFavoriteList({commit},song){
   		commit('SET_FAVORITE_LIST',deleteFavoriteList(song))
   }
} 
export default actions;