<template>
  <div :class="className">
    <!-- style -->
    <div v-html="css"></div>

    <!--头条静态-->
    <div class="headline" v-if="datas.list">
      <!-- 在这里写签到静态头条静态 -->
			<div class="headline_img" v-if="datas.show_logo">
				<img :src="datas.logo_image ? datas.logo_image : emptyImage" alt="">
			</div>
			<div class="fixright">
				<div class="right" v-if="datas.show_number == 2">
					<div class="headline_tag" v-if="datas.show_tag">
						<span>{{datas.headline_tag}}</span>
					</div>
					<div class="headline_title">
						<span :style="{lineHeight: datas.headline_height/2+'px'}">{{datas.list.length > 1 ? datas.list[1].title:'暂无设置文章'}}</span>
					</div>
				</div>
				<div class="right">
					<div class="headline_tag" v-if="datas.show_tag">
						<span>{{datas.headline_tag}}</span>
					</div>
					<div class="headline_title">
						<span :style="{lineHeight: datas.headline_height/2+'px'}">{{datas.list.length > 0 ? datas.list[0].title:'暂无设置文章'}}</span>
					</div>
				</div>
			</div>

    </div>

  </div>
</template>

<script>
	import emptyImage from '@/resource/images/toutiao.png';
	// 自定义样式
	const css = function () {
		if(this.datas.list) {
			const {
				preview_color,
				headline_height,
				headline_font_size,
				headline_font_color,
				tag_color,
				tag_font_color,
				tag_font_size,
				show_tag_border,
				tag_border_color,
				logo_image_size
			} = this.datas;

			return `
        .component-${this.id} .headline {
            background-color: ${preview_color};
            height: ${headline_height}px;
        }

        .component-${this.id} .headline_img {
        	width: ${logo_image_size}px;
        }

        .component-${this.id} .fixright .headline_title {
        		color: ${headline_font_color};
            font-size: ${headline_font_size}px;
        }

        .component-${this.id} .fixright .headline_tag {
        		border-radius: 5px;
        		background-color: ${tag_color};
        		color: ${tag_font_color};
            font-size: ${tag_font_size}px;
            border: solid ${show_tag_border ? '1' : '0'}px ${tag_border_color};
        }

    `;
		}
	};

	export default {
		props: ['id', 'datas', 'styles'],
		data() {
			return {
				emptyImage
			}
		},
		computed: {
			css() {
				return '<style>' + css.call(this) + '</style>';
			},
			className() {
				const name = ['component-wrapper', `component-${this.id}`];
				return name;
			},
		},

		methods: {
		},

		mounted() {
			this.$emit('loaded');
		}
	};
</script>

<style lang="less" scoped>
  // 默认
  .component-wrapper {
    width: 375px;
  }
	.headline{
		display: flex;
		align-items: center;
		padding: 4px 0;
		.headline_img{
			margin-left: 16px;
			/*width: 36px;*/
			/*height: 36px;*/
			img{
				width: 100%;
				height: 100%;
			}
		}
		.fixright{
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			justify-content: center;
		}
		.fixright .right:nth-child(2){
			margin-top: 5px;
		}
		.right{
			flex: 1;
			display: flex;
			align-items: center;
			overflow: hidden;
			.headline_tag{
				margin-left: 9px;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;

				padding: 3.5px 6.5px;
				// margin-left: 7px;
			}
			.headline_title{
				margin-left: 9px;
				flex: 0.95;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}

	}
</style>
