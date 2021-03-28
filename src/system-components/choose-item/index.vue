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
      <a-input style="width: 85%;margin-bottom: 20px;margin-right: 10px" v-model.trim="keywords" placeholder="请输入关键字搜索">
      </a-input>
      <a-button style="width:90px;" type="primary" @click.stop="currentChange(1)">搜索</a-button>
      <div>
        <a-table
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio'}"
            :columns="columns" rowKey="id"
            :data-source="main_page_list"
            :pagination="false"
        >
          <span slot="show_rule" slot-scope="text, record" class="operation-box">
						<span>{{record.show_rule == 1 ?'每次进入页面':'每日首次登录小程序'}}</span>
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
	const form_columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '标题',
			dataIndex: 'title',
		}
	];

	const lottery_columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '活动名称',
			dataIndex: 'name',
		},
		{
			title: '活动开始时间',
			dataIndex: 'start_time',
		},
		{
			title: '活动结束时间',
			dataIndex: 'end_time',
		},
	];

	const menu_columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '标题',
			dataIndex: 'name',
		},
		{
			title: '创建时间',
			dataIndex: 'created_at',
		},
	];

	const advertising_columns= [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '创建时间',
			dataIndex: 'created_at',
			key: 'created_at'
		},
		{
			title: '广告名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '显示规则',
			dataIndex: 'show_rule',
			key: 'show_rule',
			scopedSlots: {customRender: 'show_rule'}
		},
	];

	export default {
		name: 'choose-item',
		props: ['value', 'config', 'rootConfig'],
		data() {
			return {
				form_columns,
				lottery_columns,
				menu_columns,
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
					case 'lottery':
						return lottery_columns;
						break;
					case 'form':
						return form_columns;
						break;
					case 'top':
						return menu_columns;
						break;
					case 'bottom':
						return menu_columns;
						break;
					case 'full_screen':
						return advertising_columns;
						break;
					case 'advertising':
						return advertising_columns;
						break;
					default:
						return form_columns;
				}
			},
			title() {
				switch(this.config.choose) {
					case 'lottery':
						return '选择抽奖活动';
						break;
					case 'form':
						return '选择表单';
						break;
					case 'top':
						return '选择顶部菜单';
						break;
					case 'bottom':
						return '选择底部导航';
					case 'full_screen':
						return '选择广告';
						break;
					case 'advertising':
						return '选择广告';
						break;
					default:
						return '选择抽奖活动';
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
				if(this.config.choose === 'form') {
					this.url = 'plugin.decorate.admin.decorate-common.search-form';
					json = {
						page: page,
						title: this.keywords
					};
				}else if(this.config.choose === 'lottery') {
					this.url = 'plugin.decorate.admin.decorate-common.search-lucky-draw';
					json = {
						page: page,
						name: this.keywords
					};
				}else if(this.config.choose === 'top') {
					this.url = 'plugin.decorate.admin.decorate-top.get-list';
					json = {
						page: page,
						name: this.keywords,
						top_type: this.fun.getKey('page_sort')
					};
				}else if(this.config.choose === 'bottom') {
					this.url = 'plugin.decorate.admin.decorate-footer.get-list';
					json = {
						page: page,
						name: this.keywords,
						page_sort: this.fun.getKey('page_sort')
					};
				}else if(this.config.choose === 'full_screen') {
					this.url = 'plugin.decorate.admin.decorate-advertising.get-list';
					json = {
						page: page,
						name: this.keywords,
						advertising_type: 2
					};
				}else if(this.config.choose === 'advertising') {
					this.url = 'plugin.decorate.admin.decorate-advertising.get-list';
					json = {
						page: page,
						name: this.keywords,
						advertising_type: 1
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
			onSelectChange(selectedRowKeys,selectedRows) {
				// console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
				this.selectedRowKeys = selectedRowKeys;
				this.selectedRows = selectedRows;
			},

			show (list) {
				// console.log(list)
				this.currentChange(1);
				this.visible = true;
				this.selectedRowKeys = [];
				if(list.id) {
					this.selectedRowKeys.push(list.id)
        }
				this.selectedRows = list;
			},
			/**
			 * 弹窗按钮 - 确认
			 */
			handle_confirm () {
				this.$emit('confirm', this.selectedRows[0]);
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
</style>
