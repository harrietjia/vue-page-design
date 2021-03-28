<template>
  <div class="form-item col-1">
    <div style="display: flex">
      <span>{{ config.title }}</span>
      <a-tooltip v-if="config.tips">
        <template slot="title">
          Tips: {{config.tips}}
        </template>
        <a-icon type="alert" style="color: #ff9b19;font-size: 18px;"/>
      </a-tooltip>
    </div>

    <div class="slide-bar-wrapper" style="margin-top:10px;display: flex">
      <div style="width: 200px;">
        <a-input
            v-model.trim="value.video_url" placeholder="请输入">
        </a-input>
      </div>
      <div style=" margin-left: 10px">
        <a-button style="width:110px;" type="primary" @click.stop="openLink">选择媒体文件</a-button>
      </div>
    </div>

    <div class="tips">提示：支持本地上传视频或者填写mp4、mov格式的视频文件链接自定义视频封面。(原生小程序只支持mp4格式)</div>

    <div style="margin-top: 10px">
      <a-radio-group  v-model="value.isShowPoster">
        <a-radio :value="'0'">
          不自定义视频封面
        </a-radio>
        <a-radio :value="'1'">
          自定义视频封面
        </a-radio>
      </a-radio-group>
    </div>

    <image-picker v-model="value.poster" v-show="value.isShowPoster == 1"
                  :config="config" :show_title="false"
                  :rootConfig.sync="rootConfig"></image-picker>

    <video-upload ref="videoUpload"
                :value.sync="value.video_url"
                :config="config"
                :rootConfig="rootConfig"
                @confirm="handleOk"></video-upload>
  </div>
</template>

<script>
	import videoUpload from '../../../../system-components/video-upload/index.vue';
	import imagePicker from './unit-image.vue';

	export default {
		props: ['value', 'config', 'rootConfig'],
		data() {
			return {
			}
		},
		components: {
			videoUpload,
			imagePicker
		},
		computed: {
			local_link: {
				get () {
					return this.value;
				},
				set (newValue) {
					this.$emit('input', newValue);
				}
			}
		},
		methods: {
			openLink() {
				this.$refs.videoUpload.show();
			},
			handleOk(url) {
				this.local_link.video_url = url;
			},
		}
	}
</script>
<style lang="less" scoped>
.tips {
  padding: 10px;
  line-height: 24px;
  color: #cccccc;
}
</style>
