<template>
  <div class="U000004-template1" :class="className">
    <!-- style -->
    <div v-html="css"></div>
    <!-- 列表 -->
    <template v-if="datas.preview_color">
      <div v-if="list.length <= 0" style="text-align: center;font-size: 16px;line-height: 32px">
        请先添加按钮
      </div>
      <ul class="button-box" v-if="list && list.length > 0 && !datas.is_scroll">
        <li v-for="(item, index) in list" :key="`${index}-${item.id}`">
          <img class="button-img" :src="item.image || emptyImage" alt="">
          <p class="button-title">{{ item.text }}</p>
        </li>
      </ul>
      <Swiper style="width: 100%"
              v-if="list && list.length > 0 && datas.is_scroll"
              :options="swiperOption"
              ref="mySwiper">
        <!-- slides -->
        <Swiper-slide v-for="(items, idx) in scroll_list" :key="idx" class="button-box">
          <li v-for="(item, index) in items" :key="`${index}-${item.id}`">
            <img class="button-img" :src="item.image || emptyImage" alt="">
            <p class="button-title">{{ item.text }}</p>
          </li>
        </Swiper-slide>
        <!--分页-->
        <div class="swiper-pagination" slot="pagination"></div>
      </Swiper>
    </template>

  </div>
</template>

<script>
	import emptyImage from "@/resource/images/image.png";
	import 'swiper/css/swiper.css'
	import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

	// 自定义样式
	const css = function () {
		if(this.datas.preview_color) {
			const {
				padding_top,
				padding_bottom,
				button_size,
				border_radius,
				button_number,
				preview_color,
				font_size,
				text_style,
				font_color,
			} = this.datas;

			return `
        .component-${this.id} .button-box{
            padding: ${padding_top}px 0 ${padding_bottom}px 0;
            background-color: ${preview_color.color || '#f8f8f8'};
            background-image: url(${preview_color.isColor == 2 ? preview_color.image : ''});
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
        }

        .component-${this.id} .button-box li{
            width: ${button_number == 4 ? '25' : '20'}%;
        }

        .component-${this.id}  .button-img{
            width: ${button_size}px;
            height: ${button_size}px;
            border-radius: ${border_radius}px;
        }

        .component-${this.id}  .button-title{
            font-size:${font_size}px;
            font-weight: ${text_style.includes('1') ? 'bold' : ''};
            font-style: ${text_style.includes('2') ? 'italic' : ''};
            color: ${font_color};
        }
    `;
		}
	};

	export default {
		props: ['id', 'datas', 'styles', 'languages'],
		data() {
			return {
				emptyImage,
				scroll_list: [],  //轮播时用的数值结构
				// 轮播图设置
				swiperOption: {
					autoplay: false,
					// loop: true,   loop模式第二轮循环的时候第一张会闪烁
					delay: 3000,
					observer:true,
					// autoHeight: true,
					pagination: {
						el: '.swiper-pagination',
					}
				},
			};
		},
		computed: {
			css() {
				return '<style>' + css.call(this) + '</style>';
			},
			className() {
				const name = ['component-wrapper', `component-${this.id}`];
				return name;
			},
			list() {
				return this.datas.list;
			},
			button_number() {
				return this.datas.button_number;
      },
			button_line() {
				return this.datas.button_line || 1;
			}
		},
		watch: {
			list: {
				deep: true,//深度监听
				handler: function () {
					let list = this.datas.list;
					this.scroll_list = [];

					if(!this.datas.button_line) {
						this.datas.button_line = 1
					}
          let page = Math.ceil(this.datas.list.length/this.datas.button_number/this.datas.button_line);  //==> 页数
          let num = this.datas.button_number*this.datas.button_line; // ==> 每页多少个

          for(let i=0; i<page; i++) {
            this.scroll_list.push(list.slice(i*num,(i+1)*num))
          }

				}
			},
			button_number(newValue) {
				let list = this.datas.list;
				this.scroll_list = [];

				if(!this.datas.button_line) {
					this.datas.button_line = 1
				}
        let page = Math.ceil(this.datas.list.length/newValue/this.datas.button_line);  //==> 页数
        let num = newValue*this.datas.button_line; // ==> 每页多少个

        for(let i=0; i<page; i++) {
          this.scroll_list.push(list.slice(i*num,(i+1)*num))
        }

      },
			button_line(newValue) {
				let list = this.datas.list;
				this.scroll_list = [];

				if(!newValue) {
					newValue = 1
				}
        let page = Math.ceil(this.datas.list.length/this.datas.button_number/newValue);  //==> 页数
        let num = this.datas.button_number*newValue; // ==> 每页多少个

        for(let i=0; i<page; i++) {
          this.scroll_list.push(list.slice(i*num,(i+1)*num))
        }

      }
		},

		methods: {
			initButtons() {
				if(this.datas.list) {
					let list = this.datas.list;
					this.scroll_list = [];
					if(!this.datas.button_line) {
						this.datas.button_line = 1
					}

					let page = Math.ceil(this.datas.list.length/this.datas.button_number/this.datas.button_line);  //==> 页数
					let num = this.datas.button_number*this.datas.button_line; // ==> 每页多少个

					for(let i=0; i<page; i++) {
						this.scroll_list.push(list.slice(i*num,(i+1)*num))
					}
        }
			}
		},

		components: {
			Swiper,
			SwiperSlide
		},

		mounted() {
			this.$nextTick(()=> {
				this.initButtons();
      })
		}
	};
</script>

<style lang="less" scoped>
  // 默认
  .component-wrapper {
    display: flex;
    justify-content: center;
    width: 375px;

    .button-box {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      li {
        /*flex: 1;*/
        /*width: 25%;*/
        position: relative;
        margin: 10px 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-self: center;
      }

      .button-img {
        margin: 0 auto;
      }

      .button-title {
        text-align: center;
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: break-word;
        overflow: hidden;
      }
    }
  }
</style>
