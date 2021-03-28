<template>
    <div style="position: relative;">
        <!-- 黑色遮照 -->
        <div class="component-mask"
            ref="mask"
            style="display: none;"
            @click="handle_open_dropdown(-1)">
        </div>

        <fixed-top @change="handle_fixed_change">
            <div class="component-wrapper" ref="dom">
                <!-- head -->
                <ul class="component-head">
                    <li
                        :class="{ 'current': select_dropdown_index == 0 }"
                        @click="handle_open_dropdown(0)">
                        <label>{{ selected.category_title }}</label>
                        <img class="icon-sort" src="https://geshopimg.logsss.com/uploads/yN2pHxKoMTFC7Z3tYvOrqGBePzl890cJ.png"/>
                    </li>
                    <li
                        :class="{ 'current': select_dropdown_index == 1 }"
                        @click="handle_open_dropdown(1)">
                        <label>{{ selected.sort_title }}</label>
                        <img class="icon-sort" src="https://geshopimg.logsss.com/uploads/yN2pHxKoMTFC7Z3tYvOrqGBePzl890cJ.png"/>
                    </li>
                    <li @click="attrs.visible = true">
                        {{ languages.refine }}
                        <img src="https://geshopimg.logsss.com/uploads/zaIQB9lDPfrNVcRMdiw5YW0AU8HFsXqe.png"/>
                    </li>
                </ul>

                <div class="component-body" v-if="select_dropdown_index >= 0">
                    <!-- 分类的 -->
                    <div class="dropdown-category" v-show="select_dropdown_index === 0">
                        <child-li
                            v-for="(item, index) in category_list"
                            :key="index"
                            :data.sync="item"
                            :type="1"
                            @click="handle_select_dropdown">
                        </child-li>
                    </div>

                    <!-- 排序 -->
                    <div class="dropdown-sort" v-show="select_dropdown_index === 1">
                        <child-li
                            v-for="(item, index) in sort_list"
                            :key="index"
                            :data.sync="item"
                            :type="2"
                            @click="handle_select_dropdown">
                        </child-li>
                    </div>
                </div>
            </div>
        </fixed-top>

        <!-- 属性筛选 -->
        <attr
            ref="attr"
            :visible.sync="attrs.visible"
            :id="id"
            :languages="languages"
            @confirm="handle_confirm_attrs"
            @cancel="handle_open_dropdown" />
    </div>
</template>

<script>
// 递归选项
import childLi from './child-li';

// 属性筛选
import attr from './attr-layer';

