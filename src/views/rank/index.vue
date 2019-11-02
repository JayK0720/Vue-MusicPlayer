<template>
	<div class="rank-wrapper">
		<Scroll :data='topList'>
			<div>
				<section v-for='(group,index) in topList' :key='index'>
					<h1 class="group-title">{{group.groupName}}</h1>
					<div 
						class='rank-card'
						v-for='(item,index) in group.toplist' 
						:key='index'
						@click='handleTopList(item)'
					>
						<div class="left">
							<h2 class="rank-title">{{item.title}}</h2>
							<ul class='song-list'>
								<li 
									v-for='(song,index) in item.song' 
									:key='index' 
									class='song-item'
								>	
									<span class='song-index'>{{index+1}}. </span>
									<span class="song-name">{{song.title}}</span>
									<span class="singer"> - {{song.singerName}}</span>
								</li>
							</ul>
						</div>
						<div class="right">
							<img 
								v-lazy="item.headPicUrl" 
								:alt="item.AdShareContent" 
								width='108' 
								height='108' 
								class='rank-icon'
							>
							<p class="update-tips">{{item.updateTips}}</p>
							<div class="listen-number">
								<i class="iconfont">&#xe631;</i>
								<span class='text'>{{item.listenNum | formatNumber }}万</span>
							</div>
							<div class="play-btn">
								<i class="iconfont play-icon">&#xe652;</i>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Scroll>
		<Loading v-show='!topList.length'/>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getTopList} from '@/common/api/rank'
	import {ERR_OK} from '@/common/api/config'
	import Scroll from '@/base/scroll'
	import Loading from '@/base/loading'
	import {mapMutations} from 'vuex'
	export default{
		name:'rank',
		data() {
			return {
				topList:[]
			}
		},
		components:{Scroll,Loading},
		created() {
			this._getTopList()
		},
		filters:{
			formatNumber(value){
				if(value % 10000 !== 0){
					return (value/10000).toFixed(1)
				} else{
					return value / 10000
				}
			}
		},
		methods:{
			...mapMutations({
				'setTopList':'SET_TOP_LIST'
			}),
			_getTopList(){
				getTopList().then(res => {
					if(res.topList.code === ERR_OK){
						this.topList = res.topList.data.group;
					}
				})
			},
			handleTopList(data){
				console.log(data);
				this.$router.push(`/rank/toplist/${data.topId}`);
				this.setTopList(data);
			}
		},
		
	}
</script>

<style scoped lang='scss'>
	.rank-wrapper{
		position:fixed;
		padding:0 14px;
		left:0;
		right:0;
		top:78px;
		bottom:45px;
		background-color:#f6f6f6;
		color:#232323;
	}
	.wrapper{
		width:100%;
		height:100%;
		overflow:auto;
	}
	.group-title{
		font-size:16px;
		font-weight:bold;
		line-height:45px;
	}
	.rank-card{
		margin-bottom:10px;
		display:flex;
		justify-content:space-between;
		height:108px;
		background-color:#fff;
		border-radius:8px;
		overflow:hidden;
		.left{
			padding:0 12px;
			flex:1;
			min-width:0;
		}
		.song-item{
			width:100%;
			white-space:nowrap;
			text-overflow:ellipsis;
			overflow:hidden;
		}
		.right{
			position:relative;
			flex:0 0 108px;
			width:108px;
			height:108px;
			font-size:10px;
			color:#fff;
			.update-tips,.listen-number,.play-btn{
				position:absolute;
			}
			.update-tips{
				top:8px;
				right:8px;
			}
			.listen-number{
				bottom:10px;
				left:6px;
				.text{
					padding-left:4px;
				}
			}
			.play-btn{
				right:8px;
				bottom:8px;
				width:20px;
				height:20px;
				.play-icon{
					font-size:20px;
				}
			}
		}
		.rank-title{
			padding-top:13px;
			font-size:14px;
			font-weight:bold;
		}
		.song-name,.singer,.song-index{
			font-size:12px;
		}
		.song-index{
			color:rgba(26,26,26,1);
		}
		.song-name{
			color:rgba(26,26,26,1);
		}
		.singer{
			color:rgba(26,26,26,.5);
		}
	}
</style>
