<template>
  <!--数据配置-->
  <design-dialog
      :visible="visible"
      :width="960"
      wrapClassName="dialog-goods-source-manager"
      title="已选商品数据"
      :confirmLoading="loading"
      @isOk="handleConfirm"
      @isCancel="handleCancel">

    <div class="container-body">
      <a-table
          :columns="tableColumns"
          :data-source="goods_list"
          bordered>
        <a slot="goods_img" slot-scope="text">
          <img :src="text" height="50px">
        </a>
        <span slot="action" slot-scope="record">
                    <a @click="handleRemoveItem(record)">Delete</a>
                </span>
        <template slot="footer">
          <a-button @click="openSource">添加商品</a-button>
        </template>
      </a-table>
    </div>

    <goods-manager
        ref="goodsManager"
        @onComfirm="update_goods_list"/>

  </design-dialog>
</template>

<script>

	// 商品数据
	import goodsManager from '@/system-components/dialog-goods-manager/index.vue';

	export default {
		name: 'goods-source-manager',

		data() {
			return {
				// 是否展示
				visible: false,
				loading: false,
				goods_list: [],
				tableColumns: [
					{
						dataIndex: 'goods_img',
						key: 'goods_img',
						title: 'Image',
						scopedSlots: {customRender: 'goods_img'},
					},
					{
						title: 'ID',
						key: 'goods_id',
						dataIndex: 'goods_id',
					},
					{
						title: 'Title',
						key: 'goods_title',
						dataIndex: 'goods_title',
					},
					{
						title: 'Price',
						key: 'shop_price',
						dataIndex: 'shop_price',
					},
					{
						title: 'Sku',
						key: 'goods_sn',
						dataIndex: 'goods_sn',
					},
					{
						title: 'Action',
						key: 'action',
						scopedSlots: {customRender: 'action'},
					},
				]
			};
		},

		components: {
			goodsManager
		},

		methods: {

			/**
			 * 打开弹窗
			 * @param {Array} list 商品列表
			 */
			show(list = []) {
				this.visible = true;
				this.goods_list = [...list];
			},

			/**
			 * 删除商品
			 */
			handleRemoveItem(row) {
				this.goods_list = this.goods_list.filter(x => x.goods_sn != row.goods_sn);
			},

			/**
			 * 弹窗按钮 - 确认
			 */
			handleConfirm() {
				this.$emit('confirm', this.goods_list);
				this.visible = false;
			},

			/**
			 * 弹窗按钮 - 取消
			 */
			handleCancel() {
				this.visible = false;
			},

			/**
			 * 打开数据源
			 */
			openSource() {
				this.$refs.goodsManager.show(this.goods_list);
			},

			/**
			 * 更新商品列表
			 */
			update_goods_list(list) {
				this.goods_list = [...list];
			}
		}
	}
</script>

<style lang="less" scoped>
  // 容器
  .container-body {
    height: 50vh;
    overflow: auto;
    .goods-list {
      list-style: none;
      padding: 0;
      margin: 0px;
      display: flex;
      flex-wrap: wrap;
      > li {
        width: 80px;
        height: 80px;
        margin-right: 14px;
        margin-bottom: 14px;
        > img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
