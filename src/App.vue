<template>
    <div id="app">
        <v-header/>
        <tab/>
        <router-view/>
    </div>
</template>

<script>
    import Vheader from '@/components/v-header';
    import tab from '@/components/tab';
    export default {
        name:'app',
        components:{
            'v-header':Vheader,
            tab
        }
    }
</script>

<style lang="scss">
    @import './common/css/variable.scss';
    #app{
        height:100%;
        background-color:$background-color;
    }
</style>
