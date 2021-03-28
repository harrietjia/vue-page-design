<template>
    <span
        v-if="Number(value) > Number(shopPrice)"
        :class="{
            'js_market_wrap': true,
            'my_shop_price': true,
            'is-del': del
        }"
        :data-orgp="value"
        :data-currency="currency"
        :data-original_amount="value">
            ${{ value }}
    </span>
</template>

<script>
/**
 * D网用的 my-shop-price
 * 其他网站 my_shop_price
 */
export default {
    name: 'unit-market-price',
    props: {
        // 价格
        value: {
            default: '0.00',
            required: true
        },
        // 售价，如果售价高于市场价，则不展示市场价
        shopPrice: {
            required: true
        },
        // 币种
        currency: {
            default: 'USD'
        },
        // 其他配置项
        config: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data () {
        return {
            // 是否展示删除线
            del: this.config.market_price_del ? Number(this.config.market_price_del) >= 1 : true
        };
    }
};
</script>

<style lang="less" scoped>
    span.is-del {
        text-decoration: line-through;
    }
</style>
