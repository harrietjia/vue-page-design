<template>
    <div :class="['component-wrapper', `component-${this.id}`]" v-if="goods_list.length > 0">

        <!-- style -->
        <div v-html="css"></div>

        <!-- 倒计时 -->
        <div class="geshop-m-timer">
            <div class="geshop-m-timer-title bold">
                {{ datas.title }}
            </div>
            <div class="geshop-m-timer-right" v-if="!loading">
                <span class="timer-text bold">{{ spiner_text }}</span>
                <span class="timer-spiner">{{ spiner[0] }}</span>
                :
                <span class="timer-spiner">{{ spiner[1] }}</span>
                :
                <span class="timer-spiner">{{ spiner[2] }}</span>
                :
                <span class="timer-spiner">{{ spiner[3] }}</span>
            </div>
        </div>

        <!-- 列表 -->
        <ul class="goods-list">
            <li v-for="(item, index) in goods_list" :key="`${index}-${item.goods_sn}`">
                <!--折扣标-->
                <unit-discount
                    :value="item.discount"
                    :config="datas" />

                <!--商品图片-->
                <div class="item-image">

                    <a :href="item.detail_url">
                        <div class="image-goods">
                            <unit-goods-image
                                :src="item.goods_img"
                                :sku="item.goods_sn"
                                :index="index" />
                        </div>
                    </a>

                    <!--sold out-->
                    <div class="item-soldout" v-if="status == 1 && (item.tsk_left_num || 0) <= 0">
                        <span>{{ languages.sold_out }}</span>
                    </div>

                    <!--coming_soon -->
                    <div class="item-soldout" v-if="status == 0">
                        <span>{{ languages.coming_soon }}</span>
                    </div>

                    <!-- 已经结束 -->
                    <div class="item-soldout" v-if="status == 2">
                        <span>{{ languages.state_ended }}</span>
                    </div>

                </div>

                <div class="item-info">

                    <!-- 价格 -->
                    <div class="item-shop-market">
                        <!--销售价-->
                        <div class="item-shop bold">
                            <div class="shop-price">
                                <unit-shop-price
                                    :value="item.tsk_price"
                                    :config="datas">
                                </unit-shop-price>
                            </div>
                        </div>
                        <!--市场价-->
                        <div class="item-market">
                            <unit-market-price
                                :value="item.market_price"
                                :shop-price="item.tsk_price"
                                :config="datas">
                            </unit-market-price>
                        </div>
                    </div>

                </div>

                <!-- 库存条，未开始的时候(status=0)剩余和总数相等 -->
                <progress-zf-m
                    :left_color="datas.bar_left_bg_color"
                    :total_color="datas.bar_bg_color"
                    :left="status == 0 ? parseInt(item.tsk_total_num) : parseInt(item.tsk_left_num)"
                    :total="parseInt(item.tsk_total_num)">
                </progress-zf-m>

                <!-- 剩余 -->
                <div class="item-claimed">
                    <span>{{ filter_only_left(item.tsk_left_num) }}</span>
                </div>

                <!-- button -->
                <a :href="item.detail_url">
                    <button class="geshop-button-buynow">{{ languages.btn_buy_now }}</button>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
// 自定义样式
const css = function () {
    const {
        margin_top,
        margin_bottom,
        bg_color,
        shop_price_color,
        market_price_color,
        text_bg_color,
        text_color,
        time_text_bg_color,
        time_text_color,
        bar_text_color,
        buynow_bg_color,
        buynow_text_color
    } = this.datas;

    return `
        .component-${this.id} {
            margin-top: ${this.$px2rem(margin_top)};
            margin-bottom: ${this.$px2rem(margin_bottom)};
            background-color: ${bg_color || '#f8f8f8'};
            font-size: ${this.$px2rem(24)};
        }

        .component-${this.id} .geshop-m-timer {
            background-color: ${text_bg_color || '#D8D8D8'};
        }
        .component-${this.id} .geshop-m-timer .geshop-m-timer-title {
            color: ${text_color};
        }
        .component-${this.id} .geshop-m-timer .geshop-m-timer-right {
            color: ${time_text_bg_color};
        }
        .component-${this.id} .geshop-m-timer span.timer-spiner {
            background-color: ${time_text_bg_color};
            color: ${time_text_color};
        }

        .component-${this.id} .item-shop .shop-price {
            color: ${shop_price_color};
        }
        .component-${this.id} .item-market {
            color: ${market_price_color};
        }

        .component-${this.id} .item-claimed {
            color: ${bar_text_color};
        }

        .component-${this.id} .geshop-button-buynow {
            background-color: ${buynow_bg_color};
            color: ${buynow_text_color};
        }
    `;
};

