<template>
  <div class="form-item col-1">
    <label v-show="show_title">{{ config.title}}</label>
    <!-- 选择图片 -->
    <div class="image-picker" style="margin: 15px 0;">

      <!--<div style="display: flex;margin-bottom: 20px">-->
        <!--<div style="width: 210px;">-->
          <!--<a-input-->
              <!--v-model="thumbnail_url" @blur="handle_input_change"-->
              <!--placeholder="请输入">-->
          <!--</a-input>-->
        <!--</div>-->
        <!--<div style="width:90px; margin-left: 10px">-->
          <!--<a-button style="width:90px;" type="primary" @click.stop="openUpload">选择图片</a-button>-->
        <!--</div>-->
      <!--</div>-->

      <div class="show-img" v-if="thumbnail_url" @click="openUpload()">
        <img :src="thumbnail_url">
        <a-icon class="icon-close11" type="close-circle"  @click.stop="deleteImg" title="点击清除图片"/>
      </div>
      <div class="choose-img" v-else @click="openUpload()">
        <i class="iconfont icon-jiahao"></i>
        <span>点击上传</span>
      </div>

      <!--<p class="tips" v-if="tips">{{tips}}</p>-->
    </div>

      <image-upload ref="imageUpload"
                    :value.sync="value"
                    :config="config"
                    :rootConfig="rootConfig"
                    @confirm="sureImg">
      </image-upload>
  </div>
</template>

<script>
	import imageUpload from '../../../../system-components/image-upload/index.vue';
export default {
  name: "unit-image",
	components: {
		imageUpload,
	},
  props: {
	  show_title: {
		  type: Boolean,
		  default: true,
    },
    // 图片地址
    value: {
      type: String,
      default: "",
    },
	  tips: {
		  type: String,
		  default: "建议尺寸750px*1206px,大小限制在500k以内",
    },
    // 配置项
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    // 根配置项
    rootConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      current_value: this.value, // 组件内置的变量
			thumbnail_url: this.value, // 缩略图
    };
  },

  watch: {
    value(newVal) {
      this.thumbnail_url = newVal;
      this.current_value = newVal;
    },
  },
  methods: {
	  openUpload() {
	    this.$refs.imageUpload.show(this.current_value);
    },
	  sureImg(imgUrl) {
		  this.$emit('input', imgUrl);
		  this.thumbnail_url = imgUrl;
	  },
	  deleteImg() {
		  this.$emit('input', '');
		  this.thumbnail_url = '';
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
		  // 判断不为空
		  if (url != "") {
			  // 获取图片大小
			  // const originalImg = new Image();
			  // originalImg.src = url;
			  // originalImg.onload = () => {
				//   const width = originalImg.width;
				//   const height = originalImg.height;
				//   // 检查大小
				//   const res = this.handle_check_size(Number(width), Number(height));
				//   if (res) {
				// 	  this.$emit("input", url);
				//   } else {
				// 	  e.target.value = "";
				// 	  this.$emit("input", "");
				// 	  return false;
				//   }
			  // };
			  // originalImg.onerror = () => {
				//   e.target.value = "";
				//   this.$emit("input", "");
			  // };
		  // } else {
			  this.$emit("input", url);
		  }
	  },
  },
};
</script>
<style lang="less" scoped>
.choose-img {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 3px;
  border: dashed 1px #e2e2e2;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  text-align: center;
  color: #5e5e5e;
  cursor: pointer;
  i {
    height: 28px;
  }
}
.choose-img:hover, .show-img:hover {
  color: #29ba9c;
  border-color: #29ba9c;
}

.show-img {
  position: relative;
  width: 240px;
  margin: 0 auto;
  border: dashed 1px #e2e2e2;
  cursor: pointer;
  img {
    width: 100%;
  }
  .icon-close11 {
    position: absolute;
    top: -10px;
    right: -7px;
    color: #999;
    font-size: 18px;
  }
}

.tips {
  margin-top: 15px;
  color: #b4b4b4;
  text-align: center;
}

</style>
