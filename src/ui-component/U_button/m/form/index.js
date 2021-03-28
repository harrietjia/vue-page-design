// 数据配置
const datas = {
	list: {
		title: '按钮设置',
		type: "list",
		notShow: true,
		choose_title: {
			choose_option: [
				{label: "普通样式", value: "1"},
				{label: "图标+文字", value: "2"},
			]
		},
		value: [
			{
				id: 1,
				image: '',
				is_minApp: '1',
				h5_link: '',
				gh_id: '',
				minApp_link: '',
				text: '文本'
			}
		]
	},
	choose_style: {
		title: '选择方式',
		type: 'radio',
		value: '2',
		options: []
	},
	padding_top: {
		title: '组件上边距',
		type: 'number',
		value: '0',
		col: 2
	},
	padding_bottom: {
		title: '组件下边距',
		type: 'number',
		value: '0',
		col: 2,
	},
	button_size: {
		title: '按钮大小',
		type: 'bar',
		value: 50,
		min: 20,
		max: 100,
	},
	border_radius: {
		title: '圆角大小',
		type: 'bar',
		value: 25,
		min: 0,
		max: 50,
	},
	button_number: {
		title: '按钮数量',
		type: 'radio',
		value: '4',
		options: [
			{ label: '4个按钮', value: '4' },
			{ label: '5个按钮', value: '5' },
		]
	},
	is_scroll: {
		title: '是否滑动',
		type: 'switch',
		value: false
	},
	button_line: {
		title: '按钮行数  (只有选择按钮数量为滑动时生效)',
		type: 'number',
		value: 1,
		min: 1,
		max: 3
	},
	preview_color: {
		title: "背景",
		type: "bg",
		value: {
			isColor: '1',
			color: "#ffffff",
			image: ""
		}
	},
	font_size: {
		title: "字体大小",
		type: "bar",
		value: 14,
		min: 12,
		max: 24,
	},
	text_style: {
		title: "文字样式",
		type: "textstylebox",
		value: []
	},
	font_color: {
		title: '文字颜色',
		type: 'color',
		value: '#666666',
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
