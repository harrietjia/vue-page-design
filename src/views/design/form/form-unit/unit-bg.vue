<template>
  <div :class="`form-item col-${config.col || 1}`">
    <div class="bg-head">
      <div style="flex: 1;display: flex;align-self: center">
        <span> {{ config.title }} </span>
        <a-tooltip v-if="config.tips">
          <template slot="title">
            Tips: {{config.tips}}
          </template>
          <a-icon type="alert" style="color: #ff9b19;font-size: 18px;"/>
        </a-tooltip>
      </div>

      <div style="flex: 0 0 100px;align-self: center">
        <a-radio-group v-model="value.isColor" :style="{ marginBottom: '8px' }">
          <a-radio-button value="1">
            <i class="iconfont icon-ht_bg_color"></i>
          </a-radio-button>
          <a-radio-button value="2">
            <i class="iconfont icon-ht_bg_bgimg"></i>
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>

    <div class="color-picker-wrapper" v-show="value.isColor == 1">
      <a-input
          size="large"
          v-model.trim="value.color"
          @blur="handleInputChange">

        <ColorPicker
            slot="addonBefore"
            :value="value.color"
            @change="handlePickerChange" />
      </a-input>
    </div>

    <image-picker v-model="value.image" v-show="value.isColor == 2"
                  :config="config" :show_title="false"
                  :rootConfig.sync="rootConfig"></image-picker>
  </div>
</template>

<script>
	/**
	 * 颜色选择器
	 */
	import { ColorPicker } from 'element-ui';
	import imagePicker from './unit-image.vue';

	/**
	 * 颜色格式化， 正则判断
	 * @returns {String}
	 */
	const check_formate = (value) => {
		// 只允许输入完整的十六进制的值
		return (/^#[A-Fa-f0-9]{6,8}$/.test(value)!= false);
	}

	export default {
		props: ['value', 'config', 'rootConfig'],
    data() {
			return {
      }
    },

		components: {
			ColorPicker,
			imagePicker
		},

		computed: {
			color: {
				get () {
					return this.value;
				},
				set (newValue) {
					this.$emit('input', newValue);
				}
			}
		},

		methods: {
			/**
			 * 颜色选择器的值变更
			 */
			handlePickerChange (value = '') {
				if (check_formate(value) == true) {
					this.value.color = value;
				} else {
					this.value.color = '#ffffff';
				}
			},

			/**
			 * 文本输入框的值变更
			 */
			handleInputChange (event) {
				let value = event.target.value || '';
				if (check_formate(value) == true) {
					this.value.color = value;
				} else {
					this.value.color = '#ffffff';
				}
			}
		}
	};
</script>

<style lang="less">
  .bg-head {
    display: flex;
    .config-title {
      flex: 1;
      align-self: center;
    }
  }

  // 颜色选择器
  .design-form-body, .design-layout-page-info {

    .color-picker-wrapper {
      display: flex;
      flex-wrap: nowrap;
      margin: 10px 0;
      .ant-input-group-addon:first-child {
        padding: 0px;
        border: none;
        border-radius: 0px;
      }
      .el-color-picker {
        display: block;
      }
      .el-color-picker__trigger {
        border-color: #E8EAEC;
        border-right: none;
        padding: 0px;
        border: none;
      }
      .el-color-picker__color {
        border-color: #E8EAEC;
        border-right: none;
        border-radius: 4px 0px 0px 4px;
        overflow: hidden;
      }
      .el-color-picker__icon.el-icon-arrow-down {
        color: #E8EAEC;
      }
      .el-icon-arrow-down {
        display: none;
      }
    }
  }

</style>
