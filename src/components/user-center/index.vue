<template>
    <transition name="slider" appear >
        <div class="user-center-wrapper" v-show="flag">
            <div class="title">
                <i
                    class="iconfont icon-back"
                    @click="handleBack"
                >&#xe64d;</i>
                <h1>个人中心</h1>
            </div>
            <Switches
                :switches="switches"
                :currentIndex="currentIndex"
                @switch="switchItem"
            />
            <div  class="play-history-wrapper"  v-show="currentIndex === 0">
                <Scroll :data="playHistory">
                    <SongList
                        :songs="playHistory"
                        @selectItem="handlePlayHistorySong"
                    />
                </Scroll>
            </div>
            <div class="favorite-list-wrapper" v-show="currentIndex === 1">
                <Scroll :data="favoriteList">
                    <SongList
                        :songs="favoriteList"
                        @selectItem="handlePlayFavoriteSong"
                    />
                </Scroll>
            </div>
        </div>
    </transition>
</template>

<script>
    import Switches from '@/base/switches'
    import Scroll from '@/base/scroll'
    import SongList from '@/base/song-list'
    import {mapGetters,mapActions} from 'vuex'
    import {Song} from '@/common/js/song.js'
    export default {
        name: "mine",
        data() {
            return{
                flag:false,
                switches:[
                    {name:'最近播放'},
                    {name:'我喜欢的'}
                ],
                currentIndex:0
            }
        },
        components:{Switches,Scroll,SongList},
        computed:{
            ...mapGetters(['favoriteList','playHistory'])
        },
        methods:{
            ...mapActions(['insertSong']),
            show(){
                this.flag = true;
            },
            hide(){
                this.flag = false;
            },
            handleBack(){
                this.hide();
            },
            switchItem(index){
                this.currentIndex = index;
            },
            handlePlayHistorySong(song,index){
                this.insertSong(new Song(song));
            },
            handlePlayFavoriteSong(song,index){
                this.insertSong(new Song(song));
            }
        }
    }
</script>

<style scoped lang="scss">
    .slider-enter-active,.slider-leave-active{
        transition:all .3s;
    }
    .slider-leave-to,.slider-enter{
        transform:translate3d(100%,0,0);
    }
    .user-center-wrapper{
        display:flex;
        flex-direction:column;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        bottom:0;
        z-index:200;
        background-color:#f6f6f6;
        .title{
            position:relative;
            height:40px;
            text-align:center;
            line-height:40px;
            .icon-back{
                position:absolute;
                top:50%;
                transform:translateY(-50%);
                left:10px;
                color:#333;
            }
        }
        .play-history-wrapper,.favorite-list-wrapper{
            flex:1;
            min-height:0;
            background-color:#f6f6f6;
            .wrapper{
                padding:0 16px;
                height:100%;
                overflow:auto;
            }
        }
    }
</style>