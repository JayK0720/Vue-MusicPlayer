<template>
	<Scroll 
		class="suggest-wrapper" 
		:pullup='pullup' 
		@scrollToEnd='handlePullRefresh'
		:data='result'
		ref='suggest'
	>
		<ul class='suggest-list'>
			<li 
				class="singer-info" 
				v-if='singerInfo.singermid'
				@click='handleSingerDetail'
			>
				<div class="avatar">
					<img :src=" 'https://y.gtimg.cn/music/photo_new/T001R68x68M000'+this.singerInfo.singermid+'.jpg?max_age=2592000' " :alt="singerInfo.singername">
				</div>
				<div class="info">
					<p class="singername">{{singerInfo.singername}}</p>
					<p class="music-number">
						<span>歌曲：{{singerInfo.songnum}}</span>
						<span>专辑：{{singerInfo.albumnum}}</span>
					</p>
				</div>
				<div class='detail-arrow'>
					<i class="iconfont">&#xe721;</i>
				</div>
			</li>
			<li 
				class='suggest-item' 
				v-for='(item,index) in result'
				:key='index'
			>
				<p class="songname">{{item.songname}}</p>
				<p class='song-info'>{{item.singer}}-{{item.albumname}}</p>
			</li>
		</ul>
	</Scroll>
</template>

<script>
	import {search} from '@/common/api/search'
	import {ERR_OK} from '@/common/api/config'
	import {createSong} from '@/common/js/song'
	import {getSongUrl} from '@/common/api/singer'
	import Scroll from '@/base/scroll'
	import {mapMutations} from 'vuex'
	import {Singer} from '@/common/api/singer'
	const perpage = 20;
	export default{
		name:'suggest',
		data(){
			return {
				page:1,
				result:[],
				singerInfo:{},
				pullup:true,
				hasMore:true
			}
		},
		components:{Scroll},
		props:{
			query:{
				type:String,
				default:''
			},
			showSinger:{
				type:Boolean,
				default:true
			}
		},
		watch:{
			query(newQuery){
				if(!newQuery) return
				this.search(newQuery)
			}
		},
		methods:{
			/*
			上拉加载,当滚动到一定的位置加载更多数据,定义一个flag 是否有更多的数据可以获取，默认为true,当所有的数据都获取完毕设为false
			定义一个函数 判断 当前数据是否获取完毕。
			*/
		   ...mapMutations({
			   setSinger:'SET_SINGER'
		   }),
		   refresh(){
			   this.$refs.suggest.refresh()
		   },
			search(){
				if(!this.query) return;
				this.page = 1;
				this.hasMore = true;
				this.$refs.suggest.scrollTo(0, 0);
				search(this.query,this.page,this.showSinger,perpage).then(res => {
					if(res.code === ERR_OK){
						if(res.data.zhida && res.data.zhida.singermid){
							this.singerInfo = res.data.zhida
						}
						if(res.data.song){
							this.result = this._normalizeSong(res.data.song.list);
						}
						this._checkMore(res.data);
					}
				})
			},
			handlePullRefresh(){
				if(!this.hasMore){
					return
				}
				this.page++
				search(this.query,this.page,this.showSinger,perpage).then(res => {
					if(res.code === ERR_OK){
						/*const songs = this._normalizeSong(res.data.song.list);
						this.result.push(...songs); */
						
						const songs = this._normalizeSong(res.data.song.list);
						this.result = this.result.concat(songs);
					}
					this._checkMore(res.data);
				})
			},
			_normalizeSong(list){
				const ret = [];
				list.forEach((musicData) => {
					if(musicData.songmid && musicData.songid && musicData.albummid){
						getSongUrl(musicData.songmid).then(res => {
							if(res.code === ERR_OK){
								const vkey = res.req.data.vkey;
								let url = `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=4427256653&${vkey}&uin=8095&fromtag=38`
								const data = {...musicData,url};
								ret.push(createSong(data));
							}
						})
					}
				})
				return ret;
			},
			_checkMore(data){
				const song = data.song;
				if(!song.list.length || (song.curnum+song.curpage*perpage) > song.totalnum){
					this.hasMore = false;
				}
			},
			handleSingerDetail(){
				const singer = new Singer({
					id:this.singerInfo.singerid,
					name:this.singerInfo.singername,
					singermid:this.singerInfo.singermid,
					avatar:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${this.singerInfo.singermid}.webp`
				})
				this.setSinger(singer)
				this.$router.push(`/search/${singer.id}`)
			}
		}
	}
</script>

<style lang='scss' scoped>
	.suggest-wrapper{
		height:100%;
		padding:0 16px;
	}
	.singer-info{
		display:flex;
		height:60px;
		align-items:center;
		justify-content:space-between;
		.avatar{
			width:60px;
			height:60px;
			img{
				border-radius:50%;
			}
		}
		.info{
			flex:1;
			padding-left:10px;
			min-width:0;
			.singer-name{
				font-size:14px;
				font-weight:bold;
				color: rgba(26,26,26,1);
			}
			.music-number{
				font-size:12px;
				color: rgba(26,26,26,.5);
			}
		}
		.detail-arrow{
			width:20px;
			height:20px;
			text-align:center;
			line-height:20px;
			transform:scale(-1);
			.iconfont{
				font-size:20px;
			}
		}
	}
	.suggest-item{
		margin-top:27px;
		height:35px;
		.songname{
			font-size:15px;
			line-height:15px;
		}
		.song-info{
			width:100%;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
			padding-top:8px;
			font-size:10px;
			color:rgba(26,26,26,.5);
		}
	}
</style>
