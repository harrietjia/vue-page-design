// 数据配置
const datas = {
	preview_color: {
		title: "头条组件背景色",
		type: 'color',
		value: '#ffffff',
	},
	headline_height: {
		title: "头条高度设置",
		type: "bar",
		value: 50,
		min: 40,
		max: 100,
	},
	list: {
		title: '文章设置',
		type: 'chooseList',
		showTitle: true,
		tips: '超过设置的显示数量在移动端会自动竖向滚动',
		choose: 'article',
		value: []
	},
	show_number: {
		title: "显示数量",
		type: "radio",
		value: "1",
		options: [
			{label: "一条", value: "1"},
			{label: "两条", value: "2"},
		]
	},
	headline_font_size: {
		title: "头条字体大小",
		type: "bar",
		value: 14,
		min: 12,
		max: 24,
	},
	headline_font_color: {
		title: '头条文字颜色',
		type: 'color',
		value: '#666666',
	},
	show_logo: {
		title: "图片是否显示",
		type: "switch",
		value: true,
	},
	logo_image: {
		title: '选择图片',
		type: 'image',
		value: ''
	},
	logo_image_size: {
		title: "图片大小",
		type: "bar",
		value: 36,
		min: 20,
		max: 100,
	},
	show_tag: {
		title: "标签是否显示",
		type: "switch",
		value: true,
	},
	headline_tag: {title: "标签", type: "text", value: "热点"},
	tag_color: {
		title: "标签背景色",
		type: "color",
		value: "#ffffff"
	},
	tag_font_color: {
		title: "标签字体颜色",
		type: "color",
		value: "#333333"
	},
	tag_font_size: {
		title: "标签字体大小",
		type: "bar",
		value: 14,
		min: 12,
		max: 24,
	},
	show_tag_border: {
		title: "标签边框是否显示",
		type: "switch",
		value: true,
	},
	tag_border_color: {
		title: "标签边框颜色",
		type: "color",
		value: "#DD2727"
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
