<template>
	<div class="mini-player" @touchstart.stop='handleOpenFullScreen'>
		<div class="music-icon">
			<img v-bind:src="currentSong.image" alt="" width='45' height='45'>
		</div>
		<div class="text" :class='{active:currentSong.singer}'>
			<span class="songname">{{currentSong.songname}}</span> 
			<span class="singer" v-show='currentSong.singer'>- {{currentSong.singer}}</span>
		</div>
		<div class="play-icon control" :class='{active:currentSong.singer}'>
			<i class="iconfont">&#xe652;</i>
		</div>
		<div class="list-icon control" :class='{active:currentSong.singer}'>
			<i class="iconfont">&#xe677;</i>
		</div>
	</div>
</template>

<script>
	import {mapMutations,mapGetters} from 'vuex'
	export default{
		name:'mini-player',
		computed:{
			...mapGetters(['currentSong'])
		},
		methods:{
			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN'
			}),
			handleOpenFullScreen(){
				this.setFullScreen(true);
			}
		}
	}
</script>

<style scoped lang='scss'>
	.mini-player{
		display:flex;
		position:fixed;
		padding:0 16px;
		bottom:0;
		left:0;
		right:0;
		height:45px;
		align-items:center;
		justify-content:space-between;
		background-color:#ffffff;
		.music-icon{
			transform:translateY(-5px);
			margin-right:10px;
			width:45px;
			height:45px;
			background-color:#fff;
			border-radius:50%;
			overflow:hidden;
			img{
				border-radius:50%;
			}
		}
		.text{
			flex:1;
			font-size:12px;
			color:#959abe;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			&.active{
				color:#232323;
			}
		}
		.play-icon{
			margin-right:18px;
			flex:0 0 28px;
			width:28px;
			height:28px;
			i.iconfont{
				font-size:28px;
			}
		}
		.list-icon{
			flex:0 0 25px;
			width:25px;
			height:25px;
			i.iconfont{
				font-size:25px;
			}
		}
		.control{
			.iconfont{
				color:#959abe;
			}
			&.active{
				.iconfont{
					color:#1fdea6;
				}
			}
		}
	}
</style>