export default {
    props: ['id', 'styles', 'datas', 'languages'],
    components: {
        childLi,
        attr
    },

    data () {
        return {
            is_fixed_top: false, // 当前是否吸顶
            select_dropdown_index: -1, // 打开哪一列的下拉菜单，0=分类，1=排序
            lock_scroll_funciton: false, // 是否锁住滚动时间，避免单击和滚动一起执行
            // 当前选择的值
            selected: {
                category_id: '', // 选择的分类ID
                category_title: this.languages.category || 'Category', // 选择的分类名
                sort_id: '', // 选择的排序ID
                sort_title: this.languages.sort || '', // 选择的排序名
                attrs: '', // 选择的属性值，格式化后的JSON字符串， { xx: ['1', '2'], yy: ['1' , '2'] }
                price_max: 0, // 最大价
                price_min: 0 // 最小价
            },
            attrs: {
                visible: false // 属性选择的弹窗控制
            }
        };
    },

    computed: {
        // 返回远端数据属否加载完毕
        remote_data_loaded () {
            return this.$store.state.page.remote_data_loaded;
        },

        // 返回当前组件的数据
        component_data () {
            try {
                return this.$store.state.page.remote_data.filter(x => x.component_id == this.id)[0].data;
            } catch (err) {
                return {
                    category_list: [],
                    sort_list: [],
                    sort_id: ''
                };
            }
        },

        // 分类列表
        category_list () {
            return this.component_data.category_list || [];
        },

        // 排序列表
        sort_list () {
            return this.component_data.sort_list || [];
        }
    },

    methods: {
        /**
         * 吸顶状态变更
         * @param {Boolean} res 吸顶控件变更结果
         */
        handle_fixed_change (res) {
            this.is_fixed_top = res;
            // 如果不吸顶的话则隐藏下拉区域
            if (res === false && this.lock_scroll_funciton === false) {
                this.handle_open_dropdown(-1);
            }
        },

        /**
         * 打开弹出层
         * @param {Number} index 选择那列的索引
         */
        handle_open_dropdown (index) {
            if (index < 0) {
                this.select_dropdown_index = -1;
            } else {
                this.lock_scroll_funciton = true; // 锁住滚动事件
                if (index === this.select_dropdown_index) {
                    this.select_dropdown_index = -1;
                } else {
                    // open dropdown
                    this.select_dropdown_index = index;
                    // 判断是否正在吸顶，如果不在吸顶状态，则把页面定位到改组件的高度
                    if (this.is_fixed_top == false) {
                        const top = $(this.$refs.dom).offset().top;
                        window.scrollTo(0, top);
                    }
                    setTimeout(() => {
                        this.lock_scroll_funciton = false;
                    }, 50);
                }
            }
            // 判断是否锁死 BODY 不能滚动
            if (this.select_dropdown_index != -1) {
                $('body').addClass('fixed-body');
                const doc_h = $(document).height();
                const dom_top = $(this.$refs.dom).offset().top;
                const dom_height = $(this.$refs.dom).height();
                $(this.$refs.mask).show().height(doc_h - dom_top - dom_height);
            } else {
                $('body').removeClass('fixed-body');
                $(this.$refs.mask).hide();
            }
        },

        /**
         * 选择分类/排序
         * @param {string} item_id 唯一ID
         * @param {string} item_title 文案
         * @param {string} type 类型，1=分类/2=排序
         */
        handle_select_dropdown (item_id, item_title, type = 1) {
            this.handle_open_dropdown(-1);
            if (type == 1) {
                this.selected.category_id = item_id;
                this.selected.category_title = item_title;
                // 清除属性选择的配置
                this.selected.attrs = '';
                this.selected.price_max = '';
                this.selected.price_min = '';
                this.$refs.attr.handle_clear();
                // 请求数据
                this.handle_update_datas('category');
            }
            if (type == 2) {
                this.selected.sort_id = item_id;
                this.selected.sort_title = item_title;
                // 请求数据
                this.handle_update_datas('sort');
            }
            // 定位到绑定组件
            this.handle_location_component();
        },

        /**
         * 确认属性选择
         * @param {Object} list 选择的属性 { xx: [], yy: [] }
         * @param {string} price_min 起始价
         * @param {string} price_max 目标价
         */
        handle_confirm_attrs (selected, price_min, price_max) {
            this.handle_open_dropdown(-1);
            this.selected.attrs = JSON.stringify(selected);
            this.selected.price_max = price_max;
            this.selected.price_min = price_min;
            this.handle_update_datas('attrs');
            // 定位到绑定组件
            this.handle_location_component();
        },

        /**
         * AJAX 获取数据
         * @param {String} type 当前请求接口的行为，category, sort, attrs
         */
        handle_update_datas (type) {
            // 绑定组件的数据中心
            const source_data_list = this.$store.state.page.goodsSKU.filter(x => x.component_id == this.datas.connection);

            // 更新绑定组件数据中心的筛选数据
            source_data_list.map(item => {
                item.filters.selected_category_id = this.selected.category_id || '';
                item.filters.selected_sort_id = this.selected.sort_id || '';
                item.filters.selected_attrs = this.selected.attrs || '';
                item.filters.price_max = this.selected.price_max;
                item.filters.price_min = this.selected.price_min;
            });

            // 更新绑定组件数据中心的分页数据
            source_data_list.map(item => {
                if (item.pagination) {
                    item.pagination.page_num = 1;
                }
            });

            // 获取数据源
            const source_data_item = source_data_list[0] || {};

            let url = '';
            if (this.$store.state.page.env == 3) {
                // 发布
                url = window.GESHOP_INTERFACE.geshopApi_page_asyncInfo.url;
            } else {
                // 装修预览
                url = window.GESHOP_INTERFACE.geshopApi_design_asyncInfo.url;
            }

            // 打开站点的遮罩效果
            window.layer && window.layer.open({ type: 2 });

            // 获取远端数据
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    page_id: this.$store.state.page.info.page_id,
                    site_code: this.$store.state.page.info.site_code,
                    pipeline: this.$store.state.page.info.pipeline,
                    lang: this.$store.state.page.info.lang,
                    component_id: [this.datas.connection, this.id].join(','),
                    user_group: this.$store.state.page.isNewGuys ? 0 : 1,
                    cookie_id: this.$store.state.page.info.od,
                    bts_unique_id: this.$store.state.page.info.bts_unique_id,
                    country_code: this.$store.state.page.info.country_code,
                    agent: 'wap',
                    // 分页
                    page_no: 1, // 页码
                    page_size: (source_data_item.pagination && source_data_item.pagination.page_size) || 20, // 分页大小
                    //
                    category_id: this.selected.category_id, // 分类id
                    sort_id: this.selected.sort_id, // 排序id
                    refine_id: this.selected.attrs, // refine筛选id字符串，用逗号隔开(Color:bule~red,Style:brief)
                    price_max: this.selected.price_max, // 最大价格字
                    price_min: this.selected.price_min // 最小价格字
                },
                success: (res) => {
                    // 关闭页面遮罩效果(站点的)
                    window.layer && window.layer.closeAll();
                    // 遍历数据结果
                    Object.keys(res.data).map(remote_component_id => {
                        // 如果是绑定的组件
                        if (remote_component_id == this.datas.connection) {
                            // 获取到远端更新的列表
                            const remote_data = res.data[remote_component_id].skuInfo[0];
                            this.$store.state.page.goodsSKU.map(source_data_item => {
                                // 找到对应的数据源
                                if (source_data_item.component_id == this.datas.connection) {
                                    source_data_item.goodsInfo = [...remote_data.goodsInfo];
                                    source_data_item.pagination.page_num = remote_data.pagination.page_num;
                                    source_data_item.pagination.page_size = remote_data.pagination.page_size;
                                    source_data_item.pagination.total_count = remote_data.pagination.total_count;
                                }
                            });
                        }
                        // 当前下拉组件的数据
                        if (remote_component_id == this.id) {
                            const refine_list = res.data[remote_component_id].refine_list;
                            const sort_list = res.data[remote_component_id].sort_list;
                            this.$store.state.page.remote_data.map(store_item => {
                                store_item.data.sort_list = [...sort_list];
                                // 如果当前的行为是分类切换，则重置属性筛选的数据
                                if (type === 'category') {
                                    // 清空属性的选择项目
                                    this.$refs.attr.handle_clear();
                                    // 更新属性的列表
                                    store_item.data.refine_list = [...refine_list];
                                }
                            });
                        }
                    });
                },
                error: () => {
                    // 关闭页面遮罩效果(站点的)
                    window.layer && window.layer.closeAll();
                }
            });
        },

        // 页面定位到当前组件绑定的商品列表组件
        handle_location_component () {
            if (!this.datas.connection) return false;
            const top = $(`[data-id="${this.datas.connection}"]`).offset().top;
            const self_height = $(this.$refs.dom).height();
            window.scrollTo(0, top - self_height);
        }
    },

    watch: {
        // 远端数据加载完毕之后执行
        remote_data_loaded () {
            // 如果有绑定组件的话，给绑定组件的数据源增加 filters 字段
            if (this.datas.connection) {
                const source_data_list = this.$store.state.page.goodsSKU.filter(x => x.component_id == this.datas.connection);
                source_data_list.map(item => {
                    if (!item.hasOwnProperty('filters')) {
                        item.filters = {};
                    }
                    item.filters.selected_category_id = this.selected.category_id || '';
                    item.filters.selected_sort_id = this.selected.sort_id || '';
                    item.filters.selected_attrs = this.selected.attrs || '';
                    // 增加关联的组件ID的字段
                    if (!item.hasOwnProperty('relation_component_id')) {
                        item.relation_component_id = [];
                    }
                    item.relation_component_id.push(this.id);
                });
            }

            // 获取商品列表选中的默认排序值
            if (this.sort_list.length > 0) {
                this.selected.sort_id = this.sort_list[0].item_id;
                this.selected.sort_title = this.sort_list[0].item_title;
            }
        }
    },

    created () {
        // 如果有绑定组件的话，给绑定组件的数据源增加 filters 字段
        if (this.datas.connection) {
            const source_data_list = this.$store.state.page.goodsSKU.filter(x => x.component_id == this.datas.connection);
            source_data_list.map(item => {
                if (!item.hasOwnProperty('filters')) {
                    item.filters = {};
                }
                item.filters.selected_category_id = this.selected_category_id || '';
                item.filters.selected_sort_id = this.selected_sort_id || '';
                item.filters.selected_attrs = this.selected.attrs || '';
                // 增加关联的组件ID的字段
                if (!item.hasOwnProperty('relation_component_id')) {
                    item.relation_component_id = [];
                }
                item.relation_component_id.push(this.id);
            });
        }
    }
};
</script>