/**
 * 返回剩余秒数，正整值
 * @param {timestamp} timestamp 时间戳
 */
const get_second = (timestamp) => {
    const now = new Date().getTime();
    let left = timestamp - now;
    left = Math.abs(left);
    const second = parseInt((left / 1000));
    return second;
};

/**
 * 判断当前的倒计时状态
 * @param {timestamp} start 开始的时间
 * @param {timestamp} end 结束的时间
 * @return {Number} 0=未开始，1=正在开始，2=已经结束
 */
const get_status = (start, end) => {
    const now = new Date().getTime();
    if (now < start) {
        return 0;
    }
    if (now >= start && now < end) {
        return 1;
    }
    if (now >= end) {
        return 2;
    }
};

/**
 * 秒数转换成日期
 * @param {Number} s 秒数
 * @returns {Array}
 */
const second_to_date = (s) => {
    let t = ['00', '00', '00', '00'];
    if (s > -1) {
        t = [];
        const day = Math.floor(s / 3600 / 24);
        const hour = Math.floor(s / 3600) % 24;
        const min = Math.floor(s / 60) % 60;
        const sec = s % 60;
        t.push(`${day}D`);
        if (hour < 10) {
            t.push('0' + hour);
        } else {
            t.push(hour);
        }
        if (min < 10) {
            t.push('0' + min);
        } else {
            t.push(min);
        }
        if (sec < 10) {
            t.push('0' + sec);
        } else {
            t.push(sec);
        }
    };
    return t;
};

export default {
    props: ['id', 'datas', 'styles', 'goodsSKU', 'languages'],

    data () {
        return {
            // 加载状态
            loading: true,
            // 商品列表
            list: [],
            // 定时器钩子
            timer_id: null,
            // 倒计时秒数
            spiner: ['00', '00', '00', '00'],
            // 倒计时文案
            spiner_text: this.languages.down_starts,
            // 是否展示
            visible: true,
            // 当前状态
            status: 0
        };
    },

    computed: {
        css () {
            return '<style>' + css.call(this) + '</style>';
        },
        env () {
            return this.$store.state.page.env;
        },
        // 返回远端数据属否加载完毕
        remote_data_loaded () {
            return this.$store.state.page.remote_data_loaded;
        },
        // 数据源ID
        goods_source_id () {
            return this.goodsSKU[0].id || '';
        },
        // 商品列表
        goods_list () {
            return this.goodsSKU[0].goodsInfo || [];
        },
        // 开始时间
        start_time () {
            try {
                const timestamp = parseInt(this.goodsSKU[0].tsk_info.tsk_begin_time);
                return timestamp * 1000;
            } catch (err) {
                return 1577265;
            }
        },
        // 结束时间
        end_time () {
            try {
                const timestamp = parseInt(this.goodsSKU[0].tsk_info.tsk_end_time);
                return timestamp * 1000;
            } catch (err) {
                return 1577265;
            }
        }
    },

    methods: {
        // 初始化
        async init () {
            // 首次状态更新
            this.timer(this.start_time, this.end_time);
            // 装修页不执行倒计时
            if (this.env !== 1) {
                clearInterval(this.timer_id);
                this.timer_id = setInterval(() => {
                    this.timer(this.start_time, this.end_time);
                }, 1000);
            }
            this.loading = false;
        },

        // 倒计时函数
        timer (start, end) {
            // 获取状态
            this.status = get_status(start, end);
            let second = 0;
            // 判断状态
            switch (this.status) {
            case 0:
                second = get_second(start);
                this.spiner_text = this.languages.down_starts;
                break;
            case 1:
                second = get_second(end);
                this.spiner_text = this.languages.down_ends;
                break;
            case 2:
                clearInterval(this.timer_id);
                this.spiner_text = this.languages.already_ended;
                break;
            }
            // 更新时分秒
            this.spiner = second_to_date(second);
        },

        // 剩余库存文案
        filter_only_left (count = 0) {
            return (this.languages.left_piece || '').replace('XX', count);
        }
    },

    watch: {
        // 监听是否加载远端数据，有的话重新执行倒计时
        remote_data_loaded (tof) {
            // 变更ID执行获取数据
            tof && this.init();
        },
        start_time () {
            this.init();
        },
        end_time () {
            this.init();
        },
        // 监听商品列表是否有变化
        goods_list () {
            this.$store.dispatch('global/async_goods_init_2', this);
        }
    },

    mounted () {
        // 初始化
        this.remote_data_loaded && this.init();

        this.$emit('loaded');
        // 页面元素初始化
        this.$store.dispatch('global/async_goods_init_2', this);

        // 绑定滚动时间，兼容图片懒加载在水平滚动下无效
        $(`.component-${this.id} .goods-list`).on('scroll', () => {
            const images = $(this.$el).find('img.js_gdexp_lazy');
            this.$store.dispatch('global/lazyload_img_by_dom', images);
        });
    }
};
</script>

