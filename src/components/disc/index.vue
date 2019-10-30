<template>
	<transition name='slide' appear>
		<MusicList :title='title' :bg-image='bgImage'/>
	</transition>
</template>

<script>
	import MusicList from '@/components/music-list'
	import {mapGetters} from 'vuex'
	import {getSongList} from '@/common/api/recommend'
	import {ERR_OK} from '@/common/api/config'
	import {createDiscSong} from '@/common/js/song.js'
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
						console.log(res.cdlist[0].songlist)
						this.songList = this._normalizeSong(res.cdlist[0].songlist);
						console.log(this.songList);
					}
				})
			},
			_normalizeSong(list){
				const ret = []
				list.forEach((musicData) => {
					if(musicData.mid && musicData.album.mid){
						ret.push(createDiscSong(musicData))
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
