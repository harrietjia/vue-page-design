<template>
  <div class="component-wrapper u000242" :style="wrapper_style">
    <div v-if="datas.show_title" :style="title_style" class="title">{{ title }}</div>
    <div v-if="datas.show_second_title" :style="second_title_style" class="second-title">{{ second_title }}</div>
  </div>
</template>

<script>
	export default {
		props: ['id', 'styles', 'datas'],

		computed: {
			/** 样式 */
			wrapper_style() {
				if(this.datas.preview_color) {
					const {
						preview_color,
						padding_top,
						padding_bottom,
						padding_left,
						padding_right,
					} = this.datas;

					return `
                width: 100%;
                padding-top: ${padding_top}px;
                padding-bottom: ${padding_bottom}px;
                padding-left: ${padding_left}px;
                padding-right: ${padding_right}px;
                background-color: ${preview_color.color};
                background-image: url(${preview_color.isColor == 2? preview_color.image: ''});
                background-size: 100% auto;
                bakcground-position: center;
            `;
        }
			},

			/** 标题样式 */
			title_style() {
				const {
					text_style,
					text_align,
					text_size,
					text_color
				} = this.datas;
				return `
                font-weight: ${text_style.includes('1')?'bold':''};
                font-style: ${text_style.includes('2')?'italic':''};
                text-align: ${text_align};
                font-size: ${text_size}px;
                color: ${text_color};
            `;
			},

			/** 副标题样式 */
			second_title_style() {
				const {
					second_text_style,
					second_text_align,
					second_text_size,
					second_text_color
				} = this.datas;
				return `
                font-weight: ${second_text_style.includes('1')?'bold':''};
                font-style: ${second_text_style.includes('2')?'italic':''};
                text-align: ${second_text_align};
                font-size: ${second_text_size}px;
                color: ${second_text_color};
            `;
			},

			/** 标题 */
			title() {
				return this.datas.title || '标题';
			},
			second_title() {
				return this.datas.second_title || '副标题';
			},

		},

		mounted() {
			this.$emit('loaded');
		}
	};
</script>

<style lang="less" scoped>
  .component-wrapper {
    display: block;
    max-width: 100%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    text-decoration: none;
  }
</style>
