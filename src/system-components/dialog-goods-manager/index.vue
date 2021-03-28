<template>
  <design-dialog
      :visible.sync="visible"
      wrapClassName="goods-sku-manager"
      width="1200px"
      title="选择添加商品"
      @isOk="handle_confirm"
      @isCancel="handle_cancel">

    <div style="height:50vh;overflow:auto">
      <div v-if="config.choose === 'good' && goods_type === 'list'">
        <a-select style="width: 200px" v-model="goods_status" @change="currentChange(1)">
          <a-select-option value="">
            商品状态
          </a-select-option>
          <a-select-option value="1">
            上架
          </a-select-option>
          <a-select-option value="0">
            下架
          </a-select-option>
        </a-select>

        <a-select style="width: 200px" v-model="search_goods_type" @change="currentChange(1)">
          <a-select-option value="">
            商品类型
          </a-select-option>
          <a-select-option value="is_new">
            新品
          </a-select-option>
          <a-select-option value="is_hot">
            热卖
          </a-select-option>
          <a-select-option value="is_recommand">
            推荐
          </a-select-option>
          <a-select-option value="is_discount">
            促销
          </a-select-option>
        </a-select>

        <a-input style="width: 45%;margin-bottom: 10px;margin-right: 10px" v-model.trim="keywords" placeholder="请输入关键字搜索">
        </a-input>
        <a-button style="width:90px;" type="primary" @click.stop="currentChange(1)">搜索</a-button>
      </div>
      <div v-else-if="config.choose === 'group' || config.choose === 'rush' ">
        <a-select style="width: 200px" v-model="time_status1" @change="currentChange(1)" v-if="config.choose === 'group'">
          <a-select-option value="">
            活动状态
          </a-select-option>
          <a-select-option value="1">
            未开始
          </a-select-option>
          <a-select-option value="2">
            进行中
          </a-select-option>
        </a-select>

        <a-select style="width: 200px" v-model="time_status2" @change="currentChange(1)" v-if="config.choose === 'rush'">
          <a-select-option value="">
            活动状态
          </a-select-option>
          <a-select-option value="1">
            未开始
          </a-select-option>
          <a-select-option value="2">
            活动中
          </a-select-option>
        </a-select>

        <a-input style="width: 65%;margin-bottom: 10px;margin-right: 10px" v-model.trim="keywords" placeholder="请输入关键字搜索">
        </a-input>
        <a-button style="width:90px;" type="primary" @click.stop="currentChange(1)">搜索</a-button>
      </div>
      <div v-else-if="(config.choose === 'good' && goods_type === 'tag') || (config.choose === 'good' && goods_type === 'category')">
      </div>
      <div v-else>
        <a-input style="width: 85%;margin-bottom: 10px;margin-right: 10px" v-model.trim="keywords" placeholder="请输入关键字搜索">
        </a-input>
        <a-button style="width:90px;" type="primary" @click.stop="currentChange(1)">搜索</a-button>
      </div>
      <div>

        <div v-if="goods_type === 'tag' || goods_type === 'category'" style="padding: 10px 200px">
          <el-tree
              :data="main_page_list"
              show-checkbox
              node-key="id"
              icon-class="iconfont icon-advertise-next"
              ref="tree"
              highlight-current
              @check="handleCheck"
              :props="defaultProps">
          </el-tree>
        </div>

        <div v-if="goods_type !== 'tag' && goods_type !== 'category'">
          <a-table class="goods_tab"
                   :row-selection="{ selectedRowKeys: selectedRowKeys, onSelect: onSelectChange, onSelectAll:onSelectAll }"
                   :columns="columns" rowKey="id"
                   :data-source="main_page_list"
                   :pagination="false"
          >
            <div slot="goods_title" slot-scope="text, record">
              <span v-if="record.goods">{{record.goods.title}}</span>
            </div>
            <div slot="goods_img" class="goods_img" slot-scope="text, record">
              <img :src="record.thumb"/>
            </div>
            <div slot="goods_group_img" class="goods_img" slot-scope="text, record">
              <img  v-if="record.goods" :src="record.goods.thumb"/>
            </div>
            <div slot="price" slot-scope="text, record">
              <span v-if="record.goods">{{record.group_price}}</span>
            </div>
            <div slot="stock" slot-scope="text, record">
              <span v-if="record.goods">{{record.goods.price}}</span>
            </div>


            <div slot="store_name" slot-scope="text, record">
              <div class="store_box">
                <div style="flex: 0 0 100px;margin-right: 10px;"><img :src="record.thumb"/></div>
                <span style="flex: 1;text-align: left;align-self: center;">{{record.store_name}}</span>
              </div>
            </div>

            <div slot="hotel_name" slot-scope="text, record">
              <div class="store_box">
                <div style="flex: 0 0 100px;margin-right: 10px;"><img :src="record.thumb"/></div>
                <span style="flex: 1;text-align: left;align-self: center;">{{record.hotel_name}}</span>
              </div>
            </div>
          </a-table>

        </div>

      </div>

    </div>

    <div style="position: absolute;bottom: 80px;left: 50%;transform: translateX(-50%);">
      <a-pagination
          style="margin-top: 15px;text-align: center"
          showQuickJumper
          :pageSize="main_page_pagination.pageSize"
          :current="main_page_pagination.current"
          :total="main_page_pagination.total"
          @change="currentChange"/>
    </div>

  </design-dialog>
