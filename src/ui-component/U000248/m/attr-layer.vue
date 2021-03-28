<template>
    <div>
        <div class="mask" v-show="visible" @click="$emit('update:visible', false)"></div>

        <div class="component-attr" :class="{ 'show': visible }">

            <!-- 属性组列表 -->
            <div class="attr-groups-list">

                <!-- 属性组 -->
                <template v-for="(group, groupIndex) in refine_list">
                    <div
                        v-if="group.child_item.length > 0"
                        class="attr-group"
                        :class="{ 'close': !open_group.includes(groupIndex) }"
                        :key="groupIndex">

                        <div class="attr-group-head" @click="handle_open(groupIndex)">
                            <label class="bold">{{ group.item_title }}</label>

                            <!-- 收缩按钮 -->
                            <img src="https://geshopimg.logsss.com/uploads/yN2pHxKoMTFC7Z3tYvOrqGBePzl890cJ.png">

                            <!-- 已选择的数量 -->
                            <span v-if="get_group_selected_attr_count(group.child_item || []) > 0">
                                {{ get_group_selected_attr_count(group.child_item || []) }}
                            </span>
                        </div>

                        <!-- 属性子项 -->
                        <ul class="attr-group-body" v-if="group.item_id == 'customPrice'">
                            <div class="price-layer">
                                <input v-model="price_min" type="number" class="bold" pattern="\d*">
                                <span></span>
                                <input v-model="price_max" type="number" class="bold" pattern="\d*">
                            </div>
                        </ul>

                        <!-- 多选的项目子项 -->
                        <ul class="attr-group-body" v-else>
                            <template v-for="(attr, attrIndex) in group.child_item" >
                                <li
                                    v-if="attr.item_id != ''"
                                    :key="attrIndex"
                                    :class="{ 'active': selected_attrs.includes(attr.item_id) }"
                                    @click="handle_select(attr.item_id)">
                                    <!-- 颜色块 -->
                                    <!-- <span v-if="group.item_type == 1" class="color-span"></span> -->
                                    {{ attr.item_title }}
                                </li>
                            </template>
                        </ul>
                    </div>
                </template>
            </div>

            <div class="btn-layer">
                <button @click="handle_clear">{{ languages.clear }}</button>
                <button class="apply" @click="handle_confirm">{{ languages.apply }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['visible', 'id', 'languages'],
    data () {
        return {
            open_group: [], // 记录打开的目录
            selected_attrs: [], // 记录选中的属性 []
            price_max: '', // 最大价格
            price_min: '', // 最小价格,
            currency: 'USD'
        };
    },

    computed: {
        // 属性列表
        refine_list () {
            try {
                const res = this.$store.state.page.remote_data.filter(x => x.component_id == this.id);
                const list = [...res[0].data.refine_list];
                list.unshift({
                    item_id: 'customPrice',
                    item_title: (this.languages.price_range || 'Price Range') + `(${this.currency})`,
                    child_item: [{}]
                });
                return list;
            } catch (err) {
                return [];
            }
        }
    },

    methods: {
        /**
         * 展开或关闭
         * @param {Number} index 数组索引
         */
        handle_open (index) {
            if (this.open_group.includes(index)) {
                this.open_group = this.open_group.filter(x => x != index);
            } else {
                this.open_group.push(index);
            }
        },
        
        /**
         * 选择属性
         */
        handle_select (attr_id) {
            if (this.selected_attrs.includes(attr_id)) {
                this.selected_attrs = this.selected_attrs.filter(x => x != attr_id);
            } else {
                this.selected_attrs.push(attr_id);
            }
        },

        /**
         * 确定操作
         * @returns {oebject} 选中的属性的ID, { "Color": ['red', 'black']}
         * @returns {number} 最小值
         * @returns {number} 最大值
         */
        handle_confirm () {
            this.$emit('update:visible', false);
            // 组装请求的数据格式
            const all_selected = {};
            this.refine_list.map(group => {
                const group_id = group.item_id;
                const group_selected = [];
                group.child_item.map(item => {
                    // 如果有选择的
                    if (this.selected_attrs.includes(item.item_id)) {
                        group_selected.push(item.item_id);
                    }
                });
                if (group_selected.length > 0) {
                    all_selected[group_id] = [...group_selected];
                }
            });
            // 计算汇率
            const { price_min, price_max } = this.helper_compute_huilv('USD');
            // 提交数据
            this.$emit('confirm', all_selected, price_min, price_max);
        },

        /**
         * 关闭操作
         */
        handle_cancel () {
            this.$emit('update:visible', false);
            this.$emit('cancel', -1);
        },

        /**
         * 重置表单操作
         */
        handle_clear () {
            this.selected_attrs = [];
            this.price_max = '';
            this.price_min = '';
        },

        /**
         * 获取改分组下，选择的属性数量
         */
        get_group_selected_attr_count (attrs) {
            const filter = attrs.filter(x => {
                return this.selected_attrs.includes(x.item_id);
            });
            return filter.length;
        },

        /**
         * 计算汇率到美元结算
         * @param {string} 最终结算币种，默认USD
         * @returns {Object} price.min 最低价格
         * @returns {Object} price.max 最高价格
         */
        helper_compute_huilv (code = 'USD') {
            if (window.my_array) {
                let huilv = 1;
                Object.keys(window.my_array).map(code => {
                    if (code === this.currency) {
                        huilv = window.my_array[code] || 1;
                    };
                });
                // 计算美元价格
                const price_min_usd = !!this.price_min ? (this.price_min / huilv).toFixed(2) : 0;
                const price_max_usd = !!this.price_max ? (this.price_max / huilv).toFixed(2) : 0;
                if (code == 'USD') {
                    return {
                        price_min: price_min_usd,
                        price_max: price_max_usd
                    };
                } else {
                    let huilv2 = window.my_array[code];
                    return {
                        price_min: !!price_min_usd ? (price_min_usd * huilv2).toFixed(2) : '',
                        price_max: !!price_max_usd ? (price_max_usd * huilv2).toFixed(2) : ''
                    };
                };
            } else {
                return {
                    price_min: this.price_min,
                    price_max: this.price_max
                };
            }
        }
    },

    watch: {
        visible (newVal) {
            // 判断是否锁死BODY不能滚动
            if (newVal) {
                $('body').addClass('fixed-body');
            } else {
                $('body').removeClass('fixed-body');
            }
            // 如果币种更新了，重新计算价格
            const new_bizhong = $.cookie('bizhong') || 'USD';
            if (this.currency != new_bizhong) {
                // 更新汇率价格
                const { price_min, price_max } = this.helper_compute_huilv(new_bizhong);
                this.price_min = price_min;
                this.price_max = price_max;
                // 更新币种
                this.currency = new_bizhong;
            }
        },
        refine_list (newVal) {
            // 增加是否展开的配置
            this.open_group = [0];
        }
    },

    created () {
        // 默认展示第一行
        Array.isArray(this.refine_list) && this.open_group.push(0);
        // 货币编码
        this.currency = ($.cookie && $.cookie('bizhong')) || 'USD';
    }
};
</script>

