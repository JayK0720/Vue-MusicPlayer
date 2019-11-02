<template>
	<transition name='slide' appear>
		<MusicList :title='title' :bg-image='bgImage' :songs='songs'/>
	</transition>
</template>

<script>
	import MusicList from '@/components/music-list'
	import {mapGetters} from 'vuex'
	import {getMusicList} from '@/common/api/rank'
	import {ERR_OK} from '@/common/api/config'
	import {createDiscSong} from '@/common/js/song'
	import {getSongUrl} from '@/common/api/singer'
	export default{
		name:'rank-list',
		data(){
			return {
				songs:[],
				num:20
			}
		},
		computed:{
			title(){
				return this.toplist.title
			},
			bgImage(){
				return this.toplist.headPicUrl
			},
			...mapGetters(['toplist'])
		},
		components:{MusicList},
		created(){
			this._getMusicList();
		},
		methods:{
			_getMusicList(){
				getMusicList({topId:this.toplist.topId,num:this.num,period:this.toplist.period}).then(res => {
					if(res.detail.code === ERR_OK){
						this.songs = this._normalizeSong(res.detail.data.songInfoList);
					}
				})
			},
			_normalizeSong(songInfoList,songList){
				const ret = [];
				songInfoList.forEach(musicData => {
					if(musicData.album.mid && musicData.id && musicData.mid){
						getSongUrl(musicData.mid).then(res => {
							if(res.code === ERR_OK){
								const vkey = res.req.data.vkey;
								let url = `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.mid}.m4a?guid=4427256653&${vkey}&uin=8095&fromtag=38`
								const data = {...musicData,url};
								ret.push(createDiscSong(data));
							}
						})
					}
				})
				return ret;
			}
		}
	}
</script>

<style scoped lang='scss'>
	.slide-enter-active,.slide-leave-active{
		transition:all .35s;
	}
	.slide-enter,.slide-leave-to{
		transform:translate3d(100%,0,0);
	}
</style>
