<template>
	<div class="search-box">
		<div class="search-icon">
			<i class="iconfont">&#xe65e;</i>
		</div>
		<input type="text" :placeholder='placeholder' class='search' v-model='query'>
		<div class="delete-icon" @click='handleClear'>
			<i class="iconfont" v-show='query'>&#xe607;</i>
		</div>
	</div>
</template>

<script>
	import {debounce} from '@/common/js/util'
	export default{
		name:'search-box',
		data(){
			return {
				query:''
			}
		},
		props:{
			placeholder:{
				type:String,
				default:'搜索音乐、视频、歌单、歌手...'
			}
		},
		created(){
			/*
			监听搜索词的变化,派发一个query事件
			*/
			this.$watch('query',debounce((value)=>{
				this.$emit('query',value);
			},200))
		},
		methods:{
			handleClear(){
				this.query = ''
			},
			/*将文本框内容设置为指定值,父组件会调用这个方法然后传递一个参数*/
			setQuery(text){
				this.query = text
			}
		}
	}
</script>

<style lang='scss' scoped>
	.search-box{
		margin:0 16px;
		display:flex;
		height:32px;
		border-radius:16px;
		background-color:#fff;
		justify-content:space-between;
		align-items:center;
		.search{
			border:none;
			outline:none;
			height:100%;
			width:100%;
			flex:1;
			caret-color:#30f5ba;
		}
		.search-icon,.delete-icon{
			flex:0 0 36px;
			width:36px;
			text-align:center;
		}
	}
</style>
