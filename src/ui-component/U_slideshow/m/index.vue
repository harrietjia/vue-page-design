<template>
    <div class="U000002-template1">
        <img v-if="list.length == 0" :style="wrapper_style" :src="defaultUrl" alt="">
        <div v-if="list.length == 1" :style="wrapper_style">
            <img :style="img_style" :src="list[0].image" alt="">
        </div>
        <Swiper
            v-if="list.length > 1"
            :options="swiperOption"
            ref="mySwiper">
            <!-- slides -->
            <Swiper-slide v-for="(item, idx) in list" :key="idx">
                <div class="list-image" v-if="item.image" :style="wrapper_style">
                    <img :src="item.image" alt="" :style="img_style">
                </div>
            </Swiper-slide>
            <!--分页-->
            <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
    </div>
</template>

<script>
// https://www.npmjs.com/package/vue-awesome-swiper
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import defaultUrl from '@/resource/images/banner.png';

export default {
    props: ['id', 'datas', 'styles'],
    data () {
        const self = this;
        return {
            // 轮播图设置
            swiperOption: {
                autoplay: true,
                // loop: true,   loop模式第二轮循环的时候第一张会闪烁
                delay: 3000,
                observer:true,
                // autoHeight: true,
                pagination: {
                    el: '.swiper-pagination',
                }
            },
            defaultUrl
        };
    },

    components: {
        Swiper,
        SwiperSlide
    },

    computed: {
        // 初始化
        swiper () {
            return this.$refs.mySwiper.swiper;
        },

	    /** 样式 */
	    wrapper_style() {
		    const {
			    padding_top,
			    padding_bottom,
			    padding_left,
			    padding_right,
			    bg_color
		    } = this.datas;
		    return `
                width: 100%;
                background-color: ${bg_color};
                padding-top: ${padding_top}px;
                padding-bottom: ${padding_bottom}px;
                padding-left: ${padding_left}px;
                padding-right: ${padding_right}px;
            `;
	    },

	    img_style() {
		    const {
			    picture_border,
		    } = this.datas;
		    return `
				        width: 100%;
                border-radius: ${picture_border}px;
            `;
	    },

        // 广告轮播列表
        list () {
            try {
                let list = [...this.datas.list] || [];
                list = list.filter(item => item.image != '');
                return list;
            } catch (err) {
                return [];
            }
        }
    },

    methods: {
    },

    mounted () {
        this.$emit('loaded');
    }
};
</script>

<style lang="less">
    /*.U000002-template1 .swiper-pagination {*/
        /*bottom: 0rem;*/
    /*}*/

    /*.U000002-template1 .swiper-pagination-bullet {*/
        /*position: relative;*/
        /*margin: 0 .16rem!important;*/
        /*vertical-align: top;*/
        /*border-radius: 0;*/
        /*width: .853rem;*/
        /*height: .13rem;*/
        /*background-color: rgba(255, 255, 255, .8)!important;*/
    /*}*/

    /*.U000002-template1 .swiper-pagination-bullet:after {*/
        /*content: '';*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 0;*/
        /*height: .053rem;*/
        /*background-color: #fff;*/
    /*}*/

    /*.U000002-template1 .swiper-pagination-bullet-active {*/
        /*background: #fff;*/
    /*}*/

</style>

<style lang="less" scoped>
    .U000002-template1 {
        display: block;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        width: 375px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }

</style>
