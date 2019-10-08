<template>
	<Scroll 
		:data='data' 
		ref='scroll'
		:listenScroll='listenScroll'
		:probeType='probeType'
		@scroll='handleScroll'
	>
		<ul class='group-list'>
			<li v-for='(group,index) in data' :key='index' ref='groupListItem'>
				<h2 class='group-title'>{{group.title}}</h2>
				<ul class='singer-list'>
					<li 
						v-for='(item,index) in group.items' 
						:key='index'
						class='singer-item'
						@click='handleSelectSinger(item)'
					>
						<img v-bind:src="item.avatar" v-bind:alt="item.name" width='60' height='60' class='avatar'>
						<span class='name'>{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="singer-index" @touchmove.stop.prevent='handleTouchMove'>
			<ul class='index-list'>
				<li 
					v-for='(item,index) in listIndex' 
					:key='index'
					@touchstart='handleTouchIndex($event,index)'
					v-bind:class='{current:currentIndex === index}'
					class='index-item'
				>{{item}}</li>
			</ul>
		</div>
		<div class="list-fixed" v-show='fixedTitle' ref='fixedTitle'>
			<h2 class="fixed-title">{{fixedTitle}}</h2>
		</div>
		<Loading v-show='!data.length'/>
	</Scroll>
</template>

<script>
	const INDEX_HEIGHT = 20;
	const TITLE_HEIGHT = 42;
	import Scroll from '@/base/scroll'
	import Loading from '@/base/loading'
	export default{
		name:'listview',
		data() {
			return{
				listenScroll:true,
				probeType:3,
				currentIndex:0,
				scrollHeight:[],
				scrollY:-1,
				diffY:0
			}
		},
		components:{Scroll,Loading},
		props:{
			data:{
				type:Array,
				default:function() {
					return []
				}
			}
		},
		computed:{
			listIndex(){
				return this.data.map((item) => {
					return item.title.substring(0,1);
				}) 
			},
			fixedTitle(){
				if(this.scrollY > 0){
					return '';
				}
				if(this.scrollY < 0){
					return this.data.length ? this.data[this.currentIndex].title : '';
				}
			}
		},
		created(){
			this.touch = {},
			this.listHeight = []
		},
		watch:{
			data(){
				this.$nextTick(() => {
					this._calcHeight();
				})
			},
			diffY(value){
				let fixedTop = (value > 0 && value < TITLE_HEIGHT) ? TITLE_HEIGHT - value : 0;
				if(this.fixedTop === value) return;
				this.$refs.fixedTitle.style.transform = `translate3d(0,${-fixedTop}px,0)`;
			}
		},
		methods:{
			handleTouchIndex(event,index){
				this.touch.y1 = event.touches[0].pageY;	// 第一次按下鼠标时的y值
				this.touch.startIndex = index;
				this._scrollToIndex(index);
				this.currentIndex = index;
			},
			handleTouchMove(event){
				this.touch.y2 = event.touches[0].pageY;	// 在手指拖动时获取到的y轴的偏移量，两者的差值为拖动的距离
				const delta = Math.round( (this.touch.y2 - this.touch.y1) / INDEX_HEIGHT);
				let index = this.touch.startIndex + delta;
				this.currentIndex = index;
				this._scrollToIndex(index);
			},
			handleScroll({y}){
				this.scrollY = y;	// 当前滚动的高度
				if(y >= 0) {
					this.currentIndex = 0; 
					return;
				}
				const listHeight = this.listHeight;
				for(let i = 0; i < listHeight.length - 1; i++){
					let y1 = listHeight[i], y2 = listHeight[i+1];
					if( (-y >= y1) && (-y < y2) ){
						this.currentIndex = i;
						this.diffY = y2 + y;
						return;
					}
				}
				if(-y > listHeight[listHeight.length-1]){
					this.currentHeight = listHeight.length - 1;
					return;
				}
			},
			handleSelectSinger(props){
				this.$emit('select',props);
			},
			_scrollToIndex(index){
				const groupListItem = this.$refs.groupListItem[index];
				this.$refs.scroll.scrollToElement(groupListItem,0);
			},
			_calcHeight(){
				let height = 0,listHeight = [],list = this.$refs.groupListItem;
				listHeight.push(height);
				for(let i = 0,len = list.length; i < len; i++){
					height += list[i].clientHeight;
					listHeight.push(height);
				}
				this.listHeight = listHeight;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.group-title,.fixed-title{
		padding-left:16px;
		height:42px;
		line-height:42px;
		background-color:#f9f9f9;
		color:#898989;
		font-size:12px;
	}
	.singer-list{
		padding:0 16px;
	}
	.singer-item{
		display:flex;
		align-items:center;
		height:60px;
		margin-bottom:12px;
		&:last-child{
			margin-bottom:0;
		}
		.avatar{
			margin-right:10px;
			width:60px;
			height:60px;
			display:block;
			border-radius:50%;
		}
		.name{
			font-size:14px;
			color:#1a1a1a;
		}
	}
	.singer-index{
		position:absolute;
		top:50%;
		transform:translateY(-50%);
		right:16px;
		width:24px;
		text-align:center;
		background-color:#fff;
		border-radius:12px;
		z-index:100;
		li{
			line-height:20px;
			font-size:10px;
			color:#8c8c8c;
			&.current{
				color:#22d59c;
			}
		}
	}
	.list-fixed{
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:43px;
	}
</style>
