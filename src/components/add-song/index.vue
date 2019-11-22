<template>
	<transition name='slide'>
		<div class="add-song-wrapper" v-show='flag'>
			<div class="header-wrapper">
				<h1 class="title">添加歌曲到列表</h1>
				<p 
					class='close-text'
					@click.stop='handleCloseAddSong'
				>关闭</p>
			</div>
			<SearchBox :placeholder="placeholder" @query="handleSearch"/>
			<Suggest :query="query" :showSinger="false" v-show="query"/>
			<div class="history-wrapper" v-show="!query">
				<div class="tab-wrapper">
					<div class="tab-item" :class="{active:isActive}">最近播放</div>
					<div class="tab-item" :class="{active:!isActive}">搜索历史</div>
				</div>
				<div class="playlist">
					<ul>
						<li></li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import SearchBox from '@/base/search-box';
	import Suggest from '@/components/suggest'
	export default{
		name:'add-song',
		data(){
			return{
				flag:false,
				placeholder:'搜索歌曲',
				query:'',
				isActive:true,
			}
		},
		components:{SearchBox,Suggest},
		methods:{
			show(){
				this.flag = true;
			},
			hide(){
				this.flag = false;
			},
			handleCloseAddSong(){
				this.hide();
			},
			handleSearch(query){
				this.query = query;
			}
		}
	}
</script>

<style scoped lang='scss'>
	.add-song-wrapper{
		display:flex;
		flex-direction:column;
		position:fixed;
		width:100%;
		left:0;
		top:0;
		bottom:0;
		background-color:#f1f1f1;
	}
	.slide-enter-active,.slide-leave-active{
		transition:all .3s;
	}
	.slide-enter,.slide-leave-to{
		transform:translate3d(100%,0,0);
	}
	.header-wrapper{
		position:relative;
		width:100%;
		height:40px;
		line-height:40px;
		text-align:center;
		color:#212121;
		.close-text{
			position:absolute;
			line-height:14px;
			font-size:14px;
			right:10px;
			top:13px;
			color:#333;
		}
	}
	.history-wrapper{
		display:flex;
		flex:1;
		width:100%;
		background-color:#f6f6f6;
		.tab-wrapper{
			margin-top:20px;
			display:flex;
			justify-content:center;
			width:100%;
			height:30px;
			border-radius:8px;
		}
		.tab-item{
			width:90px;
			height:30px;
			font-size:14px;
			line-height:30px;
			text-align:center;
			color:#212121;
			background-color:#fff;
			&:first-child{
				border-radius:5px 0 0 5px;
			}
			&:last-child{
				border-radius:0 5px 5px 0;
			}
			&.active{
				background-color:#00ffb8;
				color:#fff;
			}
		}
	}
</style>
