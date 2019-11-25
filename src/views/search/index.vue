<template>
	<div class="search-wrapper">
		<SearchBox ref='searchBox' @query='handleSearch'/>
		<!-- scroll 组件监听两组数据,定义一个计算属性，将两组数据合并后再传递给scroll组件-->
		<Scroll :data='shortcut' v-show='!query' class='scroll-wrapper'>
			<section>
				<div class="search-history-wrapper" v-show='searchHistory.length'>
					<h1 class="search-title">
						<span>搜索历史</span>
						<span class='delete-btn' @click='handleDeleteSerchList'>
							<i class="iconfont delete-icon">&#xe608;</i>
						</span>
					</h1>
					<ul class="search-list">
						<li 
							class='search-item'
							v-for="(item,index) in searchHistory"
							:key='index'
							@click='handleSelectSearchItem(item)'
						>{{item}}</li>
					</ul>
				</div>
				<div class="hot-wrapper" >
					<h1 class="hot-title">热门搜索</h1>
					<ul class="hot-list">
						<li 
							v-for='(item,index) in hotKey' 
							:key='index' 
							class='hot-item'
							@click='handleAddQuery(item.title)'
						>
							<div 
								class="index" :class='{active:index < 3}'
							>{{index+1}}</div>
							<div class="text">
								<p class="title">
									<span>{{item.title}}</span>
									<span class="tag" v-if='item.source === 1'>热</span>
								</p>
								<p class="description">{{item.description}}</p>
							</div>
							<div class="score">{{item.score}}</div>
						</li>
					</ul>
				</div>
			</section>
		</Scroll>
		<Suggest 
			:query='query' 
			v-show='query'
			@select='handlePlayHistory'
			:addSong="false"
		/>
		<Confirm 
			:text='text' 
			:cancelText='cancelText' 
			:confirmText='confirmText'
			ref='confirm'
			@confirm='handleConfirm'
		/>
		<router-view></router-view>
	</div>
</template>

<script>
	import SearchBox from '@/base/search-box'
	import {ERR_OK} from '@/common/api/config'
	import Suggest from '@/components/suggest'
	import Scroll from '@/base/scroll'
	import {getHotKey} from '@/common/api/search'
	import {mapActions,mapGetters} from 'vuex'
	import {clearSearchHistory} from '@/common/js/cache'
	import Confirm from '@/base/confirm'

	export default{
		name:'search',
		data() {
			return {
				hotKey:[],
				query:'',
				text:'是否清空所有搜索历史',
				cancelText:'取消',
				confirmText:'清空',
			}
		},
		created(){
			this._getHotKey()
		},
		computed:{
			...mapGetters(['searchHistory']),
			shortcut(){
				return this.hotKey.concat(this.searchHistory)
			}
		},
		methods:{
			...mapActions(['savePlayHistory','saveSearchHistory','clearSearchHistory']),
			handleSelectSearchItem(item){
				this.$refs.searchBox.setQuery(item);
			},
			/*
			点击清空搜索列表时，显示弹窗
			*/
			handleDeleteSerchList(){
				this.$refs.confirm.show();
			},
			/*当点击的是确认清除的按钮,则清空,否则什么都不做*/
			handleConfirm(){
				this.clearSearchHistory();
			},
			_getHotKey(){
				getHotKey().then(res => {
					if(res.code === ERR_OK){
						this.hotKey = res.hotkey.data.vec_hotkey
					}
				})
			},
			/*点击热门关键词的时候 调用子组件的方法,将点击的关键字 添加设置为 input 的搜索内容*/
			handleAddQuery(query){
				this.$refs.searchBox.setQuery(query);
			},
			/*子组件派发出的事件 获取到 搜索框的关键词,然后 将获取到的文本 传递给子组件 suggest*/
			handleSearch(query){
				this.query = query;
				if(query !== ''){
					this.saveSearchHistory(query);
				}
			},
			/*监听子组件点击搜索列表的歌曲*/
			handlePlayHistory(song){
				console.log(song);
				this.savePlayHistory(song);
			}
		},
		components:{SearchBox,Suggest,Scroll,Confirm}
	}
</script>

<style lang='scss' scoped>
	.search-wrapper{
		display:flex;
		flex-direction:column;
		position:fixed;
		width:100%;
		top:78px;
		bottom:45px;
		z-index:200;
		background-color:#f9f9f9;
	}
	.scroll-wrapper{
		flex:1;
		overflow:auto;
	}
	.search-history-wrapper{
		.search-title{
			display:flex;
			justify-content:space-between;
			align-items:center;
			padding:16px;
			font-size:16px;
			line-height:16px;
			span:nth-child(1){
				font-weight:bold;
			}
		}
	}
	.search-list{
		display:flex;
		padding:0 16px;
		flex-wrap:wrap;
		.search-item{
			margin:0 10px 10px 0;
			font-size:14px;
			line-height:18px;
			padding:4px 6px;
			background-color:#fff;
			border-radius:9px;
			color:rgba(26,26,26,1);
		}
	}
	.hot-wrapper{
		.hot-title{
			padding:20px 0 0 16px;
			font-size:16px;
			line-height:16px;
			font-weight:bold;
		}
		.hot-list{
			padding:0 16px;
		}
		.hot-item{
			margin-top:20px;
			display:flex;
			height:35px;
			width:100%;
			justify-content:space-between;
			align-items:center;
			font-size:14px;
			color:#000;
			.text{
				flex:1;
			}
			.title{
				height:15px;
				line-height:15px;
			}
			.tag{
				display:inline-block;
				margin-left:6px;
				width:15px;
				height:15px;
				background-color:#f66;
				text-align:center;
				line-height:14px;
				font-size:10px;
				color:#fff;
				border-radius:4px;
			}
			.description{
				margin-top:8px;
				height:12px;
				line-height:12px;
				font-size:10px;
				color:rgba(26,26,26,.6);
			}
			.index{
				flex:0 0 30px;
				width:30px;
				&.active{
					color:#f66;
				}
			}
			.score{
				flex:0 0 50px;
				text-align:right;
				font-size:10px;
				color:rgba(26,26,26,.6);
			}
		}
	}
	.result-wrapper{
		padding-top:10px;
		position:fixed;
		width:100%;
		top:110px;
		bottom:45px;
	}
</style>
