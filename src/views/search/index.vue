<template>
	<div class="search-wrapper">
		<SearchBox ref='searchBox' @query='handleSearch'/>
		<div class="hot-search" v-show='!query'>
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
		<div class="result-wrapper" v-show='query'>
			<Suggest :query='query'/>
		</div>
	</div>
</template>

<script>
	import SearchBox from '@/base/search-box'
	import {ERR_OK} from '@/common/api/config'
	import Suggest from '@/components/suggest'
	import Scroll from '@/base/scroll'
	import {getHotKey} from '@/common/api/search'
	
	export default{
		name:'search',
		data() {
			return {
				hotKey:[],
				query:'',
			}
		},
		created(){
			this._getHotKey()
		},
		methods:{
			_getHotKey(){
				getHotKey().then(res => {
					if(res.code === ERR_OK){
						this.hotKey = res.hotkey.data.vec_hotkey
					}
				})
			},
			handleAddQuery(query){
				this.$refs.searchBox.setQuery(query);
			},
			handleSearch(query){
				this.query = query;
			}
		},
		components:{SearchBox,Suggest,Scroll}
	}
</script>

<style lang='scss' scoped>
	.search-wrapper{
		position:fixed;
		top:78px;
		bottom:45px;
		left:0;
		right:0;
	}
	.wrapper{
		overflow:auto;
	}
	.hot-search{
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
