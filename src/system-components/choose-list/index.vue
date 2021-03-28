<template>
  <design-dialog
      wrapClassName="dialog-images-manager"
      :title="title"
      :visible="visible"
      :width="960"
      @isOk="handle_confirm"
      @isCancel="handle_cancel">

    <!-- dialog-body -->
    <div style="height:50vh;overflow:auto">
      <a-input style="width: 85%;margin-bottom: 10px;margin-right: 10px" v-model.trim="keywords" placeholder="请输入关键字搜索">
      </a-input>
      <a-button style="width:90px;" type="primary" @click.stop="currentChange(1)">搜索</a-button>
      <div>
        <a-table
            :row-selection="{ selectedRowKeys: selectedRowKeys, onSelect: onSelectChange, onSelectAll:onSelectAll }"
            :columns="columns" rowKey="id"
            :data-source="main_page_list"
            :pagination="false"
        >
          <!--<div slot="thumb" class="goods_img" slot-scope="text, record">-->
            <!--<img :src="record.thumb"/>-->
          <!--</div>-->
          <span slot="enough" class="edit-box" slot-scope="text, record">
            <span class="tag" v-if="record.enough == 0">无门槛</span><br v-if="record.enough == 0"/>
            <span class="tag" style="background-color: #1e6abc" v-if="record.enough != 0">满{{record.enough}}可用</span><br v-if="record.enough != 0" />
            <span>{{record.coupon_method == 1?`立减${record.deduct}`:`打${record.discount}折`}}</span>
          </span>
          <span slot="usetotal" class="edit-box" slot-scope="text, record">
            <span>{{record.usetotal}} / {{record.gettotal}} / {{record.lasttotal}}</span>
          </span>
        </a-table>
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
	const article_columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		// {
		// 	title: '文章图片',
		// 	dataIndex: 'thumb',
		// 	width: 100,
		// 	scopedSlots: {customRender: 'thumb'}
		// },
		{
			title: '文章标题',
			dataIndex: 'title',
		},
		{
			title: '文章作者',
			dataIndex: 'author',
		},
		{
			title: '文章分类',
			dataIndex: 'category_name',
		},
		{
			title: '文章创建时间',
			dataIndex: 'created_at',
		},
	];

	const article_class_columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			width: 120,
		},
		{
			title: '文章分类标题',
			dataIndex: 'name',
		},
	];

	const community_columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '文章标题',
			dataIndex: 'title',
		},
		{
			title: '文章作者',
			dataIndex: 'author',
		},
		{
			title: '文章分类',
			dataIndex: 'category_name',
		},
		{
			title: '文章创建时间',
			dataIndex: 'created_at',
		},
	];

	const coupons_columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '优惠券名称',
			dataIndex: 'name',
		},
		{
			title: '使用条件 / 优惠',
			dataIndex: 'enough',
			scopedSlots: { customRender: 'enough' },
		},
		{
			title: '已使用 / 已发出 / 剩余数量',
			dataIndex: 'usetotal',
			scopedSlots: { customRender: 'usetotal' },
		},
		{
			title: '创建时间',
			dataIndex: 'created_at',
		},
	];

	const video_columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '标题',
			dataIndex: 'title',
		},
		{
			title: '作者',
			dataIndex: 'member_nickname',
		},
		{
			title: '视频发布时间',
			dataIndex: 'created_at',
		},
	];

	export default {
		name: 'choose-list',

		props: {
			value: {
				type: Array,
				default: []
			},
			// 配置项
			config: {
				type: Object,
				required: true,
			},
			// 根配置
			rootConfig: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				article_columns,
				article_class_columns,
				community_columns,
				coupons_columns,
				video_columns,
				selectedRowKeys: [],
				selectedRows: [],

				keywords: '',
				visible: false,
				url: '',
				// 主页列表
				main_page_list: [],
				// 主分页的页码
				main_page_pagination: {
					current: 1,
					pageSize: 20,
					total: 0
				},
			};
		},
		watch: {
			value(newVal) {
				// this.selectedRows = newVal;
			},
		},
		computed: {
			columns() {
				switch(this.config.choose) {
					case 'coupons':
						return coupons_columns;
						break;
					case 'article':
						if(this.rootConfig.get_style && this.rootConfig.get_style.value == 3) {
							// 判断是分类
							return article_class_columns;
						}else {
							return article_columns;
            }
						break;
					case 'community':
						return community_columns;
						break;
					case 'video':
						return video_columns;
						break;
					default:
						return article_columns;
				}
      },
			title() {
				switch(this.config.choose) {
					case 'coupons':
						return '选择优惠券';
						break;
					case 'article':
						return '选择文章';
						break;
					case 'community':
						return '选择帖子';
						break;
					case 'video':
						return '选择短视频';
						break;
					default:
						return '选择文章';
				}
      }
		},
		methods: {
			/**
			 * 分页切换
			 */
			currentChange(page) {
				this.main_page_pagination.current = page;
				let json = {};
				if(this.config.choose === 'article') {
					this.url = 'plugin.decorate.admin.decorate-common.search-article';
					if(this.rootConfig.get_style && this.rootConfig.get_style.value == 3) {
						// 判断是分类
						this.url = 'plugin.decorate.admin.decorate-common.get-article-cat';
						json = {
							page: page,
							name: this.keywords
						};
					}else {
						json = {
							page: page,
							title: this.keywords
						};
          }
				}else if(this.config.choose === 'community') {
					// 还没做
					this.url = 'plugin.decorate.admin.decorate-common.search-article';
					json = {
						page: page,
						title: this.keywords
					};
				}else if(this.config.choose === 'coupons') {
					this.url = 'plugin.decorate.admin.decorate-common.search-coupon';
					json = {
						page: page,
						coupon_name: this.keywords
					};
				}else if(this.config.choose === 'video') {
					this.url = 'plugin.decorate.admin.decorate-common.search-video-share';
					json = {
						page: page,
						title: this.keywords
					};
				}
				$http
						.post(this.url,json,"loading")
						.then(response => {
							if (response.result === 1) {
								this.main_page_pagination.total = response.data.total;
								this.main_page_pagination.pageSize = response.data.per_page;
								this.main_page_list = response.data.data;
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
				return Array.from(new Set(arr))
			},

			show (list) {
				this.currentChange(1);
				this.selectedRowKeys = [];
				list.forEach((item)=>{
					this.selectedRowKeys.push(item.id)
        });
				this.selectedRows = JSON.parse(JSON.stringify(list));
				this.visible = true;
			},
			/**
			 * 弹窗按钮 - 确认
			 */
			handle_confirm () {
				this.$emit('confirm', this.unique(this.selectedRows));
				this.visible = false;
			},

			/**
			 * 弹窗按钮 - 取消
			 */
			handle_cancel () {
				this.visible = false;
			},
		},
	};
</script>

<style lang="less" scoped>
  .link-box {
    margin: 10px 10px;
    .title {
      position: relative;
      font-weight: bold;
      margin-left: 10px;
      color: #29ba9c;
    }
    .title::before {
      content: "";
      width: 5px;
      height: 25px;
      position: absolute;
      top: 0;
      left: -10px;
      background: #29ba9c;
    }
    .links {
      margin-left: 15px;
      display: flex;
      flex-wrap: wrap;
      span {
        cursor: pointer;
        margin: 10px 0 0 20px;
      }
      span.active {
        color: #29ba9c;
      }
    }
  }

  .search-result {
    margin-top: 20px;
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

  .edit-box {
    display: inline-block;
    text-align: center;
    .tag {
      background-color: #29ba9c;
      color: white;
      padding: 2px 5px;
      border-radius: 5px;
    }
  }
</style>
