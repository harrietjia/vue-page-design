<template>
  <design-dialog
      wrapClassName="dialog-images-manager"
      title="关联链接"
      :visible="visible"
      :width="460"
      @isOk="handle_confirm"
      @isCancel="handle_cancel">

    <!-- dialog-body -->
    <div style="height:20vh;overflow:auto">
      <div class="editor-box">
        <div class="link-box">
          <a-radio-group :default-value="1" v-model="currentItem.is_minApp">
            <a-radio :value="'1'">
              内部链接
            </a-radio>
            <a-radio :value="'2'">
              小程序链接
            </a-radio>
          </a-radio-group>
        </div>

        <div class="right" v-if="currentItem.is_minApp == 1">
          <div style="width: 320px">
            <a-input
                v-model.trim="currentItem.h5_link"
                placeholder="请输入链接">
            </a-input>
          </div>
          <div style="margin-left: 10px">
            <a-button :style="{width: '60px'}" type="primary" @click.stop="openLink">选择</a-button>
          </div>
        </div>

        <div v-if="currentItem.is_minApp == 2">
          <div style="width: 390px;margin-top: 10px" v-if="fun.getKey('page_sort') == 2">
            <a-input
                v-model.trim="currentItem.gh_id"
                placeholder="请填写跳转小程序APPID">
            </a-input>
          </div>
          <div style="width: 390px;margin-top: 10px" v-else>
            <a-input
                v-model.trim="currentItem.gh_id"
                placeholder="请填写跳转小程序以gh_开头的原始id">
            </a-input>
          </div>
          <div style="width: 390px;margin-top: 10px">
            <a-input
                v-model.trim="currentItem.minApp_link"
                placeholder="跳转的小程序内页面路径及参数">
            </a-input>
          </div>
        </div>

      </div>
    </div>

    <link-modal :ref="`linkModal`"
                :value.sync="currentItem.h5_link"
                :config="config"
                :rootConfig="rootConfig"
                @confirm="handleOk"></link-modal>

  </design-dialog>
</template>

<script>
	import linkModal from '../link-modal/index.vue';
	export default {
		name: 'choose-link',

		props: {
			value: {
				type: Object,
				default: {}
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
		components: {
			linkModal
		},
		data() {
			return {
				currentItem: {},
				visible: false,
			};
		},
		watch: {
			value(newVal) {
				// this.currentItem = newVal;
			},
		},
		methods: {
			openLink() {
				this.$refs.linkModal.show();
			},
			handleOk(url) {
				this.currentItem.h5_link = url;
			},
			show (item) {
				if(item) {
					this.currentItem = item;
        }
				this.visible = true;
			},
			/**
			 * 弹窗按钮 - 确认
			 */
			handle_confirm () {
				this.$emit('confirm', this.currentItem);
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
  .editor-box {
    /*display: flex;*/
  }
  .link-box {
    display: flex;
    margin-left: 20px;
    margin-bottom: 15px;
  }
  .right {
    display: flex;
  }
</style>
