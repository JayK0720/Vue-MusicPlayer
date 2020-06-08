<template>
    <div class="banner-wrapper">
        <div class="swiper-wrapper">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(banner,index) in banners" :key="index">
                    <img :src="banner.imageUrl" :alt="banner.typeTitle">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
    const ERR_OK = 200;

    export default {
        name:'banner',
        data() {
            return {
                banners:[],
                swiperOption:{
                    pagination:{
                        el:".swiper-pagination",
                    },
                    initialSlide:1,
                    loop:true,
                    // autoplay:true
                }
            }
        },
        created(){
            this.getBanner();
        },
        methods:{
            getBanner(){
                this.$axios.get("http://121.43.126.106:3000/banner")
                    .then(response => {
                        console.log(response);
                        if(response.data.code === ERR_OK){
                            this.banners = response.data.banners;
                        }
                    })
            },
        }
    }
</script>

<style scoped lang='scss'>
    @import '../../common/css/variable.scss';
    .banner-wrapper{
        position:relative;
        padding-top:40%;
        height:0;
        .swiper-wrapper{
            position:absolute;
            height:100%;
            left:0;
            right:0;
            top:0;
            .swiper-pagination{
                .swiper-pagination-bullet-active{
                    background:$theme-color;
                }
            }
        }
        .swiper-container{
            width:100%;
            height:100%;
            img{
                width:100%;
                height:100%;
            }
        }
    }
</style>