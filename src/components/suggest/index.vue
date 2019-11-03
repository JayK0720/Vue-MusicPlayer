<template>
	<Scroll class="suggest-wrapper" :data='result'>
		<section>
			<div class="singer-info" v-show='singerInfo.singermid'>
				<div class="avatar">
					<img :src="avatar" :alt="singerInfo.singername">
				</div>
				<div class="info">
					<p class="singername">{{singerInfo.singername}}</p>
					<p class="music-number">
						<span>歌曲：{{singerInfo.songnum}}</span>
						<span>专辑：{{singerInfo.albumnum}}</span>
					</p>
				</div>
			</div>
			<ul class='suggest-list'>
				<li 
					class='suggest-item' 
					v-for='(item,index) in result'
					:key='index'
				>
					<p class="songname">{{item.songname}}</p>
					<p class='song-info'>{{item.singer}}-{{item.albumname}}</p>
				</li>
			</ul>
		</section>
	</Scroll>
</template>

<script>
	import {search} from '@/common/api/search'
	import {ERR_OK} from '@/common/api/config'
	import {createSong} from '@/common/js/song'
	import {getSongUrl} from '@/common/api/singer'
	import Scroll from '@/base/scroll'
	
	export default{
		name:'suggest',
		data(){
			return {
				page:1,
				keyword:'',
				result:[],
				singerInfo:{}
			}
		},
		computed:{
			avatar(){
				if(this.singerInfo.singermid){
					return `https://y.gtimg.cn/music/photo_new/T001R68x68M000${this.singerInfo.singermid}.jpg?max_age=2592000`
				}
			},
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
			query(){
				this.search()
			}
		},
		methods:{
			search(){
				console.log(this.query);
				if(!this.query) return;
				search(this.query,this.page,this.showSinger).then(res => {
					if(res.code === ERR_OK){
						if(res.data.zhida && res.data.zhida.singermid){
							this.singerInfo = res.data.zhida
						}
						if(res.data.song){
							this.result = this._normalizeSong(res.data.song.list);
							console.log(this.result)
						}
					}
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
		.avatar{
			width:60px;
			height:60px;
			img{
				border-radius:50%;
			}
		}
		.info{
			padding-left:10px;
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
