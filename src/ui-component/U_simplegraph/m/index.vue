<template>
  <div class="component-wrapper" :style="wrapper_style">
    <template v-if="list && list.length > 0">
      <img v-for="(img, index) in list" :src="img.image || emptyImage" :key="index" :style="img_style">
    </template>
    <template v-else>
      <img :src="emptyImage" :style="img_style">
    </template>
  </div>
</template>

<script>
	import emptyImage from "@/resource/images/banner.png";
	export default {
		props: ['id', 'styles', 'datas'],
    data() {
			return {
				emptyImage
      }
    },
		computed: {
			/** 样式 */
			wrapper_style() {
				if(this.datas.list) {
					const {
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
            `;
        }
			},

			img_style() {
				const {
					picture_border,
				} = this.datas;
				return `
				        width: 100%;
                border-radius: ${picture_border}px;
            `;
			},

			/** 标题 */
			list() {
				return this.datas.list;
			},
		},

	};
</script>

<style lang="less" scoped>
  .component-wrapper {
    width: 375px;
  }
</style>