</template>

<script>
	import goodsList from '@/interface/json-data/get_goods_list.json';

	const good_columns = [
		{title: '商品ID', align: 'center', dataIndex: 'id', },
		{
			title: '商品图片',
			align: 'center',
			dataIndex: 'thumb',
      width: 150,
			scopedSlots: {customRender: 'goods_img'}
		},
		{title: '商品名称', align: 'center', dataIndex: 'title', width: 300,},
		{title: '商品状态', align: 'center', dataIndex: 'status_name', },
		{title: '商品原价', align: 'center', dataIndex: 'market_price', },
		{title: '商品现价', align: 'center', dataIndex: 'price',},
		{title: '库存', align: 'center', dataIndex: 'stock', }
	];

	const group_columns = [
		{title: '拼团ID', align: 'center', dataIndex: 'id', width: 50, },
		{title: '拼团标题', align: 'center', dataIndex: 'title', width: 300, },
		{title: '拼团商品名称', align: 'center', dataIndex: 'goods_title', width: 300, scopedSlots: {customRender: 'goods_title'}},
		{
			title: '拼团商品图片',
			align: 'center',
			dataIndex: 'thumb',
			key: 'thumb',
			width: 150,
			scopedSlots: {customRender: 'goods_group_img'}
		},
		{title: '拼团价', align: 'center', dataIndex: 'price', scopedSlots: {customRender: 'price'}},
		{title: '商品现价', align: 'center', dataIndex: 'stock', scopedSlots: {customRender: 'stock'}}
	];

	const tree_columns = [
		{title: '分类ID', align: 'center', dataIndex: 'id', width: 300, },
		{title: '分类标题', align: 'center', dataIndex: 'name', },
	];

	const supplier_columns = [
		{title: 'ID', align: 'center', dataIndex: 'id', width: 300,},
		{title: '供应商账号', align: 'center', dataIndex: 'username', },
		{title: '供应商手机', align: 'center', dataIndex: 'mobile',},
	];

	const store_columns = [
		{title: 'ID', align: 'center', dataIndex: 'id', width: 300,},
		{title: '门店名称', dataIndex: 'store_name', width: 300,  scopedSlots: {customRender: 'store_name'}},
		{title: '地址', align: 'center', dataIndex: 'full_address',},
	];

	const hotel_columns = [
		{title: 'ID', align: 'center', dataIndex: 'id', width: 300, },
		{title: '酒店名称', dataIndex: 'hotel_name', width: 300, scopedSlots: {customRender: 'hotel_name'}},
		{title: '地址', align: 'center', dataIndex: 'full_address',},
	];
  const star_columns = [
		{title: '活动ID', align: 'center', dataIndex: 'activity_id', width: 50, },
		{title: '活动标题', align: 'center', dataIndex: 'activity_name', width: 300, },
		{title: '活动商品名称', align: 'center', dataIndex: 'goods_title', width: 300, scopedSlots: {customRender: 'goods_title'}},
		{
			title: '活动商品图片',
			align: 'center',
			dataIndex: 'thumb',
			key: 'thumb',
			width: 150,
			scopedSlots: {customRender: 'goods_group_img'}
		},
		{title: '拼团价', align: 'center', dataIndex: 'price', scopedSlots: {customRender: 'price'}},
		{title: '商品现价', align: 'center', dataIndex: 'stock', scopedSlots: {customRender: 'stock'}}
	];
	export default {
		name: 'goods-sku',
		props: ['goods_type', 'config', 'is_from'],
		data() {
			return {
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				time_status1: ' ',
				time_status2: ' ',
				search_goods_type: ' ',
				goods_status: ' ',
				keywords: '',
				visible: false,
        treeSelects: [[]],  // 树状数据列表
				// list: goodsList.data, // 商品列表
				selectedRowKeys: [], // 复选框选中
				selectedRows: [],
				group_columns,
				good_columns,
				url: '',
				// 主页列表
				main_page_list: [],
				// 主分页的页码
				main_page_pagination: {
					current: 1,
					pageSize: 20,
					total: 0
				},
			}
		},
		computed: {
			columns() {
				switch(this.goods_type) {
					case 'list':
            return good_columns;
						break;
					case 'rush':
						return good_columns;
						break;
					case 'group':
						return group_columns;
						break;
					case 'category':
						return tree_columns;
						break;
					case 'tag':
						return tree_columns;
						break;
					case 'supplier':
						return supplier_columns;
						break;
					case 'store':
						return store_columns;
						break;
					case 'hotel':
						return hotel_columns;
						break;
					case 'starGroup':
						return star_columns;
						break;
					default:
						return good_columns;
				}
			}
		},
    mounted() {
    },
		methods: {
			/**
			 * 分页切换
			 */
			currentChange(page) {
				this.main_page_pagination.current = page;
				let json = {};
				if(this.goods_type === 'list') {
          this.url = 'plugin.decorate.admin.decorate-common.search-goods';
          json = {
            page: page,
            goods_name: this.keywords,
            goods_type: this.search_goods_type,
            goods_status: !this.goods_status ? null : this.goods_status,
            pageSize: 20
          };
				}else if(this.goods_type === 'rush') {
					this.url = 'plugin.decorate.admin.decorate-common.search-flashsale';
					json = {
						page: page,
						time_status: !this.time_status2 ? null : this.time_status2,
						goods_name: this.keywords,
						pageSize: 20
					};
				}else if(this.goods_type === 'group') {
					this.url = 'plugin.decorate.admin.decorate-common.search-fight-groups';
					json = {
						page: page,
						title: this.keywords,
						time_status: !this.time_status1 ? null : this.time_status1
					};
				}else if(this.goods_type === 'category') {
					this.url = 'plugin.decorate.admin.decorate-common.search-category';
					json = {
						page: page,
						title: this.keywords
					};
				}else if(this.goods_type === 'tag') {
					this.url = 'plugin.decorate.admin.decorate-common.search-filtering';
					json = {
						page: page,
						title: this.keywords
					};
				}else if(this.goods_type === 'supplier') {
					this.url = 'plugin.decorate.admin.decorate-common.search-supplier';
					json = {
						page: page,
						username: this.keywords
					};
				}else if(this.goods_type === 'store') {
					this.url = 'plugin.decorate.admin.decorate-common.search-store';
					json = {
						page: page,
						store_name: this.keywords
					};
				}else if(this.goods_type === 'hotel') {
					this.url = 'plugin.decorate.admin.decorate-common.search-hotel';
					json = {
						page: page,
						hotel_name: this.keywords
					};
				}else if(this.goods_type === 'starGroup') {
					this.url = 'plugin.decorate.admin.decorate-common.searchStarSpell';
					json = {
						page: page,
					  title: this.keywords,
					};
				}
				$http
						.post(this.url,json,"loading")
						.then(response => {
							if (response.result === 1) {
								if(this.goods_type === 'category') {
									this.main_page_pagination.total = response.data.total;
									this.main_page_pagination.pageSize = response.data.per_page;
									this.main_page_list = response.data.data;
									this.$nextTick(()=>{
										this.$refs.tree.setCheckedNodes(this.selectedRows);
                  });
                }else if(this.goods_type === 'tag'){
									this.main_page_pagination.total = response.data.length;
									this.main_page_list = response.data;
									this.$nextTick(()=>{
										this.$refs.tree.setCheckedNodes(this.selectedRows);
									});
                }else {
									this.main_page_pagination.total = response.data.total;
									this.main_page_pagination.pageSize = response.data.per_page;
									this.main_page_list = response.data.data;
                }

							} else {
								this.main_page_list = [];
								if (response.data.status === -1) {
									this.currentChange(1);
								}
								// this.$message.error(response.msg);
							}
						})
						.catch(err => {
							console.error(err);
						});
			},

			handleCheck(data, checked) {

				let arr = [];
        checked.checkedNodes.map((item)=>{
        	// 统计父级
          arr.push(item.parent_id)
        });

        this.treeSelects[this.main_page_pagination.current] = checked.checkedNodes;
				this.selectedRows = this.selectedRows.filter(function(item) {
					// 过滤掉多余数据和父级
					return item.id != data.id && item.id != data.parent_id && item.parent_id != data.id && !arr.includes(item.id)
				});
				this.treeSelects.map((item)=>{
					// 重新添加
					this.selectedRows.push(...item)
				});
				this.selectedRows = this.unique(this.selectedRows); // 去重
			},

			onSelectChange(record, selected, selectedRows) {
				if(selected) {
					this.selectedRowKeys.push(record.id);
					this.selectedRows.push(record);
				}else {
					this.selectedRowKeys= this.selectedRowKeys.filter(function(item) {
						return item != record.id
					});
					this.selectedRows = this.selectedRows.filter(function(item) {
						return item.id != record.id
					});
				}

				// console.log('selectedRowKeys changed: ', this.selectedRowKeys, this.selectedRows);
			},

			onSelectAll(selected, selectedRows, changeRows) {
				if(selected) {
					this.selectedRows.push(...changeRows);
					changeRows.map((item) => {
						this.selectedRowKeys.push(item.id)
					});
        }else {
					changeRows.map((record) => {
						this.selectedRowKeys= this.selectedRowKeys.filter(function(item) {
							return item != record.id
						});
						this.selectedRows = this.selectedRows.filter(function(item) {
							return item.id != record.id
						});
					});
        }
				// console.log(selected, selectedRows, changeRows);
			},

			unique (arr) {
				// return Array.from(new Set(arr))
				let array =[];
				let selectedRows = []
				for(let i = 0; i < arr.length; i++) {
					if( !array.includes( arr[i].id) ) {//includes 检测数组是否有某个值
						array.push(arr[i].id);
						selectedRows.push(arr[i]);
					}
				}
				return selectedRows
			},

			/**
			 *  打开弹窗
			 * @param {Array} list 当前选中的id
			 */
			show (list) {
				this.keywords = '';
				this.time_status1= '';
        this.time_status2= '';
        this.search_goods_type= '';
        this.goods_status= '';
				this.currentChange(1);
				this.selectedRowKeys = [];
				this.visible = true;
				if(this.goods_type === 'tag' || this.goods_type === 'category') {
          this.selectedRows = JSON.parse(JSON.stringify(list));
				}else {
					list.forEach((item)=>{
						this.selectedRowKeys.push(item.id)
					});
					this.selectedRows = JSON.parse(JSON.stringify(list));
				}

			},

			/**
			 * 确认按钮
			 */
			handle_confirm() {
        if(this.goods_type === 'tag' || this.goods_type === 'category') {
	        this.treeSelects.map((item)=>{
		        this.selectedRows.push(...item)
          });
	        this.selectedRows = this.unique(this.selectedRows); // 去重
					this.$emit('onComfirm', this.selectedRows);
				}
				// else if(this.goods_type === 'starGroup'){
				// 	this.selectedRows.forEach((item)=>{
				// 		item.tab_name="自定义名称"
				// 	})
				// 	this.selectedRows= this.unique(this.selectedRows);
				// 	this.$emit('onComfirm', this.selectedRows);
				// }
				else {
	        if(this.selectedRows.length > 100) {
		        this.$message.error('最多只能添加100个');
		        return
	        }
					this.$emit('onComfirm', this.selectedRows);
        }
				this.visible = false;
			},

			/**
			 * 取消按钮
			 */
			handle_cancel() {
				this.visible = false;
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
      line-height: 60px;

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

    .el-tree-node__label {
      font-size: 16px;
    }
  }

  .store_box {
    display: flex;
    img {
      width: 100%;
    }
  }
</style>
