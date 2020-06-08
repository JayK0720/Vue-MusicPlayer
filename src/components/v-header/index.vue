<template>
    <div class="header-wrapper">
        <div class="title">音乐馆</div>
    </div>
</template>

<script>
    export default {
        name:'v-header',
        data() {
            return {}
        }
    }
</script>

<style scoped lang='scss'>
    @import '../../common/css/variable.scss';
    .header-wrapper{
        height:50px;
        line-height:50px;
        background-color:$top-background-color;
        .title{
            font-size:$big-title-size;
            font-weight:bold;
            color:$title-color;
            text-align:center;
        }
    }
</style>