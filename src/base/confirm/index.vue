<template>
	<transition name='fade' appear>
		<div class="confirm-wrapper" v-show='flag' @click.stop>
			<div class="confirm">
				<div class="content">
					<p class='text'>{{text}}</p>
				</div>
				<div class="operate">
					<span class='cancel-btn' @click='handleCancel'>{{cancelText}}</span>
					<span class='confirm-btn' @click='handleConfirm'>{{confirmText}}</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default{
		name:'confirm',
		data(){
			return{
				flag:false,
			}
		},
		props:{
			text:{
				type:String,
				default:'是否清空所有搜索历史'
			},
			cancelText:{
				type:String,
				default:'取消'
			},
			confirmText:{
				type:String,
				default:'确定'
			}
		},
		methods:{
			show(){
				this.flag = true;
			},
			hide(){
				this.flag = false;
			},
			handleCancel(){
				this.hide();
				this.$emit('cancal');
			},
			handleConfirm(){
				this.hide();
				this.$emit('confirm');
			}
		}
	}
</script>

<style scoped lang='scss'>
	@import '@/common/scss/mixin.scss'; 
	.fade-enter-active,.fade-leave-active{
		transition:opacity .25s;
	}
	.fade-enter,.fade-leave-to{
		opacity:0;
	}
	.fade-enter-to,.fade-leave{
		opacity:1;
	}
	.confirm-wrapper{
		position:fixed;
		left:0;
		right:0;
		bottom:0;
		top:0;
		z-index:1000;
	}
	.confirm{
		position:absolute;
		width:76%;
		height:124px;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);
		background-color:#fff;
		font-size:14px;
		color:#212121;
		border-radius:8px;
	}
	.content{
		height:79px;
		border-bottom:1px solid #e5e5e5;
		line-height:79px;
		text-align:center;
	}
	.operate{
		display:flex;
		height:44px;
		justify-content:space-between;
		span{
			flex:1;
			text-align:center;
			line-height:44px;
			@include border-right-1px(#e5e5e5);
			&:last-child{
				@include border-none;
				color:#31c27c;
			}
		}
	}
</style>
