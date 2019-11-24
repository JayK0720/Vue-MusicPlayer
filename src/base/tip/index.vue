<template>
    <div class="tip-wrapper" v-show="flag">
        <div class="tip-content">
            <i class="iconfont success-icon">&#xe61b;</i>
            <p class="text">{{text}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tip",
        data(){
            return{
                flag:false,
            }
        },
        props:{
            text:{
                type:String,
                default:''
            },
            delay:{
                type:Number,
                default:1500
            }
        },
        methods:{
            show(){
                this.flag = true;
                this.clearTimeout(this.timer);
                this.timer = setTimeout(() =>{
                    this.hide();
                },this.delay);
            },
            hide(){
                this.flag = false;
            }
        }
    }
</script>

<style scoped lang="scss">
.tip-wrapper{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:200;
    .tip-content{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        width:80%;
        height:50px;
        background-color:#fff;
        text-align:center;
        line-height:50px;
    }
    .success-icon{
        color:#00c772;
    }
}
</style>