<style lang="less" scoped>
    // 默认
    .component-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 375px;

        // 倒计时的
        .geshop-m-timer {
            width: 100%;
            padding: 24 / 75rem  0;
            text-align: center;

            .geshop-m-timer-title {
                display: inline-block;
                font-size: 40 / 75rem;
                line-height: 54 / 75rem;
                height: 54 / 75rem;
            }
            .geshop-m-timer-right {
                font-size: 32 / 75rem;
            }
            span.timer-text {
                margin-right: 12 / 75rem;
            }
            span.timer-spiner {
                display: inline-block;
                height: 36 / 75rem;
                line-height: 36 / 75rem;
                padding: 0 5 / 75rem;
                text-align: center;
                font-size: 24 / 75rem;
                border-radius: 6 / 75rem;
            }
        }

        // 列表
        ul.goods-list {
            width: 100%;
            padding-top: 24 / 75rem;
            padding-bottom: 24 / 75rem;
            padding-right: 0px;
            padding-left: 0px;
            margin: 0 12 / 75rem;
            margin-bottom: 0px;
            display: flex;
            flex-wrap: nowrap;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar{
                width: 0px;
                height: 0px;
            }

            li {
                position: relative;
                flex-shrink: 0;
                width: 282 / 75rem;
                margin: 0 12 / 75rem;
                overflow: hidden;
            }

            // 商品图片
            .item-image {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 373 / 75rem;
                margin-bottom: 10 / 75rem;

                .image-goods img{
                    width: 100%;
                }
            }

            // 商品详情
            .item-info {
                margin-bottom: 12 / 75rem;
            }

            // 销售及市场价
            .item-shop-market {
                width: 100%;
            }

            .item-shop-market .item-shop {
                display: flex;
                flex-flow: row wrap;
                color: #333333;
                line-height: 24/37.5rem;
                align-items: baseline;

                .shop-price{
                    font-size: 18/37.5rem;
                    font-weight: bold;
                }
            }
            .item-market {
                height:17/37.5rem;
                line-height:17/37.5rem;
            }

            // 售空
            .item-soldout {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 160 / 75rem;
                height: 160 / 75rem;
                border-radius: 100%;
                background-color: #000000;
                opacity: 0.4;
                z-index: 1;
                margin-left: -80 / 75rem;
                margin-top: -80 / 75rem;
                display: flex;
                justify-content: center;
                align-items: center;
                > span {
                    display: block;
                    text-align: center;
                    font-size: 28 / 75rem;
                    color: #ffffff;
                    width: 80%;
                    text-align: center;
                    word-break: break-all;
                    line-height: 1em;
                }
            }

            // 促销
            .item-promotions {
                position: relative;
                height: 24/75rem;
                line-height: 24/75rem;
                overflow: hidden;
                margin-top: 6/75rem;
                margin-bottom: 24/75rem;
                font-size: 24/75rem;

                .gs-off-text {
                    .special {
                        font-weight: 700;
                        font-family: OpenSans-Bold, arial, serif;
                    }
                }

                .sjx {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 28/75rem;
                    height: 28/75rem;
                }

                .icon-downs {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        // 购买按钮
        .geshop-button-buynow {
            margin-top: 16 / 75rem;
            display: block;
            width: 100%;
            font-size: 28 / 75rem;
            height: 60 / 75rem;
            border: none;
            line-height: 60 / 75rem;
            padding: 0px;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: break-word;
            overflow: hidden;

            &:hover {
                opacity: .9;
            }
        }
    }
</style>
