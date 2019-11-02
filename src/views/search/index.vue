<template>
	<div class="search-wrapper">
		<SearchBox/>
		<div class="hot-search">
			<h1 class="hot-title">热门搜索</h1>
			<ul class="hot-list">
				<li v-for='(item,index) in hotKey' :key='index' class='hot-item'>
					<div class="index">{{index+1}}</div>
					<div class="text">
						<p class="title">{{item.title}}</p>
						<p class="description">{{item.description}}</p>
					</div>
					<div class="score">{{item.score}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import SearchBox from '@/base/search-box'
	import {getHotKey} from '@/common/api/search'
	import {ERR_OK} from '@/common/api/config'
	export default{
		name:'search',
		data() {
			return {
				hotKey:[]
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
			}
		},
		components:{SearchBox}
	}
</script>

<style lang='scss' scoped>
	.search-wrapper{
		padding:10px 16px 0 16px;
	}
	.hot-search{
		.hot-title{
			margin-top:23px;
			font-size:16px;
			line-height:16px;
			font-weight:bold;
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
			.description{
				font-size:10px;
				color:rgba(26,26,26,.6);
			}
			.index{
				flex:0 0 30px;
				width:30px;
			}
			.score{
				flex:0 0 50px;
				text-align:right;
				font-size:10px;
			}
		}
	}
</style>
