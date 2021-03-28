<template>
    <design-dialog
        :visible.sync="visible"
        wrapClassName="goods-sku-manager"
        width="1200"
        title="商品管理"
        :confirmLoading="goodsSku.loading"
        @isOk="handle_confirm"
        @isCancel="handle_cancel">

        <div style="padding-right: 24px">
            <a-button class="btn-remove" @click="handleRemove" type="primary">批量删除</a-button>
            <a-table
                class="goods_tab"
                bordered
                :columns="columns"
                :dataSource="goodsSku"
                :pagination="pagination"
                :loading="load"
                :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :scroll="{ y: 400, x: true }" :rowKey="record => record.goods_id">

                <!--序号-->
                <template slot="number" slot-scope="text, record, index">
                    <editable-cell :key="text" :text="text" @change="onCellChange(record.key, 'number', $event)"/>
                </template>

                <!--商品图片-->
                <div slot="goods_img" class="goods_img" slot-scope="text">
                    <img :src="text" />
                </div>

                <!--上下架-->
                <div slot="is_on_sale" slot-scope="record">
                    {{ record == 1 ? '是' : '否'  }}
                </div>

                <div slot="action" slot-scope="text,record">
                    <a-button type="primary" @click="handleReplace(record)">替换</a-button>
                    <a-button type="primary" @click="handleUpAndDown(record, 'up')">上移</a-button>
                    <a-button type="primary" @click="handleUpAndDown(record, 'down')">下移</a-button>
                    <a-button type="primary" @click="handleAddSku">增加</a-button>
                    <a-button type="primary" @click="removeSku(record)">删除</a-button>
                </div>
            </a-table>

            <!--增加-->
            <design-dialog
                :width="dialogAdd.width"
                :title="dialogAdd.title"
                :confirmLoading="dialogAdd.loading"
                @isOk="handleOk('add')"
                @isCancel="handleCancel('add')"
                :visible="dialogAdd.visible">

                <!--商品sku-->
                <div style="padding-right: 24px">
                    <div class="title" style="margin-bottom: 4px;">商品SKU</div>
                    <a-textarea
                        v-model="dialogAdd.skus"
                        name="goods-sku"
                        class="skus"
                        placeholder="请请输入商品编号(SKU ID), 编号之间用英文逗号隔开"
                        :rows="8"/>
                </div>

            </design-dialog>


            <!--替换-->
            <design-dialog
                :width="replaceSku.width"
                :title="replaceSku.title"
                :confirmLoading="replaceSku.loading"
                @isOk="handleOk('replace')"
                @isCancel="handleCancel('replace')"
                :visible="replaceSku.visible">

                <!--商品sku-->
                <div class="replace-goods-wrap">
                    <div class="title">商品SKU</div>
                    <a-input v-model.trim="replaceSku.skus" @blur="handleSkuBlur" placeholder="请请输入商品SKU" />
                    <div class="img">商品图片</div>
                    <div class="goods_image">
                        <img :src="replaceSku.goods_image" />
                    </div>
                </div>

            </design-dialog>


        </div>

    </design-dialog>
</template>

<script>
import EditableCell from './EditableCell.vue'

const columns = [
    {
        title: '序号',
        align: 'center',
        dataIndex: 'number',
        key: 'number',
        width: 100,
        scopedSlots: { customRender: 'number' }
    },
    { title: '商品ID', align: 'center', dataIndex: 'goods_id', key: 'goods_id', width: 96 },
    { title: '商品SKU', align: 'center', dataIndex: 'goods_sn', key: 'goods_sn', width: 120},
    { title: '商品标题', align: 'center', dataIndex: 'goods_title', key: 'goods_title', width: 170 },
    {
        title: '商品图片',
        align: 'center',
        dataIndex: 'goods_img',
        key: 'goods_img',
        width: 92,
        scopedSlots: { customRender: 'goods_img' }
    },
    {
        title: '上架',
        align: 'center',
        dataIndex: 'is_on_sale',
        key: 'is_on_sale',
        width: 100,
        scopedSlots: { customRender: 'is_on_sale' }
    },
    { title: '促销利润比', align: 'center', dataIndex: 'promte_percent', key: 'promte_percent',  width: 100},
    { title: '库存', align: 'center', dataIndex: 'goods_number', key: 'goods_number' },
    {
        title: '操作',
        align: 'center',
        key: 'operation',
        width: 300,
        scopedSlots: { customRender: 'action' },
    }
];

