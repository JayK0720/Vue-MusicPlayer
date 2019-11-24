<template>
    <div class="tab-wrapper">
        <ul>
            <li
                v-for="(item,index) in switches"
                :key="index"
                :class="{active:currentIndex === index}"
                class="tab-item"
                @click="handleSwitch(index)"
            >
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "switches",
        props:{
            switches:{
                type:Array,
                default:function(){
                    return []
                }
            },
            currentIndex:{
                type:Number,
                default:0
            }
        },
        methods:{
            handleSwitch(index){
                this.$emit('switch',index)
            }
        }
    }
</script>

<style scoped lang="scss">
    .tab-wrapper{
        margin:15px 0;
        width:100%;
        height:30px;
        border-radius:8px;
        ul{
            display:flex;
            justify-content:center;
            width:100%;
        }
    }
    .tab-item{
        width:90px;
        height:30px;
        font-size:14px;
        line-height:30px;
        text-align:center;
        color:#212121;
        background-color:#fff;
        &:first-child{
            border-radius:5px 0 0 5px;
        }
        &:last-child{
            border-radius:0 5px 5px 0;
        }
        &.active{
            background-color:#00ffb8;
            color:#fff;
        }
    }
</style>