<template>
	<transition name='slider' appear>
		<div class="singer-detail">
			<MusicList :title='title' :bg-image='bgImage' :songs='songsList'/>
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSongs} from '@/common/api/singer' 
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
			console.log(this.singer);
			const {singerMid} = this.singer;
			this._getSongs(singerMid);
		},
		methods:{
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
					if(musicData.songid && musicData.albummid){
						ret.push( createSong(musicData) );
					}
				})
				return ret;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.singer-detail{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		background-color:#fafafa;
		z-index:100;
	}
	.slider-enter-active,.slider-leave-active{
		transition:all .4s;
	}
	.slider-enter,.slider-leave-to{
		transform:translate3d(100%,0,0);
	}
</style>
