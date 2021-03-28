<template>
  <design-dialog
      wrapClassName="dialog-images-manager"
      title="上传图片"
      :visible="visible"
      :width="960"
      :confirmLoading="submit_loading"
      @isOk="handle_confirm"
      @isCancel="handle_cancel">

    <!-- dialog-body -->
    <div style="height:50vh;overflow:auto">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="上传图片">
          <div
              style="text-align: center"
              class="submit_Img"
          >
            <el-upload
                class="avatar-uploader"
                :action="fun.getRealUrl('plugin.decorate.admin.decorate-common.upload', {upload_type: 'image'})"
                accept="image/*"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
            >
              <div class="avatar_box" v-if="thumbnail_url">
                <img :src="thumbnail_url" class="avatar"/>
              </div>
              <div v-else class="avatar-uploader-icon">
                <i class="iconfont icon-plus" style="font-size:50px"></i>
              </div>

            </el-upload>
            <!--<p class="tips">建议尺寸750px*1206px,大小限制在500k以内</p>-->

          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="提取网络图片" force-render>
          <a-input
              v-model.trim="imageUrl" @blur="handle_input_change"
              placeholder="请输入网络图片地址"
              style="width:90%;margin-left: 5%;"
          ></a-input>
        </a-tab-pane>
        <a-tab-pane key="3" tab="浏览图片">
          <div>
            <a-radio-group v-model="radio1" style="margin:8px" @change="chooseYear" button-style="solid">
              <a-radio-button value="0">
                不限
              </a-radio-button>
              <a-radio-button value="2020">
                2020年
              </a-radio-button>
              <a-radio-button value="2019">
                2019年
              </a-radio-button>
              <a-radio-button value="2018">
                2018年
              </a-radio-button>
              <a-radio-button value="2017">
                2017年
              </a-radio-button>
              <a-radio-button value="2016">
                2016年
              </a-radio-button>
            </a-radio-group>
          </div>

          <div style="margin-top: 10px;">
            <a-radio-group v-model="radio2" style="margin:8px" @change="chooseMonth" button-style="solid">
              <a-radio-button value="0">不限</a-radio-button>
              <a-radio-button value="1">1月</a-radio-button>
              <a-radio-button value="2">2月</a-radio-button>
              <a-radio-button value="3">3月</a-radio-button>
              <a-radio-button value="4">4月</a-radio-button>
              <a-radio-button value="5">5月</a-radio-button>
              <a-radio-button value="6">6月</a-radio-button>
              <a-radio-button value="7">7月</a-radio-button>
              <a-radio-button value="8">8月</a-radio-button>
              <a-radio-button value="9">9月</a-radio-button>
              <a-radio-button value="10">10月</a-radio-button>
              <a-radio-button value="11">11月</a-radio-button>
              <a-radio-button value="12">12月</a-radio-button>
            </a-radio-group>

          </div>

          <div id="upload-img" class="imgList">
            <div
                class="avatar-uploader-box"
                v-for="(img, index) in ImgList"
                :key="index"
            >
              <img
                  @click="chooseTheImg(img.url)"
                  :src="img.url"
                  class="avatar"
              />
              <a-icon class="icon-close11" type="close-circle"  @click="deleteImg(img.id)" title="点击清除图片"/>
            </div>
            <div v-if="ImgList.length <= 0" style="text-align: center;padding: 15px;font-weight: bold;font-size: 18px">
              暂无图片历史
            </div>
          </div>

          <a-pagination
              style="margin-top: 25px;text-align: center"
              showQuickJumper
              :pageSize="main_page_pagination.pageSize"
              :current="main_page_pagination.current"
              :total="main_page_pagination.total"
              @change="currentChange"/>

        </a-tab-pane>
      </a-tabs>
      <div style="height: 10px"></div>
    </div>

  </design-dialog>
</template>

<script>
	export default {
		name: 'images-upload',

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
				//弹框上传图片的路径
				thumbnail_url: '',
				imageUrl: '',
				chooseImg: "",

        //输出的图片链接
        outImg: '',

				radio1: "0", //年
				radio2: "0", //月
				activeName: "1",

				visible: false,
				submit_loading: false,
				// 主页列表
				ImgList: [{}, {}],
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
        this.chooseImg= ""
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
        }else if(this.activeName == 3 && this.chooseImg != ''){
					this.outImg = this.chooseImg;
        }
				this.$emit('confirm', this.outImg);
				this.visible = false;
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

			callback(key) {
				this.activeName = key;
			},
			/**
			 * 获取历史图片
			 */
			currentChange(page) {
				this.ImgList = [];
				this.main_page_pagination.current = page;
				$http
						.post(
								"plugin.decorate.admin.decorate-common.get-local-list",
								{ page: page, year: this.radio1, month: this.radio2, attach_type: 1 },
								"loading"
						)
						.then(response => {
							if (response.result === 1) {
								this.main_page_pagination.total = response.data.total;
								this.main_page_pagination.pageSize = response.data.per_page;
								this.ImgList = response.data.data;
							} else {
								this.ImgList = [];
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
			chooseTheImg(img) {
				this.chooseImg = img;
				this.handle_confirm();
			},
			chooseYear(year) {
				this.currentChange(1);
			},
			chooseMonth(month) {
				this.currentChange(1);
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
    width: 200px;
    /*height: 178px;*/
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
</style>
<style lang="less">
  .submit_Img .el-upload__input {
    display: none;
  }
</style>
