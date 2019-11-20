<template>
	<transition name='slide'>
		<div class="play-list-wrapper" v-show='flag' @click.stop>
			<div class="play-list">
				<h1 class="title">
					<div class="play-mode" @click='changeMode'>
						<i v-show='this.mode === 2' class="iconfont mode-icon">&#xe612;</i>
						<i v-show='this.mode === 0' class="iconfont mode-icon">&#xe674;</i>
						<i v-show='this.mode === 1' class="iconfont mode-icon">&#xe622;</i>
						<p class="mode-text">
							<span>{{modeText}}</span>
							<span v-show='this.mode!==1'> ({{this.playListLength}}首)</span>
						</p>
					</div>
					<span class="delete-btn" @click.stop='handleDeletePlayList'>
						<i class="iconfont delete-icon">&#xe608;</i>
					</span>
				</h1>
				<Scroll class='list-wrapper' ref='scroll'>
					<ul>
						<li 
							class='list-item'
							v-for='(item,index) in sequenceList'
							:key='index'
							:class='getCurrentSong(item)'
							@click.stop='handlePlaySong(item,index)'
							ref='listItem'
						>
							<p class='song-info'>
								<span class='songname'>{{item.songname}}</span>
								<span class='singer'> - {{item.singer}}</span>
							</p>
							<span class="remove-icon" @click.stop='handleRemove(item,index)'>
								<i class="iconfont">&#xe607;</i>
							</span>
						</li>
						<li class='add-song' @click.stop='handleAddSong'>
							<i class="iconfont add-icon">&#xe66b;</i>
							<span>添加歌曲到播放队列</span>
						</li>
					</ul>
				</Scroll>
				<div class="operate" @click='handleClosePlayList'>
					关闭
				</div>
			</div>
			<Confirm ref='confirm' text='清空当前播放队列' @confirm='handleConfirm'/>
			<AddSong ref='addSong'/>
		</div>
	</transition>
</template>

<script>
	import {mapGetters,mapActions,mapMutations} from 'vuex';
	import Scroll from '@/base/scroll'
	import Confirm from '@/base/confirm'
	import {playMode} from '@/common/js/config'
	import {shuffle} from '@/common/js/util'
	import AddSong from '@/components/add-song'
	export default{
		name:'play-list',
		data() {
			return {
				flag:false,
			}
		},
		computed:{
			...mapGetters(['sequenceList','currentSong','playListLength','mode','playList']),
			modeText(){
				if(this.mode === playMode.sequence){
					return '顺序播放'
				}else if(this.mode == playMode.random){
					return '随机播放'
				}else{
					return '单曲循环'
				}
			}
		},
		components:{Scroll,Confirm,AddSong},
		methods:{
			...mapActions(['selectPlay','removeSong','clearPlayList']),
			...mapMutations({
				setPlayMode:'SET_MODE',
				setPlayList:'SET_PLAY_LIST',
				setCurrentIndex:'SET_CURRENT_INDEX'
			}),
			handleAddSong(){
				this.$refs.addSong.show();
			},
			changeMode(){
				let mode = (this.mode+1) % 3;	// 点击切换播放模式
				this.setPlayMode(mode);
				let list = [];
				if(mode === playMode.random){
					list = shuffle(this.playList);
				}else{
					list = this.sequenceList;
				}
				this.resertIndex(list);
				this.setPlayList(list)
			},
			resertIndex(arr){
				const index = arr.findIndex((item) => {
					return this.currentSong.songmid === item.songmid
				})
				this.setCurrentIndex(index);
			},
			show(){
				this.flag = true;
				this.$nextTick(() => {
					this.scrollToCurrentSong(this.currentSong);
				})
			},
			hide(){
				this.flag = false;
			},
			handleClosePlayList(){
				this.flag = false;
				this.$emit('close');
			},
			getCurrentSong(song){
				if(song.songmid === this.currentSong.songmid){
					return 'current'
				}else{
					return ''
				}
			},
			handlePlaySong(song,index){
				this.selectPlay({list:this.sequenceList,index,song});
			},
			scrollToCurrentSong(song){
				let index = this.sequenceList.findIndex(item => {
					return item.songmid === song.songmid;
				})
				this.$refs.scroll.scrollToElement(this.$refs.listItem[index],200);
			},
			handleRemove(song,index){
				if(this.playListLength === 1){
					this.$refs.confirm.show();
					return;
				}
				this.removeSong(song);
			},
			handleDeletePlayList(){
				this.$refs.confirm.show();
			},
			handleConfirm(){
				this.clearPlayList();
				this.hide();
			}
		}
	}
</script>

<style scoped lang='scss'>
	@import '@/common/scss/mixin.scss';
	.play-list-wrapper{
		position:fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		z-index:300;
		&.slide-enter-active,&.slide-leave-active{
			transition:opacity .3s;
			.play-list{
				transition:all .35s;
			}
		}
		&.slide-enter,&.slide-leave-to{
			opacity:0;
			.play-list{
				transform:translate3d(0,100%,0);
			}
		}
	}
	.play-list{
		position:absolute;
		bottom:0;
		left:0;
		width:100%;
		height:507px;
		color:#f9f9f9;
		background-color:#2a2f34;
		.title{
			display:flex;
			height:54px;
			padding:0 16px;
			justify-content:space-between;
			align-items:center;
			font-size:16px;
			font-weight:bold;
			@include border-bottom-1px(#383e41);
		}
		.mode-text{
			display:inline-block;
		}
		.mode-icon,.delete-icon{
			color:#7f8083;
		}
		.mode-icon{
			margin-right:10px;
		}
		.list-wrapper{
			width:100%;
			height:397px;
			@include border-bottom-1px(#383e41);
			overflow:auto;
			.list-item{
				display:flex;
				margin-left:16px;
				padding-right:16px;
				height:45px;
				justify-content:space-between;
				align-items:center;
				@include border-bottom-1px(#383e41);
				.songname{
					font-size:14px;
				}
				.singer{
					font-size:12px;
				}
				&.current{
					.songname{
						color:#27fdb9;
					}
					.singer{
						color:#218c6d;
					}
				}
			}
			.song-info{
				min-width:0;
				flex:1;
				@include text-ellipsis;
			}
			.remove-icon{
				flex:0 0 14px;
				font-size:14px;
				color:#76777a;
			}
			.add-song{
				margin:15px auto 0;
				width:170px;
				height:30px;
				line-height:30px;
				font-size:12px;
				text-align:center;
				border:1px solid #7f8083;
				border-radius:15px;
				.add-icon{
					font-size:12px;
					padding:0 5px;
				}
			}
		}
		.operate{
			height:54px;
			text-align:center;
			line-height:54px;
			color:#fff;
			font-size:14px;
			background-color:#1f2126;
		}
	}
</style>
