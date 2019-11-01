<template>
	<Scroll :data='topList'>
		<div class="rank-wrapper">
			<section v-for='(group,index) in topList' :key='index'>
				<h1 class="group-title">{{group.groupName}}</h1>
				<div 
					class='rank-card'
					v-for='(item,index) in group.toplist' 
					:key='index'
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
							:src="item.headPicUrl" 
							:alt="item.AdShareContent" 
							width='108' 
							height='108' 
							class='rank-icon'
						>
						<p class="update-tips">{{item.updateTips}}</p>
						<div class="listen-number">
							<i class="iconfont">&#xe652;</i>
							<span class='text'>{{item.listenNum / 10000}}万</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	</Scroll>
</template>

<script>
	import {getTopList} from '@/common/api/rank'
	import {ERR_OK} from '@/common/api/config'
	import Scroll from '@/base/scroll'
	export default{
		name:'rank',
		data() {
			return {
				topList:[]
			}
		},
		components:{Scroll},
		created() {
			this._getTopList()
		},
		methods:{
			_getTopList(){
				getTopList().then(res => {
					console.log(res);
					if(res.topList.code === ERR_OK){
						this.topList = res.topList.data.group;
						console.log(this.topList);
					}
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
	.wrapper{
		position:fixed;
		padding:0 14px;
		left:0;
		right:0;
		top:78px;
		bottom:45px;
		background-color:#f6f6f6;
		color:#232323;
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
			.update-tips,.listen-number{
				position:absolute;
			}
			.update-tips{
				top:8px;
				right:8px;
			}
			.listen-number{
				bottom:0;
				right:4px;
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