<style lang="less" scoped>

.component-wrapper {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    color: #2D2D2D;
    font-size: 28 / 75rem;
    background-color: #fff;

    &.fixed {
        position: fixed;
        left: 0px;
        top: 45px;
        bottom: 0px;
        right: 0px;
        z-index: 1;
    }

    // head
    .component-head {
        margin: 0px;
        padding: 0px;
        display: flex;
        list-style: none;
        border-bottom: 1px solid #eaeaea;
        background: #fff;
        text-align: center;

        li {
            position: relative;
            width: 100%;
            height: 88 / 75rem;
            line-height: 88 / 75rem;
            label {
                display: inline-block;
                max-width: 200 / 75rem;
                text-overflow: ellipsis;
                overflow: hidden;
                height: 100%;
                word-break: break-all;
                vertical-align: middle;
                white-space: nowrap;
            }

            img.icon-sort {
                transform: rotate(-180deg);
            }
        }

        li.current img {
            transform: rotate(0deg);
        }
    }

    // 弹层
    .component-body {
        display: block;
        position: absolute;
        left: 0px;
        right: 0px;
        width: 100%;
        top: 90 / 75rem;
        max-height: 528 / 75rem;
        background: #fff;
        z-index: 2;
        overflow-y: auto;
        line-height: 88 / 75rem;
    }

    // 图标
    img {
        vertical-align: middle;
        transition: all .3s;
        width: 32 / 75rem;
        height: 32/ 75rem;
    }
}

// 遮罩
.component-mask {
    position: absolute;
    top: 90 / 75rem;
    left: 0px;
    right: 0px;
    background: rgba(0, 0, 0, .2);
    z-index: 1;
}

</style>
