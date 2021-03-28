<template>
    <div
        v-if="visible"
        ref="dom"
        :data-id="id"
        style="text-align:center; margin-top: 10px;">

        <img
            src="https://css.zafcdn.com/imagecache/MZF/images/loading_zf.gif"
            style="width: .96rem; height: .96rem" />

    </div>
</template>

<script>

export default {
    name: 'unit-load-more',
    props: {
        // 业务组件的ID
        cid: {
            required: true
        },
        // 数据源ID
        source_data_id: {
            default: ''
        }
    },

    data () {
        const observer = new window.IntersectionObserver((changes) => {
            const match = changes.filter(x => x.isIntersecting === true);
            match.map(x => {
                const target_id = x.target.getAttribute('data-id') || null;
                if (target_id == this.id) {
                    this.get_next_page_list();
                }
            });
        });
        return {
            id: 'M' + new Date().getTime(), // 当前加载更多组件的唯一标识ID
            current_page: 1, // 当前页码
            total_page: 10, // 最大页码
            visible: true,
            observer // API实例
        };
    },

    methods: {
        /**
         * 获取下一页的数据
         */
        get_next_page_list () {
            // 绑定组件的数据中心
            const source_data = this.$store.state.page.goodsSKU.filter(x => {
                return x.component_id == this.cid && x.id == this.source_data_id;
            })[0];

            // 获取所有关联的组件ID
            const relation_component_id = [...source_data.relation_component_id || ''];
            relation_component_id.push(this.cid);

            // 判断是否已经最后一页
            if (source_data.pagination.page_num * source_data.pagination.page_size >= source_data.pagination.total_count) {
                this.visible = false;
                this.observer.unobserve(this.$refs.dom);
                return false;
            }

            // 基础传参数
            const request = {
                component_id: relation_component_id.join(','), // 绑定的组件
                page_no: source_data.pagination.page_num + 1,
                page_size: source_data.pagination.page_size || 20 // 分页大小
            };

            // 判断是否有属性筛选
            if (source_data.filters) {
                const e = source_data.filters;
                request.category_id = e.selected_category_id; // 分类id
                request.sort_id = e.selected_sort_id; // 排序id
                request.refine_id = e.selected_attrs; // refine筛选id字符串，用逗号隔开(Color:bule~red,Style:brief)
                request.price_max = e.price_max; // 最大价格字
                request.price_min = e.price_min; // 最小价格字
            };

            // 请求数据
            this.$store.dispatch('page/load_remote_goods_data', {
                data: request,
                callback: (res) => {
                    // 获取到远端更新的列表
                    const remote_data = res.data[this.cid].skuInfo[0];
                    this.$store.state.page.goodsSKU.map(source_data_item => {
                        // 找到对应的数据源
                        if (source_data_item.component_id == this.cid) {
                            if (source_data_item.id === this.source_data_id) {
                                // 数据追加
                                remote_data.goodsInfo.map(goodsItem => {
                                    source_data_item.goodsInfo.push(goodsItem);
                                });
                                // 分页配置
                                source_data_item.pagination.page_num = remote_data.pagination.page_num;
                                source_data_item.pagination.page_size = remote_data.pagination.page_size;
                                source_data_item.pagination.total_count = remote_data.pagination.total_count;
                            }
                        }
                    });
                }
            });
        },

        /**
         * 追加下一页的数据到数据中心
         * @param {Array} list
         */
        append_next_page_list (list) {
            this.$store.state.page.goodsSKU.map(x => {
                if (x.component_id == this.cid) {
                    list.map(y => {
                        x.goodsInfo.push(y);
                    });
                }
            });
        }
    },
    mounted () {
        this.visible = this.$store.state.page.env != 1;
        if (this.visible) {
            this.observer.observe(this.$refs.dom);
        }
    }
};
</script>
