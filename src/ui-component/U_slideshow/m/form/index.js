
// 数据配置
const datas = {
	picture_border: {title: '图片圆角', type: 'bar', value: 0, min: 0, max: 100},
	bg_color: {
		title: "背景颜色",
		type: "color",
		value: "#ffffff"
	},
	padding_top: { title: '上边距', type: 'number', value: 0, col: 4, },
	padding_bottom: { title: '下边距', type: 'number', value: 0, col: 4, },
	padding_left: { title: '左边距', type: 'number', value: 0, col: 4, },
	padding_right: { title: '右边距', type: 'number', value: 0, col: 4, },
	list: {
		title: '图片设置',
		type: "list",
		notShowText: true,
		notShow: true,
		choose_title: {
			choose_option: [
				{label: "普通样式", value: "1"},
				{label: "图标+文字", value: "2"},
			]
		},
		value: []
		// type: 'images',
		// value: [],
		// options: {
		//     image: {
		//         title: '轮播图地址',
		//         type: 'image',
		//         value: '',
		//         width: 'styles.width',
		//         height: 'styles.height',
		//     },
		//     link: {
		//         title: '跳转连接',
		//         type: 'text',
		//         value: '',
		//     }
		// }
	},
	choose_style: {
		title: '选择方式',
		type: 'radio',
		value: '2',
		options: []
	},
	// delay: {
	// 	title: '动画时间间隔（毫秒）',
	// 	value: '3000',
	// 	type: 'number',
	// 	min: 3000,
	// 	max: 10000
	// }
};

// 样式配置
const styles = {};

import template1 from './template1';

export const config = {
	datas,
	styles,
	layout: [
		template1
	]
}
