<template>
	<ul class='song-list'>
		<li 
			v-for='(item,index) in songs' 
			:key='index' 
			class='song-item'
			@click='selectSong(item,index)'
		>
			<h2 class="song-name">{{item.songname}}</h2>
			<p class="song-desc">{{item | getDesc}}</p>
		</li>
	</ul>
</template>

<script>
	export default{
		name:'song-list',
		data() {
			return {
				
			}
		},
		props:{
			songs:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		filters:{
			getDesc(value){
				return `${value.singer} · ${value.albumname}`
			}
		},
		methods:{
			selectSong(item,index){
				this.$emit('selectItem',item,index);
			}
		}
	}
</script>

<style scoped lang='scss'>
	@import '@/common/scss/mixin.scss';
	.song-list>ul{
		padding:0 15px;
	}
	.song-item{
		padding-top:20px;
		height:35px;
		font-size:15px;
		color:#101010;
		.song-name{
			@include text-ellipsis;
		}
	}
	.song-desc{
		font-size:10px;
		color:#868686;
		@include text-ellipsis;
	}
</style>