/**
 * 组件内部函数
 */
const helper = {
    /**
     * 更新表格数据的序号
     * @param {array} list 数据列表
     * @returns {Array}
     */
    update_table_index (list) {
        return [...list].map((item, index) => {
            item.key = index + 1;
            item.number = index + 1;
            return item;
        });
    }
}

export default {
    name: 'goods-sku',
    props: {
        // 弹窗是否展示
        visible: {
            type: Boolean,
            default: false,
        },
        skus: {
            type: String
        },
        loading: {
            type: Boolean
        }
    },
    components: {
        EditableCell,
    },

    data() {
        return {
            pagination: false, // 不分页
            load: this.loading,
            goodsSku: [], // 商品Sku
            selectedRowKeys: [], // 复选框选中
            columns,
            dialogAdd: {
                width: 800,
                title: '商品新增',
                loading: false,
                visible: false,
                skus: ''
            },
            replaceSku: {
                width: 380,
                title: '商品替换',
                loading: false,
                visible: false,
                skus: '',
                goods_image: ''
            },
            sku: this.skus,
            selectedRows: []
        }
    },

    watch: {
        // 打开弹窗，获取SKU的商品数据
        visible (newVal) {
            newVal == true && this.getGoodsSku(this.skus);
        },
        goodsSku () {
            this.load = false;
        }
    },

    methods: {

        /**
         * 获取 goodsSku
         */
        async getGoodsSku (goods_sku) {
            // 重置变量
            this.selectedRows = [];
            this.selectedRowKeys = [];

            // 获取页面全局变量
            const { lang, page_id, pipeline } = this.$store.state.page.info;
            const request = {
                page: 1,
                limit: 100,
                skus: goods_sku,
                lang,
                pipeline,
                pageId: page_id
            }
            // 请求AJAX
            const res = {}
            if (res.code == 0) {
                const list = helper.update_table_index(res.data);
                this.goodsSku = [...list];
            }
        },

        // 复选框
        onSelectChange (selectedRowKeys, selectedRows) {
            this.selectedRowKeys = selectedRowKeys;
            this.selectedRows = selectedRows;
        },

        /**
         * 序号修改, 列表重新排序
         */
        onCellChange (key, dataIndex, value) {
            const dataSource = [...this.goodsSku];
            let sku_index = key - 1; // sku下标
            let length = dataSource.length;

            const target = dataSource.find(item => item.key === key);
            if (target) {
                dataSource.splice(sku_index, 1); // 删除当前下标元素

                // 输入的序号大于goodsSKU长度
                if (Number(value) > length) {
                    target[dataIndex] = length;
                    dataSource.splice(length - 1, 0, target); // 插入当前元素
                } else {
                    target[dataIndex] = value;
                    dataSource.splice(Number(value) - 1, 0, target); // 插入当前元素
                }

                // 重置
                dataSource.map((item, index) => {
                    item.key = index + 1;
                    item.number = index + 1;
                    return item;
                });
                this.goodsSku = [...dataSource];
            }
        },

        /**
         * 批量删除
         */
        handleRemove () {
            if (this.selectedRows.length == 0) {
                return this.$message.error('请选择删除商品SKU');
            }

            this.$confirm({
                title: '提示',
                content: '确定删除此商品吗？删除后，商品将不再列表中展示！' ,
                onOk: () => {
                    // 即将删除的SKU
                    const will_delete_skus = this.selectedRows.map(x => x.goods_sn);
                    // 过滤剩下的数据
                    const filter_table_goods = this.goodsSku.filter(x => !will_delete_skus.includes(x.goods_sn));
                    // 更新table的序号排序
                    this.goodsSku = filter_table_goods.map((item, index) => {
                        item.key = index + 1;
                        item.number = index + 1;
                        return item;
                    });
                    // 重置
                    this.selectedRows = [];
                    this.selectedRowKeys = [];
                },
                onCancel: () => {
                    this.selectedRows = [];
                    this.selectedRowKeys = [];
                }
            });
        },

        /**
         * 上移，下移
         * @param {string} record 表格序号
         * @param {string} type 类型, up=上, down=下
         */
        handleUpAndDown (record, type) {
            const key = record.key - 1; // 当前元素下标
            let goods = [...this.goodsSku];

            switch (type) {
                // 上移
                case 'up':
                    if (key <= 0) {
                        return false;
                    }
                    this.upKey = key - 1; // 目标元素下标
                    break;
                // 下移
                case 'down':
                    if (record.key >= goods.length) {
                        return false;
                    }
                    this.upKey = key + 1; // 目标元素下标
                    break;
            }
            goods.splice(key, 1); // 删除当前下标元素
            goods.splice(this.upKey, 0, record); // 插入元素
            // 更新表格顺序
            goods = helper.update_table_index(goods);
            this.goodsSku = [...goods];
        },

        /**
         * 增加 SKU
         */
        handleAddSku () {
            this.dialogAdd.skus = '';
            this.dialogAdd.visible = true;
        },

        /**
         * 删除sku
         * @param {string} goods_sn 商品的SKU
         */
        removeSku ({ goods_sn }) {
            this.$confirm({
                title: '提示',
                content: '确定删除此商品吗？删除后，商品将不再列表中展示！' ,
                onOk: () => {
                    // 过滤sku
                    let list = this.goodsSku.filter(x => x.goods_sn != goods_sn);
                    // 更新表格序号
                    list = helper.update_table_index(list);
                    // 更新表格数据
                    this.goodsSku = [...list];
                    // 重置选项
                    this.selectedRows = [];
                    this.selectedRowKeys = [];
                },
                onCancel: () => {
                    this.selectedRows = [];
                    this.selectedRowKeys = [];
                }
            });

        },

        // ok
        async handleOk (type) {
            const self = this;
            const info = this.$store.state.page.info;
            const request = {
                pipeline: info.pipeline,
                lang: info.lang,
                pageId: info.page_id
            };
            switch (type) {
                case 'add':
                    // 去重
                    const add_sku = self.dialogAdd.skus;
                    const obj = self.getUnique(add_sku.split(','));
                    if (obj.repeatList.length) {
                        self.$message.error('商品SKU ' + obj.repeatList.join(',') + ' 去重');
                        this.dialogAdd.skus = obj.newArr.join(','); // 重新赋值
                        return false;
                    }

                    // sku是否存在
                    const skuArr = this.sku.split(',');
                    const newArr = skuArr.concat(add_sku.split(','));
                    const oData = this.getUnique(newArr);

                    if (oData.repeatList.length) {
                        self.$message.error('商品SKU ' + oData.repeatList.join(',') + ' 已存在');
                        // 清除存在sku
                        const skusArr = add_sku.split(',');
                        const newSkusArr = [];
                        for (let item of skusArr) {
                            let target = oData.repeatList.find(i => i == item);
                            if (!target) {
                                newSkusArr.push(item);
                            }
                        }
                        this.dialogAdd.skus = newSkusArr.join(','); // 重新赋值
                        return false;
                    }
                    request.skus = this.dialogAdd.skus;

                    if (request.skus == '') {
                        return false;
                    }
                    const res = {}
                    if (res.code == 0) {
                        // 重新获取列表
                        this.dialogAdd.visible = false;
                        this.sku = this.sku + ',' + this.dialogAdd.skus; // 拼接sku
                        this.getGoodsSku(this.sku);
                    }
                    break;
                case 'replace':
                    if (this.replaceSku.skus == '') {
                        self.$message.error('请输入商品SKU');
                        return false;
                    }
                    request.skus = this.replaceSku.skus;
                    // sku存在，不能替换
                    const target = this.sku.split(',').find(item => item == request.skus);
                    if (target) {
                        self.$message.error('商品SKU ' + request.skus + ' 已存在');
                        return false;
                    }
                    const data = {}
                    if (data.code == 0) {
                        // 重新获取列表
                        this.replaceSku.visible = false;

                        // 转换数组，替换当前sku
                        const skus = this.sku.split(',');
                        const replaceSku = skus.map(item => {
                            if (item == self.repalceSkuItem.goods_sn) {
                                item = self.replaceSku.skus
                            }
                            return item;
                        });
                        this.sku = replaceSku.join(','); // 拼接sku
                        this.getGoodsSku(this.sku);
                    }
                    break;
            }
        },

        // 去重
        getUnique (skuArr) {
            const obj = {};
            let newArr = [];
            let repeatList = [];
            for (let item of skuArr) {
                if (newArr.indexOf(item) === -1) {
                    newArr.push(item);
                }else{
                    if(repeatList.indexOf(item) === -1){
                        repeatList.push(item);
                    }
                }
            }
            obj.newArr = newArr;
            obj.repeatList = repeatList;
            return obj;
        },

        // cancel
        handleCancel (type) {
            switch (type) {
                case 'add':
                    this.dialogAdd.visible = false;
                    break;
                case 'replace':
                    this.replaceSku.visible = false;
                    break
            }
        },

        // 替换
        handleReplace (record) {
            this.replaceSku.skus = '';
            this.replaceSku.visible = true;
            this.replaceSku.goods_image = record.goods_img;
            // 记录替换当前sku
            this.repalceSkuItem = record;
        },

        // sku 失去焦点
        async handleSkuBlur () {
            if (this.replaceSku.skus == '') {
                return false;
            }
            if (this.replaceSku.skus.indexOf(',') != -1) {
                this.$message.error('请输入单个商品SKU');
                return false;
            }
            const info = this.$store.state.page.info;
            const request = {
                skus: this.replaceSku.skus,
                pipeline: info.pipeline,
                lang: info.lang,
                pageId: info.page_id
            };
            const res = {}
            if (res.code == 0) {
                try {
                    let image = res.data[0].goods_img;
                    this.replaceSku.goods_image = image;
                } catch (e) {}
            }
        },

        /**
         * 确认按钮
         */
        handle_confirm () {
            // 获取最新的排序
            this.sku = this.goodsSku.map(x => x.goods_sn).join(',');
            // 更新SKU
            this.$emit('update:skus', this.sku);
            // 更新UI
            this.$emit('update:visible', false);
        },

        /**
         * 取消按钮
         */
        handle_cancel () {
            this.$emit('update:visible', false);
        }
    }
}
</script>


<style lang="less" scoped>

    .btn-remove {
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .goods_tab {
        // 序号
        .number {
            width: 80px;
            margin-left: 10px;
        }

        .goods_img {
            height: 60px;

            & > img {
                width: auto;
                height: auto;
                max-height: 100%;
                max-width: 100%;
            }
        }

        .ant-checkbox-wrapper, .ant-checkbox-wrapper + .ant-checkbox-wrapper {
            margin-right: 0px !important;
        }
    }


    .replace-goods-wrap {
        padding-right: 22px;

        .title {
            margin-bottom: 6px;
        }

        .img {
            margin-top: 12px;
            margin-bottom: 6px;
        }

        .goods_image {
            height: 440px;

            & > img {
                width: auto;
                height: auto;
                max-height: 100%;
                max-width: 100%;
            }
        }
    }
</style>

<style lang="less">
    // SKU 管理弹窗
    .goods-sku-manager {
        // 选项按钮
        .ant-btn {
            padding: 0 8px;
        }
        // 表头
        .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
            padding: 16px 0px !important;
        }
    }
</style>
