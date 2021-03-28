<template>
  <div class="U000023-template1" style="position: relative" :class="className">
    <!-- style -->
    <!--<div v-html="css"></div>-->

    <div style="height: 30px;line-height: 30px;text-align: center">
      回到顶部组件占位区域
    </div>
    <!--回到顶部静态-->
    <div class="fixed-box" :style="{top : `${datas.over_top + 114}px`}">
      <div class="btn" :style="button_style">
        <img :src="datas.icon_url || emptyImage" :style="{'width': datas.button_size+'px', 'height': datas.button_size+'px'}">
      </div>
    </div>

  </div>
</template>

<script>
	import emptyImage from "@/resource/images/backtotop@2x.png";

	export default {
		props: ['id', 'datas', 'styles'],
		data() {
			return{
				emptyImage
			}
		},
		mounted() {
		},
		computed: {
			button_style() {
				// 自定义样式
				const {
					button_size,
					position_location,
				} = this.datas;

				return `
                width: ${button_size}px;
                height: ${button_size}px;
                margin-left: ${position_location =='left'?'10':365-button_size}px;
            `;
			},
			className() {
				const name = ['component-wrapper', `component-${this.id}`];
				return name;
			},
		},
		watch: {},

		methods: {},

	};
</script>

<style lang="less" scoped>
  // 默认
  .component-wrapper {
    display: flex;
    justify-content: center;
    width: 375px;
  }

  .fixed-box {
    width: 375px;
    position: fixed;
    top: 114px;
    z-index: 2;
    .btn {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      flex-direction: column;
      font-size: 13px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
</style>