<style lang="less" scoped>
// 这招
.mask {
    position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 99999;
    background: rgba(0, 0, 0, .5);
}

// 属性
.component-attr {
    position: fixed;
    top: 0px;
    right: -640 / 75rem;
    bottom: 0px;
    width: 640 / 75rem;
    background: #fff;
    z-index: 99999;
    overflow: hidden;
    box-sizing: border-box;
    transition: transform .3s;
    &.show {
        transform: translate3d(-100%, 0, 0);
    }
}

.attr-groups-list {
    position: absolute;
    padding: 24 / 75rem;
    top: 0;
    left: 0rem;
    right: 0rem;
    bottom: 120 / 75rem;
    overflow-y: scroll;
}

.attr-group.close {
    img {
        transform: rotate(-180deg);
    }
    .attr-group-body {
        display: none;
    }
}

// 属性组标题
.attr-group-head {
    line-height: 88 / 75rem;
    label {
        color: #2D2D2D;
        font-size: 28 / 75rem;
    }
    span {
        width: 32 / 75rem;
        height: 32 / 75rem;
        line-height: 32 / 75rem;
        background:rgba(204,204,204,1);
        border-radius: 100%;
        display: inline-block;
        text-align: center;
        float: right;
        font-size: 18 / 75rem;
        color: #fff;
        margin-top: (88 - 32) / 2 / 75rem;
        margin-right: 10 / 75rem;
    }
    img {
        width: 28 / 75rem;
        height: 28 / 75rem;
        float: right;
        vertical-align: middle;
        margin-top: (88 - 28) / 2 / 75rem;
        transition: all .3s;
    }
}

// 属性子项
.attr-group-body {
    padding-top: 10 / 75rem;
    font-size: 0px;
    li {
        display: inline-block;
        padding: 0 24 / 75rem;
        line-height: 52 / 75rem;
        font-size: 24 / 75rem;
        background: #F7F7F7;
        margin-bottom: 24 / 75rem;
        margin-right: 24 / 75rem;
        border-radius: 4 / 75rem;
        border: 2 / 75rem solid #F7F7F7;
    }
    li.active {
        background: #fff;
        border-color:#2D2D2D;
        color: #2D2D2D;
    }
    .color-span {
        display: inline-block;
        vertical-align: middle;
        width:28 / 75rem;
        height:28 / 75rem;
        border-radius: 100%;
        background:rgba(194,81,234,1);
    }
}

// 价格区间的
.price-layer {
    display: flex;
    flex-wrap: nowrap;
    height: 56 / 75rem;
    justify-content: space-between;
    align-items:center;
    font-size: 28 / 75rem;
    input {
        width:  228 / 75rem;
        border: none;
        height: 100%;
        padding: 0px;
        background: #F7F7F7;
        text-align: center;
    }
    span {
        display: block;
        width: 76 / 75rem;
        height: 2 / 75rem;
        background-color: #DDDDDD;
    }
}

// 确认按钮
.btn-layer {
    position: absolute;
    left: 24 / 75rem;
    right: 24 / 75rem;
    bottom: 24 / 75rem;
    font-size: 28 / 75rem;
    button {
        text-align: center;
        width:280 / 75rem;
        height:72 / 75rem;
        color: #666;
        border-radius:4 / 75rem;
        border: 2 / 75rem solid #666666;
        background-color: #fff;
        box-sizing: border-box;
    }
    button.apply {
        margin-left: 16 / 75rem;
        background: #2D2D2D;
        color: #fff;
        border-color: #2D2D2D; 
    }
}
</style>
