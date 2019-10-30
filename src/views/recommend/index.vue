<template>
	<div class='recommend'>
		<Scroll ref='scroll' class='recommend-content' :data='list'>
			<section>
				<div class="slider-wrapper" v-if='recommends.length'>
					<Slider>
						<div 
							v-for='(item,index) in recommends' :key='index'
						>
							<a v-bind:href='item.linkUrl'>
								<img @load='loadImage' v-bind:src="item.picUrl" alt="">
							</a>
						</div>
					</Slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li 
							v-for='(item,index) in list' 
							:key='index' 
							class='recommend-item'
							@click='handleSelectDisc(item)'
						>
							<div class="icon">
								<img v-lazy="item.imgurl" :alt="item.dissname">
							</div>
							<div class="text">
								<h2 class="name" v-html='item.dissname'></h2>
								<p class="desc" v-html='item.creator.name'></p>
								<p class='listennum'>播放量：{{item.listennum | listen}}万</p>
							</div>
						</li>
					</ul>
				</div>
			</section>
			<Loading v-show='!list.length'/>
		</Scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getRecommend,getDiscList} from '@/common/api/recommend'
	import {ERR_OK} from '@/common/api/config'
	import Slider from '@/base/slider'
	import Scroll from '@/base/scroll'
	import Loading from '@/base/loading'
	import {mapMutations} from 'vuex'
	export default{
		name:'recommend',
		data(){
			return{
				recommends:[],
				list:[],
			}
		},
		components:{Slider,Scroll,Loading},
		created() {
			this._getRecommend();
			this._getDiscList()
		},
		methods:{
			...mapMutations(
				{
					setDisc:'SET_DISC'
				}
			),
			_getRecommend(){
				getRecommend().then(res => {
					if(res.code === ERR_OK){
						this.recommends = res.data.slider;
					}
				})
			},
			_getDiscList(){
				getDiscList().then(res => {
					if(res.code === ERR_OK){
						this.list = res.data.list;
					}
				})
			},
			loadImage(){
				// 如果加载了一张图片的话就重新计算子元素的高度
				if(!this.checkedLoad){
					this.$refs.scroll.refresh();
					this.checkedLoad = true;
				}
			},
			handleSelectDisc(item){
				console.log(item);
				this.setDisc(item);
				this.$router.push(`/recommend/disc/${item.id}`)
			}
		},
		filters:{
			listen(value){
				return (value/10000).toFixed(1);
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import '@/common/scss/mixin.scss';
	.recommend{
		position:fixed;
		width:100%;
		bottom:45px;
		top:78px;
	}
	.recommend-content{
		width:100%;
		height:100%;
		position:relative;
		overflow:hidden;
	}
	.recommend-list{
		padding:0 12px;
		background-color:#fafafa;
		.list-title{
			height:40px;
			text-align:center;
			font-size:14px;
			line-height:40px;
		}
		.recommend-item{
			display:flex;
			width:100%;
			margin-top:12px;
			height:80px;
			align-items:center;
			&:first-child{
				margin-top:0;
			}
		}
		.icon{
			width:80px;
			height:80px;
			margin-right:10px;
			flex-shrink:0;
			img{
				display:block;
				width:100%;
				height:100%;
				border-radius:8px;
			}
		}
		.text{
			flex:1;
			.name{
				font-size:14px;
			}
			.desc,.listennum{
				padding-top:2px;
				color:#8a8a8a;
				font-size:12px;
			}
		}
	}
</style>
