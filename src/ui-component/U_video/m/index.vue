<template>
  <div class="component-wrapper u000242" :style="wrapper_style">
    <video :poster="video_url.isShowPoster == '0' ? '' : video_url.poster" width="100%" :src="video_url.video_url" controls="controls">
    </video>
  </div>
</template>

<script>
	export default {
		props: ['id', 'styles', 'datas'],

		computed: {
			/** 样式 */
			wrapper_style() {
				const {
					padding_top,
					padding_bottom,
					padding_left,
					padding_right,
				} = this.datas;
				return `
				        line-height: 0;
                width: 100%;
                padding-top: ${padding_top}px;
                padding-bottom: ${padding_bottom}px;
                padding-left: ${padding_left}px;
                padding-right: ${padding_right}px;
            `;
			},

			video_url() {
				return this.datas.video_url || {};
			},

		},

		mounted() {
			this.$emit('loaded');
		}
	};
</script>

<style lang="less" scoped>
</style>
