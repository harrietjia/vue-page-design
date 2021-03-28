<template>
  <design-dialog
      wrapClassName="dialog-images-manager"
      title="上传视频"
      :visible="visible"
      :width="960"
      :confirmLoading="submit_loading"
      @isOk="handle_confirm"
      @isCancel="handle_cancel">

    <!-- dialog-body -->
    <div style="height:50vh;overflow:auto">
      <a-tabs v-model="activeName">
        <a-tab-pane key="1" tab="上传视频">
          <div
              style="text-align: center"
              class="submit_Img"
          >
            <el-upload
                class="avatar-uploader"
                :action="fun.getRealUrl('plugin.decorate.admin.decorate-common.upload', {upload_type: 'video'})"
                 accept=".mp4,.mov,.avi"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
            >
              <div class="avatar_box" v-if="thumbnail_url">
                <video :src="thumbnail_url" class="avatar"></video>
              </div>
              <div v-else class="avatar-uploader-icon">
                <i class="iconfont icon-plus" style="font-size:50px"></i>
              </div>

            </el-upload>
            <!--<p class="tips">建议尺寸750px*1206px,大小限制在500k以内</p>-->

          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="提取网络视频" force-render>
          <a-input
              v-model.trim="imageUrl" @blur="handle_input_change"
              placeholder="请输入网络视频地址"
              style="width:90%;margin-left: 5%;"
          ></a-input>
        </a-tab-pane>
        <a-tab-pane key="3" tab="浏览视频">
            <a-table class="goods_tab"
                     :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
                     :columns="columns" rowKey="id"
                     :data-source="main_page_list"
                     :pagination="{
                    pageSize: main_page_pagination.pageSize,
                    current: main_page_pagination.current,
                    total: main_page_pagination.total,
                    showQuickJumper: true,
                    onChange: currentChange
                }"
            >
              <span slot="createtime" class="edit-box" slot-scope="text, record">
                {{record.createtime ? formatTime(record.createtime,'Y/M/D h:m:s') : record.created_at}}
                </span>
              <span slot="action" class="edit-box" slot-scope="text, record">
                  <a-tooltip>
                    <template slot="title">
                      删除
                    </template>
                    <i class="iconfont icon-ht_operation_delete" @click.stop="deleteImg(record.id)"></i>
                  </a-tooltip>
                </span>
            </a-table>

        </a-tab-pane>
      </a-tabs>
    </div>

  </design-dialog>
</template>

