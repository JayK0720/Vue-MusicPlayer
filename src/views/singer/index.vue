<template>
	<div class="singer-wrapper">
		<ListView :data='singers' @select='handleSelectSinger'></ListView>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSinger} from '@/common/api/singer'
	import {ERR_OK} from '@/common/api/config'
	import ListView from '@/base/listview'
	import {mapMutations} from 'vuex'
	import {Singer} from '@/common/api/singer'
	const HOT_NAME = '热门歌手',
		  HOT_NAME_LENGTH = 10;
	
	export default {
		name:'singer',
		data() {
			return {
				singers:[],	
			}
		},
		created(){
			this._getSinger()
		},
		components:{ListView},
		methods:{
			...mapMutations({
				'setSinger':'SET_SINGER'
			}),
			handleSelectSinger(singer){
				this.$router.push(`/singer/${singer.id}`)
				this.setSinger(singer);
			},
			_getSinger(){
				getSinger().then(res => {
					if(res.code === ERR_OK){
						this.singers = this._normalizeSinger(res.data.list);
					}
				})
			},
			/*_normalizeSinger(singer){
				let singerList = [];
				for(let i = 0,len = singer.length; i < len; i++ ){
					if( hasIndex( singer[i].Findex ) ){
						for(let j = 0; j < singerList.length; j++){
							if( singerList[j].Findex === singer[i].Findex ){
								singerList[j].list.push(singer[i]);
							}
						}
					}else{
						singerList.push({Findex:singer[i].Findex,list:[singer[i]]});
					}
				}
				function hasIndex(Findex){
					for(let i = 0; i < singerList.length; i++){
						if(singerList[i].Findex === Findex){
							return true;
						}
					}
					return false;
				}
				function compare(a,b){
					if(a.Findex < b.Findex) {
						return -1;
					}
					if(a.Findex > b.Findex){
						return 1;
					}
					return 0;
				}
				singerList.sort(compare);
				return singerList;
			}
			*/
		   _normalizeSinger(list){
			   const map = {
				   hot:{
					   title:HOT_NAME,
					   items:[]
				   }
			   }
			   list.forEach( (item,index) => {
				   if( index < HOT_NAME_LENGTH ){
					   map.hot.items.push({
						   name:item.Fsinger_name,
						   id:item.Fsinger_id,
						   singermid:item.Fsinger_mid,
						   avatar:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.webp`
					   });
				   }
				   const key = item.Findex;
				   if( !map[key] ){
						map[key] = {
							title:key,
							items:[]
						}
				   }
				   map[key].items.push({
					   name:item.Fsinger_name,
					   id:item.Fsinger_id,
					   singerMid:item.Fsinger_mid,
					   avatar:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`,
				   })
			   })
			   // 对象的遍历是无序的，为了对遍历出有顺序的数据，需要对数据进一步处理
			   const [hot,rest] = [ [],[] ];
			   for(let key in map){
				   if( map[key].title.match(/[a-zA-Z]/) ){
					   rest.push( map[key] )
				   }else if( map[key].title === HOT_NAME ){
					   hot.push( map[key] )
				   }
			   }
			   // charCodeAt() 方法返回指定位置的字符的unicode编码，这个返回值是0-65535 之间的整数。
			   // sort 方法会对一个阵列的所有元素进行排序，预设的排序是根据字串的Unicode编码位置而定。
			   rest.sort((a,b) => {
				   return a.title.charCodeAt(0) - b.title.charCodeAt(0);
			   })
			   return hot.concat(rest);
		   }
		}
	}
</script>

<style lang='scss' scoped>
	.singer-wrapper{
		position:fixed;
		top:78px;
		bottom:0;
		width:100%;
		overflow:hidden;
	}
</style>
