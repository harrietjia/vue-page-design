<template>
  <div :class="className">
    <!-- style -->
    <!--<div v-html="css"></div>-->

    <div style="height: 30px;line-height: 30px;text-align: center">
      悬浮按钮组件占位区域
    </div>

    <template v-if="datas.list && datas.list.choose_style ==1">
      <div class="fixed-box" v-for="(item, index) in datas.list.list" :key="index"
           :style="{top : `${datas.over_top + 114 - (index*(datas.list.button_padding+50))}px`}">
        <!--悬浮按钮静态-->
        <div class="btn" :style="button_style">
          <img :src="item.image || emptyImage" :style="{'width': datas.button_size+'px', 'height': datas.button_size+'px'}">
        </div>
      </div>
    </template>

    <template v-if="datas.list && datas.list.choose_style ==2">
      <div class="fixed-box2" :style="{top : `${datas.over_top + 114}px`}" v-if="datas.list.show_style ==1">
        <img :style="button_style"
             :src="datas.list.unfold_button || openImage"
             class="imgs"
        />
        <div class="btn" v-for="(item, index) in datas.list.list" :key="index"
             :style="{top : `${-70*(index+1)}px`,left: `${datas.position_location =='left'?((datas.button_size-50)/2)+10: 315-((datas.button_size-50)/2)}px`}">
          <img :src="item.image || emptyImage">
        </div>
      </div>

      <div class="fixed-box2" :style="{top : `${datas.over_top + 114}px`}" v-if="datas.list.show_style ==2">
        <img :style="button_style"
            :src="datas.list.unfold_button || openImage"
             class="imgs"
        />
        <div class="btn" style="top:-70px;" :style="btn_1_style" v-if="datas.list.list[0]">
          <img :src="datas.list.list[0].image || emptyImage">
        </div>
        <div class="btn" :style="btn_3_style" v-if="datas.list.list[1]">
          <img :src="datas.list.list[1].image || emptyImage">
        </div>
        <div class="btn" :style="btn_4_style" v-if="datas.list.list[2]">
          <img :src="datas.list.list[2].image || emptyImage">
        </div>
        <div class="btn" style="top: 70px;" :style="btn_2_style" v-if="datas.list.list[3]">
          <img :src="datas.list.list[3].image || emptyImage">
        </div>
      </div>
    </template>

  </div>
</template>

<script>
	import emptyImage from "@/resource/images/image.png";
	import openImage from "@/resource/images/open.png";

	export default {
		props: ['id', 'datas', 'styles'],
    data() {
			return{
				emptyImage,
				openImage
      }
    },
		computed: {
			button_style() {
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
			btn_1_style() {
				const {
					position_location,
				} = this.datas;

				return `
				        left: ${position_location =='left'?'10':315}px;
            `;
      },
			btn_2_style() {
				const {
					button_size,
					position_location,
				} = this.datas;

				return `
				        top: ${20+button_size}px;
				        left: ${position_location =='left'?'10':315}px;
            `;
			},
			btn_3_style() {
				const {
					button_size,
					position_location,
				} = this.datas;

				return `
				        top: ${15-button_size}px;
				        left: ${position_location =='left' ? 20+button_size:310-button_size}px;
            `;
			},
			btn_4_style() {
				const {
					button_size,
					position_location,
				} = this.datas;

				return `
				        top: ${button_size-15}px;
				        left: ${position_location =='left' ? 20+button_size:310-button_size}px;
            `;
			},
			className() {
				const name = ['component-wrapper', `component-${this.id}`];
				return name;
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

  .fixed-box2 {
    width: 375px;
    top: 114px;
    z-index: 2;
    position: fixed;
    .imgs {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      z-index: 2;
      position: relative;
    }
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
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }

</style>
