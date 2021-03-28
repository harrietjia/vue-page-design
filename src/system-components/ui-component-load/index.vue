<template>
    <div
        :id="id"
        :data-key="uikey"
        :data-theme="template"
        ref="dom">

        <component
            v-if="component"
            :is="module"
            :id="id"
            :styles="styles"
            :datas="datas"
            :languages="languages"
            @errored="after_componnet_errored"
            @loaded="after_componnet_loaded">
            <slot></slot>
        </component>

    </div>
</template>

<script>

// 加载失败的组件
import ErrorComponent from './load-error.vue';
import defaultGoods from '@/resource/images/default-goods.png';

// 默认的商品数据
const default_goods_item = {
    goods_sn: "269004202",
    goods_title: "Asymmetric Striped Slit Shirt Dress - Dark Gree",
    goods_img: defaultGoods,
    tsk_price: 9.99, // 秒杀价格
    shop_price: 9.99, // 销售价
    market_price: 19.99, // 市场价
    discount: 50,
    promotions: [
        '<span>BUY <em class="special fb">1</em> GET 1 <em class="special fb  ml5" data-orgp="">99%</em> OFF</span>',
        '<span>BUY <em class="special fb">1</em> GET 1 <em class="special fb  ml5" data-orgp="">99%</em> OFF</span>'
    ]
};

// 默认的商品数据列表
const default_goods_list = [
    default_goods_item,
    default_goods_item,
    default_goods_item,
    default_goods_item
];

export default {
    props: {
        // 组件ID
        id: {
            required: true
        },
        // 组件KEY
        uikey: {
            type: String,
            required: true,
            default: 'U000001',
        },
        // 模版名
        template: {
            type: String,
            required: true,
            default: 'template1'
        },
        vdc: {
            type: Object
        }
    },

    components: {
        ErrorComponent
    },

    data () {
        return {
            module: null, // 组件模块
        };
    },

    computed: {
        // 当前环境, 1=装修页, 2=预览, 3=发布
        env () {
            return this.$store.state.page.env;
        },
        // 当前组件信息
        component () {
            return this.vdc;
        },
        // 功能数据
        datas () {
            // 如果有配置项的话
            if (this.component.is_loaded_config && this.component.hasOwnProperty('config')) {
                const datas = {};
                Object.keys(this.component.config.datas).map(key => {
                    datas[key] = this.component.config.datas[key].value;
                });
                return datas;
            } else {
                return this.component.remote_data || {};
            }
        },
        // 样式数据
        styles () {
            // 如果有配置项的话
            if (this.component.is_loaded_config && this.component.hasOwnProperty('config')) {
                const styles = {};
                Object.keys(this.component.config.styles).map(key => {
                    styles[key] = this.component.config.styles[key].value;
                });
                return styles;
            } else {
                return this.component.remote_style || {};
            }
        },
        /**
         * 当前组件的SKU信息
         * @return {array}
         */
        goodsSKU () {
            // 从数据源中获取数据
            const goodsSKU = this.$store.state.page.goodsSKU.filter(x => Number(x.component_id) === Number(this.id));

            // 如果是商品类组件， 通过判断组件是否 goods 的配置项
            if (this.datas.hasOwnProperty('goods') && goodsSKU.length === 0) {
                goodsSKU.push({});
            }

            // 如果是预览页的，统一加上假的数据
            if (this.env === 1) {
                goodsSKU.map(item => {
                    if (item.hasOwnProperty('goodsInfo') == false) {
                        item.goodsInfo = [];
                    }
                    // 添加默认数据
                    if (item.goodsInfo.length <= 0) {
                        item.goodsInfo = [...default_goods_list];
                    }
                });
            }
            return goodsSKU;
        },

        /**
         * 远端数据是否请求完毕
         */
        remote_data_loaded () {
            return this.$store.state.page.remote_data_loaded;
        },

        /**
         * 语言包
         * @return {object}
         */
        languages () {
            return this.$store.state.page.languages || {};
        }
    },

    methods: {
        /**
         * 当子组件加载完毕
         */
        after_componnet_loaded () {

        },
        /**
        * 当子组件加载失败
        */
        after_componnet_errored() {
	        this.$emit('reload');
        }
    },

    created () {
        this.module = () => ({
            // 需要加载的组件 (应该是一个 `Promise` 对象)
            component: import(`../../ui-component/${this.uikey}/m/index.vue`),
            // 异步组件加载时使用的组件
            // loading: LoadingComponent,
            // 加载失败时使用的组件
            error: ErrorComponent,
            // 展示加载时组件的延时时间。默认值是 200 (毫秒)
            // delay: 200,
            // 如果提供了超时时间且组件加载也超时了，
            // 则使用加载失败时使用的组件。默认值是：`Infinity`
            // timeout: 3000
        });
    }
};
</script>

<style scoped>
.custom-transition .lazy-component-enter {
  opacity: 0;
}

.custom-transition .lazy-component-enter-to {
  opacity: 1;
}

.custom-transition .lazy-component-enter-active {
  transition: all 0.5s;
}

.custom-transition .lazy-component-leave {
  opacity: 1;
}

.custom-transition .lazy-component-leave-to {
  opacity: 0;
}

.custom-transition .lazy-component-leave-active {
  transition: all 0.5s;
}
</style>
