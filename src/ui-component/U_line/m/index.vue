<template>
  <div class="U000009-template1" :style="wrapper_style">
    <!-- style -->
    <div :style="border_style"></div>

  </div>
</template>

<script>
	export default {
		props: ['id', 'datas', 'styles'],
		data() {
			return{
			}
		},
		computed: {
			/** 样式 */
			wrapper_style() {
				if(this.datas.preview_color) {
					const {
						preview_color,
						border_padding,
						search_height,
					} = this.datas;

					return `
                width: 100%;
                background-color: ${preview_color.color};
                background-image: url(${preview_color.isColor == 2? preview_color.image: ''});
                background-size: 100% auto;
                bakcground-position: center;
                padding: ${search_height/2}px ${border_padding}px;
            `;
        }
			},
			border_style() {
				const {
					line_style,
					border_color,
					border_weight
				} = this.datas;

				return `
            width: 100%;
            border-top: ${border_weight}px ${line_style} ${border_color};
            `;
      }
		},
		methods: {
		},

	};
</script>

<style lang="less" scoped>
  // 默认
  .component-wrapper {
    width: 375px;
  }
</style>