<script>
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '标题',
			dataIndex: 'filename',
		},
		{
			title: '创建时间',
			dataIndex: 'createtime',
			scopedSlots: { customRender: 'createtime' },
		},
		{
			title: '操作',
			key: 'action',
			scopedSlots: { customRender: 'action' },
		}
	];

	export default {
		name: 'video-upload',

		props: {
			// 图片数据
			value: {
				type: String,
				default: ""
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
				columns,
				//弹框上传图片的路径
				thumbnail_url: '',
				imageUrl: '',
				selectedRowKeys: [],
				selectedRows: [],

        //输出的图片链接
        outImg: '',
				activeName: "1",

				visible: false,
				submit_loading: false,

				main_page_list: [],
				// 主分页的页码
				main_page_pagination: {
					current: 1,
					pageSize: 10,
					total: 0
				},

			};
		},
		watch: {
			value(newVal) {
				// this.imageUrl = newVal;
			},
		},
		methods: {
			show (url = '') {
				this.thumbnail_url= '';
				this.imageUrl= url;
				this.selectedRowKeys = [];
				this.selectedRows = [];
				this.activeName = '1';
				this.visible = true;
				this.outImg = url;
				this.currentChange(1);
			},
			/**
			 * 弹窗按钮 - 确认
			 */
			handle_confirm () {
				if(this.activeName == 1 && this.thumbnail_url != '') {
					this.outImg = this.thumbnail_url;
        }else if(this.activeName == 2 && this.imageUrl != '') {
					this.outImg = this.imageUrl;
        }else if(this.activeName == 3 && this.selectedRows.length > 0){
          this.outImg = this.selectedRows[0].url;
        }
				this.$emit('confirm', this.outImg);
				this.visible = false;
			},

			/**
			 * 选择视频
			 */
			onSelectChange(selectedRowKeys,selectedRows) {
				// console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
				this.selectedRowKeys = selectedRowKeys;
				this.selectedRows = selectedRows;
			},

			/**
			 * 弹窗按钮 - 取消
			 */
			handle_cancel () {
				this.visible = false;
			},
			/**
			 * 检查图片大小
			 * @param {Int} width
			 * @param {Int} height
			 * @requires {Object} config 可选项
			 * @requires {Object} rootConfig 根配置项
			 */
			handle_check_size(width, height) {
				if (this.config.width != null && this.config.height != null) {
					const maxWidth = Number(
							eval(`this.rootConfig.${this.config.width}.value`)
					);
					const maxHeight = Number(
							eval(`this.rootConfig.${this.config.height}.value`)
					);
					if (width === maxWidth && height === maxHeight) {
						return true;
					} else {
						this.$message.error(
								`图片尺寸不对，只能使用尺寸为 ${maxWidth}x${maxHeight} 的素材`
						);
						return false;
					}
				} else {
					return true;
				}
			},

			formatTime(number,format) {
				var formateArr  = ['Y','M','D','h','m','s'];
				var returnArr   = [];

				var date = new Date(number * 1000);
				returnArr.push(date.getFullYear());
				returnArr.push(this.formatNumber(date.getMonth() + 1));
				returnArr.push(this.formatNumber(date.getDate()));

				returnArr.push(this.formatNumber(date.getHours()));
				returnArr.push(this.formatNumber(date.getMinutes()));
				returnArr.push(this.formatNumber(date.getSeconds()));

				for (var i in returnArr)
				{
					format = format.replace(formateArr[i], returnArr[i]);
				}
				return format;
			},

			formatNumber(n) {
				n = n.toString()
				return n[1] ? n : '0' + n
			},

			// 输入框值变化
			handle_input_change(e) {
				const url = e.target.value;
				// 判断是否有变更
				if (url === this.outImg) return false;
				// 判断不为空
				if (url != "") {
					// 获取图片大小
				// 	const originalImg = new Image();
				// 	originalImg.src = url;
				// 	originalImg.onload = () => {
				// 		const width = originalImg.width;
				// 		const height = originalImg.height;
				// 		// 检查大小
				// 		const res = this.handle_check_size(Number(width), Number(height));
				// 		if (res) {
				// 			this.$emit("input", url);
				// 		} else {
				// 			e.target.value = "";
				// 			this.$emit("input", "");
				// 			return false;
				// 		}
				// 	};
				// 	originalImg.onerror = () => {
				// 		e.target.value = "";
				// 		this.$emit("input", "");
				// 	};
				// } else {
					this.$emit("input", url);
				}
			},

			/**
			 * 获取历史媒体文件
			 */
			currentChange(page) {
				this.main_page_list = [];
				this.main_page_pagination.current = page;
				$http
						.post(
								"plugin.decorate.admin.decorate-common.get-local-list",
								{ page: page, year: this.radio1, month: this.radio2, attach_type: 3 },
								"loading"
						)
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
			uploadSuccess(res, file) {
				if (res.result === 1) {
					this.thumbnail_url = res.data.url;
					this.$message.success("上传成功！");
				} else {
					if (res.msg && res.msg != "") {
						this.$message.error(res.msg);
					}
				}
				this.submit_loading = false;
			},
			beforeUpload(file) {
				this.submit_loading = true;
				// const isLt2M = file.size / 1024 / 1024 < 4;
				// if (!isLt2M) {
				// 	this.$message.error("上传图片大小不能超过 4MB!");
				// 	this.submit_loading = false;
				// }
				// return isLt2M;
			},
			deleteImg(id) {
				$http
						.post("plugin.decorate.admin.decorate-common.delete-upload", { id: id }, " ")
						.then((response) => {
							if (response.result === 1) {
								if (response.msg && response.msg != "") {
									this.$message.success("删除成功");
								}
								this.currentChange(1);
							} else {
								if (response.msg && response.msg != "") {
									this.$message.error(response.msg);
								}
							}
						})
						.catch((err) => {
							console.error(err);
						});
			},
		},
  };
</script>

<style lang="less" scoped>

  .ant-upload-picture-card-wrapper {
    display: flex;
    justify-content: center;
  }
  .ant-upload-select-picture-card{
    width: 178px !important;
    height: 178px !important;
  }

  /*弹窗上传图片*/
  #upload-img {
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
    .avatar-uploader-box {
      position: relative;
      margin: 20px 0 0 10px;
      width: 110px;
    }
    .icon-close11 {
      position: absolute;
      top: -10px;
      right: 3px;
      color: #999;
      font-size: 18px;
    }
  }

  /* 上传图片 */

  .avatar-uploader .avatar-uploader-icon{
    margin-top: 15px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .avatar-uploader-icon:hover {
    border-color: #29ba9c;
  }
  .avatar-uploader-icon {
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    font-size: 50px;
    text-align: center;
  }
  .avatar_box {
    margin: 0 auto;
    width: 178px;
    height: 178px;
  }
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .el-upload-tip {
    width: 178px;
    margin: 0;
    padding: 0;
    color: #999;
    text-align: center;
  }
  input[type="file"] {
    display: none;
  }
  .avatar-uploader-box {
    position: relative;
    margin-top: 20px;
    width: 200px;
    display: inline-block;
    .el-icon-circle-close {
      position: absolute;
      top: 10px;
      right: 0;
      color: #999;
    }
  }

  .edit-box {
    display: flex;
    i {
      color: #999999;
      margin-left: 15px;
      cursor: pointer;
    }
    i:hover {
      color: #ffa800;
    }
  }
</style>
