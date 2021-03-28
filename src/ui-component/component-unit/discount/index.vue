<template>
    <div
        class="ui-unit-discount"
        :style="style_body"
        v-if="visible">

        <span class="bold">

            <!-- 类型1 -->
            <template v-if="type == 1">
                {{ value_parse }}%<br/><i>OFF</i>
            </template>

            <!-- 类型2 -->
            <template v-else>
                -{{ value_parse }}%
            </template>

        </span>

    </div>
</template>

<script>
export default {
    name: 'unit-discount',
    props: {
        value: {
            default: 0
        },
        config: {
            type: Object,
            required: true
        }
    },
    computed: {
        /**
         * 控制是否展示
         * 1. 装修页强制展示
         * 2. 小于0隐藏
         */
        visible () {
            let visible = (this.config.discount_show === undefined || this.config.discount_show === null) ? true : Number(this.config.discount_show) >= 1;
            if (Number(this.value) <= 0) {
                visible = false;
            }
            return visible;
        },
        /**
         * 折扣标的类型
         * @default 2
         * @example
         * 1 =  **%OFF
         * 2 =  -***%
         */
        type () {
            return this.config.discount_type || 1;
        },
        /**
         * 折扣标的右边距
         */
        right () {
            return 0;
        },
        /**
         * 折扣标的上边距
         */
        top () {
            return 0;
        },
        /**
         * 整体宽度
         */
        width () {
            return 80;
        },
        /**
         * 整体高度
         */
        height () {
            return 80;
        },
        // 折扣标的自定义样式
        style_body () {
            const style = {
                width: this.$px2rem(this.width),
                height: this.$px2rem(this.height),
                right: this.$px2rem(this.right),
                top: this.$px2rem(this.top),
                color: this.config.discount_font_color || '#fff'
            };
            if (this.config.discount_bg_image) {
                style['background-image'] = `url("${this.config.discount_bg_image}")`;
                style['border-radius'] = 0;
            } else {
                style['background-color'] = this.config.discount_bg_color || '#333333';
            }
            return style;
        },

        // 计算值，四舍五入
        value_parse () {
            const nval = Math.round(this.value);
            if (nval <= 0) {
                return 0;
            }
            if (nval >= 100) {
                return 100;
            }
            return nval;
        }
    }
};
</script>

<style lang="less" scoped>
    // 浮动折扣标
    .ui-unit-discount {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 80 / 75rem;
        height: 80 / 75rem;
        border-radius: 100%;
        overflow: hidden;
        z-index: 1;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        > span {
            font-size: 24 / 75rem;
            line-height: 22 / 75rem;
            > i {
                font-size: 22 / 75rem;
                font-style: normal;
                font-weight: 400;
                font-family: OpenSans-Regular,arial,serif;
            }
        }
    }
</style>
