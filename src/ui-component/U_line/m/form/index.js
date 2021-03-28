// 数据配置
const datas = {
	preview_color: {
		title: "背景",
		type: "bg",
		value: {
			isColor: '1',
			color: "#ffffff",
			image: ""
		}
	},
	line_style: {
		title: '辅助线样式',
		type: 'radio',
		value: 'solid',
		options: [
			{ label: '实线', value: 'solid' },
			{ label: '虚线', value: 'dashed' },
			{ label: '圆点', value: 'dotted' },
			{ label: '双线', value: 'double' },
		]
	},
	border_color: {title: '辅助线颜色', type: 'color', value: '#333333',},
	border_weight: {
		title: "辅助线粗",
		type: "bar",
		value: 3,
		min: 0,
		max: 30,
	},
	border_padding: {
		title: "左右边距",
		type: "bar",
		value: 0,
		min: 0,
		max: 100,
	},
	search_height: {
		title: "高度设置",
		type: "bar",
		value: 10,
		min: 0,
		max: 100,
	},
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
};
