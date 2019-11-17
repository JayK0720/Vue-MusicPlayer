<template>
	<div 
		class="mini-player" 
		@click.stop='handleOpenFullScreen'
		:class='{active:isActive}'
	>
		<div class="music-icon" :class="iconClass">
			<img v-bind:src="currentSong.image" alt="" width='45' height='45'>
		</div>
		<div class="text" :class='{active:currentSong.singer}'>
			<span class="songname">{{currentSong.songname}}</span> 
			<span class="singer" v-show='currentSong.singer'>- {{currentSong.singer}}</span>
		</div>
		<div 
			class="play-icon control" 
			:class='{active:currentSong.singer}' 
			@click.stop='handleTogglePlaying'
		>
			<template v-if='!playing'>
				<i class="iconfont">&#xe652;</i>
			</template>
			<template v-else>
				<i class="iconfont">&#xe603;</i>
			</template>
		</div>
		<div 
			class="list-icon control" 
			:class='{active:currentSong.singer}'
			@click.stop='handleTogglePlayList'
		>
			<i class="iconfont">&#xe677;</i>
		</div>
		<PlayList ref='playlist' @close='handleClose'/>
	</div>
</template>

<script>
	import {mapMutations,mapGetters} from 'vuex'
	import PlayList from '@/components/play-list'
	export default{
		name:'mini-player',
		data(){
			return{
				isActive:false
			}
		},
		computed:{
			...mapGetters(['currentSong','playing']),
			iconClass(){
				return this.playing ? 'play' : 'pause'
			}
		},
		components:{
			PlayList
		},
		methods:{
			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN',
				setPlayingState:"SET_PLAYING"
			}),
			handleOpenFullScreen(){
				this.setFullScreen(true);
			},
			handleTogglePlaying(){
				if(!this.currentSong.songmid) return;
				this.setPlayingState(!this.playing);
			},
			handleTogglePlayList(){
				if(!this.currentSong.songmid) return;
				this.$refs.playlist.show();
				this.isActive = true;
			},
			handleClose(){
				this.isActive = false;
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
		z-index:100;
		&.active{
			z-index:300;
		}
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
			&.play{
				animation:rotate 20s linear infinite;
				animation-play-state:run;
			}
			&.pause{
				animation:rotate 20s linear infinite;
				animation-play-state:paused;
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
