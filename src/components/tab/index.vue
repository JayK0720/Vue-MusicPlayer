<template>
    <div class="tab-wrapper">
        <router-link tag='div' class="tab-item" to="/recommend">
            <span>推荐</span>
        </router-link>
        <router-link tag='div' class="tab-item" to="/singer">
            <span>歌手</span>
        </router-link>
        <router-link tag='div' class="tab-item" to="/rank">
            <span>排行</span>
        </router-link>
        <router-link tag='div' class="tab-item" to="/search">
            <span>搜索</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        name:'tab',
        data() {
            return {}
        }
    }
</script>

<style scoped lang='scss'>
@import '../../common/css/variable.scss';
.tab-wrapper{
    display:flex;
    height:36px;
    line-height:36px;
    justify-content:space-between;
    .tab-item{
        flex:1;
        text-align:center;
        color:$title-color;
        font-size:$normal-font-size;
        &.active{
            color:$theme-color;
            border-bottom:2px solid $theme-color;
        }
    }
}
</style>