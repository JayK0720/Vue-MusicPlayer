<template>
	<transition name='slide' appear>
		<MusicList :title='title' :bg-image='bgImage' :songs='songList'/>
	</transition>
</template>

<script>
	import MusicList from '@/components/music-list'
	import {mapGetters} from 'vuex'
	import {getSongList} from '@/common/api/recommend'
	import {ERR_OK} from '@/common/api/config'
	import {createDiscSong} from '@/common/js/song.js'
	import {getSongUrl} from '@/common/api/singer'
	export default{
		name:'disc',
		data(){
			return {
				songList:[]
			}
		},
		computed:{
			title(){
				return this.disc.dissname
			},
			bgImage(){
				return this.disc.imgurl
			},
			...mapGetters(['disc'])
		},
		components:{
			MusicList
		},
		created(){
			this._getSongList();
		},
		methods:{
			_getSongList(){
				getSongList(this.disc.dissid).then(res => {
					if(res.code === ERR_OK){
						this.songList = this._normalizeSong(res.cdlist[0].songlist);
					}
				})
			},
			_normalizeSong(list){
				const ret = []
				list.forEach((musicData) => {
					if(musicData.mid && musicData.album.mid){
						getSongUrl(musicData.mid).then(res => {
							if(res.req.code === ERR_OK){
								let vkey = res.req.data.vkey;
								let url = `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.mid}.m4a?guid=4427256653&${vkey}&uin=8095&fromtag=38`;
								let data = Object.assign({},musicData,{url});
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
