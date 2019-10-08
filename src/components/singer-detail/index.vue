<template>
	<transition name='slider' appear>
		<div class="singer-detail">
			singer-detail
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSongs} from '@/common/api/singer' 
	import {ERR_OK} from '@/common/api/config'
	import {createSong} from '@/common/js/song'
	export default{
		name:'singer-detail',
		data() {
			return {
				songsList:[]
			}
		},
		computed:{
			...mapGetters(['singer'])
		},
		created(){
			const {singerMid} = this.singer;
			this._getSongs(singerMid);
		},
		methods:{
			_getSongs(singerMid){
				getSongs(singerMid).then(res => {
					if(res.code === ERR_OK){
						console.log(res.data.list);
						this.songsList = this._normalizeSong(res.data.list);
						console.log(this.songsList);
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
