<template>
  <div class="U000008-template1" >
    <!-- style -->
    <div :style="wrapper_style"></div>

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
						search_height
					} = this.datas;

					return `
                width: 100%;
                height: ${search_height}px;
                background-color: ${preview_color.color};
                background-image: url(${preview_color.isColor == 2 ? preview_color.image : ''});
                background-size: 100% auto;
                bakcground-position: center;
            `;
				}
			},
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
