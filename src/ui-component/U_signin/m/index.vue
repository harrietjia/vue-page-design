<template>
  <div :class="className">
    <!-- style -->
    <div v-html="css"></div>

    <!--签到静态-->
    <div class="signIn" v-if="datas.sign_style == 1">
			<div class="signBox" style="position: relative">
				<img :src="datas.preview_image? datas.preview_image: emptyImage" class="bg-img" alt="">
				<div class="left">
					<div class="left_conten">
						<div class="left_one">已经连续签到天数：<span class="adone" >120</span>天</div>
						<div class="left_two" v-if="datas.show_prize">今日签到奖励</div>
						<div class="list" v-if="datas.show_prize">
							<div class="list_lis">
								<span>+10</span>
								<span>积分</span>
							</div>
							<div class="list_lis">
								<span>+10</span>
								<span>优惠券</span>
							</div>
							<div class="list_lis">
								<span>+10</span>
								<span>爱心值</span>
							</div>
						</div>
						<div class="btn">
							<span>立即签到</span>
						</div>
					</div>

				</div>
			</div>
    </div>

		<div class="signIn" v-if="datas.sign_style == 2">
      <!-- 在这里写签到静态 -->
			<div class="signBox_one" style="position: relative">
				<img :src="datas.preview_image? datas.preview_image: emptyImage" class="bg-img" alt="">
				<div class="left">
					<div class="left_conten">
						<div class="left_one">已经连续签到天数：<span class="adone" >120</span>天</div>
						<div class="left_two" v-if="datas.show_prize">今日签到奖励</div>
						<div class="list" v-if="datas.show_prize">
							<div class="list_lis">
								<span>+10</span>
								<span>积分</span>
							</div>
							<div class="list_lis">
								<span>+10</span>
								<span>优惠券</span>
							</div>
							<div class="list_lis">
								<span>+10</span>
								<span>爱心值</span>
							</div>
						</div>
						<div class="btn">
							<span>立即签到</span>
						</div>
					</div>


				</div>
			</div>
    </div>
  </div>
</template>

<script>
	import emptyImage from "@/resource/images/banner.png";

	// 自定义样式
	const css = function () {
		if(this.datas.button_color) {
			const {
				margin_top,
				margin_bottom,
				margin_left,
				margin_right,
				font_size,
				font_color,
				button_size,
				button_style,
				button_bg_color,
				button_color,
				prize_font_size,
				prize_font_color,
			} = this.datas;

			return `
        .component-${this.id} .signIn {
            margin-top: ${margin_top}px;
            margin-bottom: ${margin_bottom}px;
            margin-left: ${margin_left}px;
            margin-right: ${margin_right}px;
        }

        .component-${this.id} .left_two, .component-${this.id} .list {
        	 font-size: ${prize_font_size}px;
            color: ${prize_font_color};
        }

        .component-${this.id} .signIn .left_one {
            font-size: ${font_size}px;
            color: ${font_color};
        }

        .component-${this.id} .signIn .btn span{
        		font-weight: ${button_style.includes('1') ? 'bold' : ''};
            font-style: ${button_style.includes('2') ? 'italic' : ''};
        		background-color: ${button_bg_color};
            font-size: ${button_size}px;
            color: ${button_color};
        }

    `;
		}
	};

	export default {
		data(){
			return{
				emptyImage,
				img:require('../../../resource/images/banner.png')
			}
		},
		props: ['id', 'datas', 'styles'],
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
	*{
		list-style-type: none;
	}
  .component-wrapper {
    width: 375px;
	}
	.signIn{
		display:flex;
	}
	.bg-img {
		width: 100%;
		height: 100%;
		display: block;
		min-height: 200px;
	}
	.signBox{
		width: 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		/*border-radius: 9.5px;*/
		.left {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 140px;
			min-height: 200px;
			background-color: rgba(122, 122, 122, 0.5);
			overflow: hidden;
			/*border-radius: 9.5px 0 0 9.5px;*/
			display: flex;
			align-items: center;
			.left_conten{
				text-align: center;
				width: 140px;
				padding: 19px 10.5px 9.5px 10.5px;
				.left_two{
					margin-top: 18px;
				}
				.btn{
					text-align: center;
					line-height: 25px;
					margin-top: 14px;
					span{
						padding: 6.5px 17.5px 5.5px 17.5px;
						border-radius: 12.5px;
					}
				}
				.list{
					display: flex;
					justify-content: space-between;
					margin-left: 3.5px;
					margin-top: 13px;
					.list_lis{
						display: flex;
						flex-direction: column;
						align-items: center;
					}
				}
			}
		}
	}

	.signBox_one{
		width: 100%;
		.left {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			min-height: 200px;
			width: 100%;
			background-color: rgba(122, 122, 122, 0.3);
			overflow: hidden;
			display: flex;
			justify-content: center;
			.left_conten{
				width: 200px;
				padding: 19px 10.5px 9.5px 10.5px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.left_one{
					text-align: center;
				}
				.left_two{
					margin-top: 18px;
					text-align: center;
				}
				.btn{
					text-align: center;
					line-height: 25px;
					margin-top: 13.5px;
					span{
						padding: 6.5px 17.5px 5.5px 17.5px;
						border-radius: 12.5px;
					}
				}
				.list{
					display: flex;
					justify-content: space-between;
					margin-left: 3.5px;
					margin-top: 13px;
					.list_lis{
						display: flex;
						flex-direction: column;
						align-items: center;
					}
				}
			}
		}
	}
</style>
