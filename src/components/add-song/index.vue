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
			<Suggest
				:query="query"
				:showSinger="false" v-show="query"
				:addSong="true"
				@addSong="handleAddSong"
			/>
			<div class="history-wrapper" v-show="!query">
				<Switches
					:switches="switches"
					:currentIndex="currentIndex"
					@switch="switchItem"
				/>
				<Scroll
					v-if="currentIndex === 0" :data="playHistory"
					class="play-history-wrapper"
					ref="playList"
				>
					<div class="play-history-list">
						<SongList
							@selectItem="selectSong"
							:songs="playHistory"
						/>
					</div>
				</Scroll>
				<Scroll
					v-if="currentIndex === 1"
					:data="searchHistory"
					class="search-history-wrapper"
					ref="searchList"
				>
					<ul class="search-history-list">
						<li
							v-for="(item,index) in searchHistory"
							class="search-item"
							:key="index"
							@click="handleDeleteSearchItem(index)"
						>
							<span>{{item}}</span>
							<i class="iconfont delete-icon">&#xe607;</i>
						</li>
					</ul>
				</Scroll>
			</div>
			<Tip :delay="1500" :text="text" ref="tip"/>
			<Confirm ref="confirm" text="是否清空搜索历史" @confirm="handleConfirm"/>
		</div>
	</transition>
</template>

<script>
	import SearchBox from '@/base/search-box';
	import Suggest from '@/components/suggest'
	import Switches from '@/base/switches'
	import Scroll from '@/base/scroll'
	import SongList from '@/base/song-list'
	import {mapActions,mapGetters,mapMutations} from 'vuex'
	import Tip from '@/base/tip'
	import Confirm from '@/base/confirm'
	import {createSong} from '@/common/js/song'
	export default{
		name:'add-song',
		data(){
			return{
				flag:false,
				placeholder:'搜索歌曲',
				query:'',
				switches:[
					{name:'最近播放'},
					{name:'搜索历史'}
				],
				currentIndex:0,
				text:'一首已添加到播放队列'
			}
		},
		components:{
			SearchBox,
			Suggest,
			Switches,
			SongList,
			Scroll,
			Tip,
			Confirm
		},
		computed:{
			...mapGetters(['playHistory','searchHistory'])
		},
		methods:{
			...mapActions(['insertSong','clearSearchHistory','addSong']),
			...mapMutations({
				deleteSearchHistory:'DELETE_SEARCH_HISTORY'
			}),
			show(){
				this.flag = true;
				setTimeout(() => {
					if(this.currentIndex === 0){
						this.$refs.playList.refresh();
					}else{
						this.$refs.searchList.refresh();
					}
				},20);
			},
			hide(){
				this.flag = false;
			},
			handleCloseAddSong(){
				this.hide();
			},
			handleSearch(query){
				this.query = query;
			},
			switchItem(index){
				this.currentIndex = index;
			},
			selectSong(song,index){
				if(index !== 0){
					this.insertSong(song);
				}
			},
			handleDeleteSearchItem(index){
				if(this.searchHistory.length === 1){
					this.$refs.confirm.show();
					return;
				}
				this.deleteSearchHistory(index);
			},
			handleConfirm(){
				this.clearSearchHistory();
			},
			handleAddSong(song){
				this.addSong(song);
				this.$nextTick(() => {
					this.$refs.tip.show();
				})
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
		padding:0 16px;
		display:flex;
		flex-direction:column;
		flex:1;
		min-height:0;
		background-color:#f6f6f6;
		.play-history-wrapper,.search-history-wrapper{
			height:100%;
			overflow:auto;
		}
		.search-history-wrapper{
			.search-item{
				display:flex;
				justify-content:space-between;
				color:#212121;
				font-size:14px;
				height:36px;
				line-height:36px;
			}
			.text{
				flex:1;
				min-width:0;
				width:100%;
				white-space:nowrap;
				text-overflow:ellipsis;
				overflow:hidden;
			}
			.delete-icon{
				flex:0 0 20px;
				font-size:14px;
				text-align:center;
				color:#b5b0b9;
			}
		}
	}
</style>
