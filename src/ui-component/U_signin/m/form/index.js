// 数据配置
const datas = {
	preview_image: {
		title: "签到背景",
		type: "image",
		value: ""
	},
	margin_top: { title: '上边距', type: 'number', value: 0, col: 4 },
	margin_bottom: { title: '下边距', type: 'number', value: 0, col: 4, },
	margin_left: { title: '左边距', type: 'number', value: 0, col: 4 },
	margin_right: { title: '右边距', type: 'number', value: 0, col: 4, },
	sign_style: {
		title: "签到样式",
		type: "radio",
		value: "1",
		options: [
			{label: "样式一", value: "1"},
			{label: "样式二", value: "2"},
		]
	},
	font_size: {
		title: "签到字体大小",
		type: "bar",
		value: 14,
		min: 12,
		max: 24,
	},
	font_color: {
		title: '签到文字颜色',
		type: 'color',
		value: '#ffffff',
	},
	button_size: {
		title: "按钮字体大小",
		type: "bar",
		value: 14,
		min: 12,
		max: 24,
	},
	button_style: {
		title: "按钮文字样式",
		type: "textstylebox",
		value: [],
	},
	button_bg_color: {
		title: "按钮背景色",
		type: "color",
		value: "#f3f2f2"
	},
	button_color: {
		title: "按钮字体颜色",
		type: "color",
		value: "#333333"
	},
	show_prize: {
		title: "任务奖励是否显示",
		type: "switch",
		value: true,
	},
	prize_font_size: {
		title: "任务奖励字体大小",
		type: "bar",
		value: 14,
		min: 12,
		max: 24,
	},
	prize_font_color: {
		title: '任务奖励文字颜色',
		type: 'color',
		value: '#ffffff',
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
