<template>
	<transition name='slider' appear>
		<MusicList :title='title' :bg-image='bgImage' :songs='songsList'/>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSongs,getSongUrl} from '@/common/api/singer' 
	import {ERR_OK} from '@/common/api/config'
	import {createSong} from '@/common/js/song'
	import MusicList from '@/components/music-list'
	
	export default{
		name:'singer-detail',
		data() {
			return {
				songsList:[]
			}
		},
		components:{MusicList},
		computed:{
			title(){
				return this.singer.name;
			},
			bgImage(){
				return this.singer.avatar;
			},
			...mapGetters(['singer'])
		},
		created(){
			const {singerMid} = this.singer;
			this._getSongs(singerMid);
		},
		methods:{
			// 获取当前当前歌手的歌曲列表
			_getSongs(singerMid){
				getSongs(singerMid).then(res => {
					if(res.code === ERR_OK){
						this.songsList = this._normalizeSong(res.data.list);
					}
				})
			},
			_normalizeSong(list){
				let ret = [];
				list.forEach(({musicData}) => {
					if(musicData.songid && musicData.albummid && musicData.songmid){
						getSongUrl(musicData.songmid).then(res => {
							if(res.code === ERR_OK){
								let vkey = res.req.data.vkey;
								let url = `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=4427256653&${vkey}&uin=8095&fromtag=38`
								const data = Object.assign({},musicData,{
									url
								})
								ret.push(createSong(data))
							}
						})
					}
				})
				return ret;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.slider-enter-active,.slider-leave-active{
		transition:all .4s;
	}
	.slider-enter,.slider-leave-to{
		transform:translate3d(100%,0,0);
	}
</style>
