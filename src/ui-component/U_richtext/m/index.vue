<template>
  <div class="U0000010-template1" :class="className">
    <!-- style -->
    <div v-html="css"></div>

    <div class="html-box" v-html="datas.html_value"></div>

  </div>
</template>

<script>
	// 自定义样式
	const css = function () {
		const {
			bg_color,
			padding_top,
			padding_bottom,
			padding_left,
			padding_right,
		} = this.datas;

    return `
        .component-${this.id} .html-box {
            background-color: ${bg_color || '#f8f8f8'};
            padding-top: ${padding_top}px;
            padding-bottom: ${padding_bottom}px;
            padding-left: ${padding_left}px;
            padding-right: ${padding_right}px;
        }

        .component-${this.id} .html-box p {
            margin: 0;
        }

        .component-${this.id} .html-box img {
            max-width: 100%;
        }
    `;
	};

	export default {
		props: ['id', 'datas', 'styles'],
    data() {
			return{
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
		methods: {},

	};
</script>

<style lang="less" scoped>
  // 默认
  .component-wrapper {
    width: 375px;
  }

  .html-box {
    min-height: 30px;
  }
</style>
